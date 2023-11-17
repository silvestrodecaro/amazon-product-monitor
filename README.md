# Amazon Product Monitor

This bot monitors Amazon product availability and sends notifications to a specified Discord webhook when a product becomes available for purchase.

## Features

- Monitors a list of Amazon product URLs for availability.
- Sends notifications to a Discord webhook with product details.
- Uses Axios for HTTP requests and Discord.js for webhook communication.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/silvestrodecaro/amazon-product-monitor

2. **Initialize the project:**

    ```bash
    npm init -y

3. **Install dependencies:**

    ```bash
    npm install fs axios discord.js

4. **Update `products.txt`:**

    Add Amazon product URL's, with each URL on a new line.

5. **Obtain a Discord Webhook URL:**

    Create a webhook in your Discord server and replace "INSERT DISCORD WEBHOOK URL HERE" in the code with your webhook URL.

6. **Run the bot:**

    ```bash
    node app.js

## Dependencies

- [Discord.js](https://discord.js.org/)
- [Axios](https://axios-http.com/)

## Author

Silvestro De Caro
