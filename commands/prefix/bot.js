module.exports = {
    data: {
        name: "bot",
        description: "replies with bot"
    },
    async execute(message, args) {
        await message.reply("BOT!💥");
    }
};

