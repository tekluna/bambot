const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Replies with a random cat image"),

  async execute(interaction) {
    try {
      const url = "https://api.thecatapi.com/v1/images/search";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        const img_url = await data[0]["url"];
        const img_id = await data[0]["id"];

        const embed = new EmbedBuilder()
          .setTitle("💥 BAM! CAT UPON YA 🫴🐱")
          .setImage(img_url)
          .setFooter({ text: `Look sharp! (id: ${img_id})` })
          .setColor("#FF6B6B")
          .setTimestamp(); // Added timestamp for extra flair

        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply(
          "Sorry, I couldn't fetch a cat image right now. Try again later! 😿",
        );
      }
    } catch (error) {
      console.error("Error in cat command:", error);
      await interaction.reply(
        "Oops! Something went wrong while getting your cat image. 😿",
      );
    }
  },
};
