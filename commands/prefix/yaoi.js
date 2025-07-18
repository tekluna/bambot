const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "yaoi",
        description: "Replies with random yaoi art!"
    },
    async execute(message, args) {
        try {
            const url = "https://api.purrbot.site/v2/img/sfw/angry/gif";
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                
                const img_url = data['link'];
                const img_id = img_url.split("https://cdn.purrbot.site/sfw/angry/gif/angry_")[1].split(".gif")[0];
                
                const embed = new EmbedBuilder()
                    .setTitle("💥 BAM! GAY UPON YA 🫴")
                    .setImage(img_url)
                    .setFooter({ text: `Look sharp! (id: ${img_id})` })
                    .setColor('#FF6B6B')
                    .setTimestamp(); // Added timestamp for extra flair
                
                await message.reply({ embeds: [embed] });
            } else {
                await message.reply("Sorry, I couldn't fetch yaoi images right now. Try again later! 😿");
            }
        } catch (error) {
            console.error('Error in cat command:', error);
            await message.reply("Oops! Something went wrong while getting your yaoi image. 😿");
        }
    },
};
