const { EmbedBuilder } = require("discord.js");
// No need to import fetch in Node.js 18+

module.exports = {
  data: {
    name: "cat",
    description: "Replies with a random cat image",
    aliases: ["kitty", "kitten"],
  },
  async execute(message, args) {
    try {
      const url = "https://api.thecatapi.com/v1/images/search";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        const img_url = data[0]["url"];
        const img_id = data[0]["id"];

        const embed = new EmbedBuilder()
          .setTitle("💥 BAM! CAT UPON YA 🫴🐱")
          .setImage(img_url)
          .setFooter({ text: `Look sharp! (id: ${img_id})` })
          .setColor("#FF6B6B")
          .setTimestamp(); // Added timestamp for extra flair

        await message.reply({ embeds: [embed] });
      } else {
        await message.reply(
          "Sorry, I couldn't fetch a cat image right now. Try again later! 😿",
        );
      }
    } catch (error) {
      console.error("Error in cat command:", error);
      await message.reply(
        "Oops! Something went wrong while getting your cat image. 😿",
      );
    }
  },
};
