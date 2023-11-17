const { EmbedBuilder, WebhookClient } = require("discord.js");
const axios = require("axios");
const fs = require("fs");

const productsFilePath = "products.txt";
let products = fs.readFileSync(productsFilePath, "utf8").split("\n");

const webhookClient = new WebhookClient({
  url: "INSERT DISCORD WEBHOOK URL HERE",
});

function sendDiscordWebhook(url, productDetails) {
  const embed = new EmbedBuilder()
    .setTitle("Product Available")
    .setDescription(
      `${productDetails.title} \n\n **Price:** ${productDetails.price}`
    )
    .setColor(0x221f21)
    .setURL(url)
    .setThumbnail(productDetails.image)
    .setFooter({
      text: "Made by github.com/silvestrodecaro",
      iconURL:
        "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png",
    });

  webhookClient
    .send({
      username: "Amazon Monitor",
      avatarURL:
        "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png",
      embeds: [embed],
    })
    .then(console.log("Product available, webhook sent successfully"))
    .catch((error) => {
      console.error(
        "Product available but there was a problem sending the webhook:",
        error
      );
    });
}

function Monitor() {
  Promise.all(
    products.map((url, index) =>
      axios
        .get(url)
        .then((res) => {
          if (res.data.includes('id="add-to-cart-button"')) {
            const productDetails = {
              title: res.data.match(
                /alt="(.*?)" src="(.*?)" data-old-hires="(.*?)" /
              )[1],
              image: res.data.match(
                /alt="(.*?)" src="(.*?)" data-old-hires="(.*?)" /
              )[2],
              price: res.data.match(
                /"displayPrice":"(.*?)","priceAmount":(.*?),/
              )[1],
            };
            sendDiscordWebhook(url, productDetails);
            products.splice(index, 1);
            fs.writeFileSync(productsFilePath, products.join("\n"));
          }
        })
        .catch((error) => {
          console.error(`HTTP request error for ${url}:`, error);
        })
    )
  ).catch((error) => {
    console.error("HTTP request error:", error);
  });
}

Monitor();
setInterval(Monitor, 60000);

console.log(`Monitoring...\n${products.join("\n")}`);
