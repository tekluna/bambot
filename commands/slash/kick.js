const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user from the server")

        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to kick")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for the kick")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const target = interaction.options.getUser("user");
        const reason =
            interaction.options.getString("reason") || "No reason provided";

        const targetUser = await interaction.guild.members
            .fetch(target.id)
            .catch(() => null);

        if (!targetUser) {
            return interaction.reply({
                content: "Cannot find user",
                ephemeral: true,
            });
        }
        if (!targetUser.kickable) {
            return interaction.reply({
                content: `Sorry I am unable kick user ${targetUser}. Permissions missing`,
                ephemeral: true,
            });
        }

        try {
            await targetUser.kick({reason});
            await interaction.reply(
                `User ${target} successfully kicked! \nreason: ${reason}`
            );
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: `Error trying to kick user ${targetUser}`,
                ephemeral: true,
            });
        }
    },
};
