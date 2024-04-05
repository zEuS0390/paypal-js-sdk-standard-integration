const SERVER_PORT = 8888;

async function createOrder() {
  const response = await fetch(`http://localhost:${SERVER_PORT}/api/orders`, {
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
    `http://localhost:${SERVER_PORT}/api/orders/${data.orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  alert("Thank you for your payment! Your transaction was successful.");
  return await response.json();
}

const buttons = window.paypal.Buttons({ createOrder, onApprove });

buttons.render("#paypal-button-container");
