const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('yaoi')
    .setDescription('Replies with a random yaoi art!'),

    async execute(interaction) {

        try {
            const url="https://api.purrbot.site/v2/img/sfw/angry/gif"
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();

                const img_url = await data['link'];
                const img_id = img_url.split("https://cdn.purrbot.site/sfw/angry/gif/angry_")[1].split(".gif")[0];

                const embed = new EmbedBuilder()
                    .setTitle("💥 BAM! YAOI UPON YA 🫴")
                    .setImage(img_url)
                    .setFooter({ text: `Look sharp! (id: ${img_id})` })
                    .setColor('#FF6B6B')
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply("Sorry, I couldn't fetch any yaoi image right now. Try again later!");
            }
        } catch(error) {
            console.error('Error in yaoi command:', error);
            await interaction.reply("Oops! Something went wrong while getting your yaoi image.");
        }
    }
}
