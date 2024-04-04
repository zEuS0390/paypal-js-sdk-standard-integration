async function createOrder() {
  const response = await fetch("http://localhost:8000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart: [
        {
          name: "product1",
          quantity: "1",
        },
      ],
    }),
  });
  const response_data = await response.json();
  return response_data.id;
}

async function onApprove(data) {
  const response = await fetch(
    `http://localhost:8000/api/orders/${data.orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}

const buttons = window.paypal.Buttons({ createOrder, onApprove });

buttons.render("#paypal-button-container");
