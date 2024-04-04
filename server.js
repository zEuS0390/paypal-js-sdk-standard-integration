import express from "express";
import fetch from "node-fetch";
import path from "path";
import cors from "cors";
import "dotenv/config";

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  SERVER_PORT = 8888,
} = process.env;
const app = express();
app.use(express.json());
app.use(cors());

const base_URL = "https://api-m.sandbox.paypal.com";

// Generate an OAuth 2.0 Access Token for authenticating with PayPal REST APIs
async function generateAccessToken() {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch(path.join(base_URL, "v1/oauth2/token"), {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.log(`Failed to generated access token: ${error}`);
  }
}

// Create an order to start the transaction
async function createOrder(order) {
  const access_token = await generateAccessToken();
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: String(100),
        },
      },
    ],
    application_context: {
      shipping_preference: "NO_SHIPPING",
    },
  };

  const response = await fetch(path.join(base_URL, "v2/checkout/orders"), {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return handleResponse(response);
}

// Capture payment for the created order to complete the transaction
async function capturePayment(orderID) {
  const access_token = await generateAccessToken();
  const response = await fetch(
    path.join(base_URL, "v2/checkout/orders", orderID, "capture"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return handleResponse(response);
}

async function handleResponse(response) {
  try {
    const json_response = await response.json();
    return {
      json_response,
      http_status_code: response.status,
    };
  } catch (error) {
    const error_message = error.text();
    throw new Error(error_message);
  }
}

app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;
    const { json_response, http_status_code } = await createOrder(order);
    res.status(http_status_code).json(json_response);
  } catch (error) {
    console.error(`Failed to create order: ${error}`);
    res.status(500).json({
      error: "Failed to create order.",
    });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const { json_response, http_status_code } = await capturePayment(orderID);
    res.status(http_status_code).json(json_response);
  } catch (error) {
    console.error(`Failed to capture order: ${error}`);
    res.status(500).json({
      error: "Failed to capture order.",
    });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Node server listening at http://localhost:${SERVER_PORT}/`);
});
