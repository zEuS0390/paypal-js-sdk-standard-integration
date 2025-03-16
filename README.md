# PayPal Standard Integration using JavaScript SDK

This is a standard PayPal payment integration using JavaScript SDK. I made this simple project as a reference and guidance for my upcoming projects.

## ❓ How to Run?

1. **Create a PayPal Developer Account.**
   - Visit http://developer.paypal.com and sign up for a developer account.
2. **Set Environment Variables.**
   - On Windows:
     - Open Environment Variables from System Properties.
     - Add two new variables:
       - `PAYPAL_CLIENT_ID = <YOUR_PAYPAL_CLIENT_ID>`
       - `PAYPAL_CLIENT_SECRET = <YOUR_PAYPAL_CLIENT_SECRET>`
   - On Linux or macOS:
     - Open the terminal and edit your .bashrc (or .zshrc for zsh users) file:
       ```bash
       export PAYPAL_CLIENT_ID=<YOUR_PAYPAL_CLIENT_ID>
       export PAYPAL_CLIENT_SECRET=<YOUR_PAYPAL_CLIENT_SECRET>
       ```
       Then, apply the changes:
       ```bash
       source ~/.bashrc   # or `source ~/.zshrc` for zsh
       ```
3. **Install the Required Dependency (Express.js).**
   - Ensure that Node.js and NPM (Node Package Manager) are installed on your computer.
   - Open the terminal and run:
     ```bash
     npm install express
     ```
5. **Run the Two Servers.**
   - Start the backend server:
     ```
     node server.js
     ```
   - Start the frontend server:
     ```
     node client.js
     ```

## 📹 Demonstration
https://github.com/zEuS0390/paypal-js-sdk-standard-integration/assets/39390245/1849a699-9b33-4ff7-9d62-a213194769d5

