const { SlashCommandBuilder } = require("discord.js");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping-count")
    .setDescription("Replies with Pong and Latency info and counts"),

  async execute(interaction) {
    const dbPath = path.join(__dirname, "../../database/bambot.db");
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
        return interaction.reply("Failed to open database.");
      }
    });

    const userId = interaction.user.id;

    db.run(
      `CREATE TABLE IF NOT EXISTS command_counts (
        user_id TEXT PRIMARY KEY,
        ping_count INTEGER DEFAULT 0
      )`,
      (err) => {
        if (err) {
          console.error("Failed to create table:", err.message);
          return interaction.reply("Database setup failed.");
        }

        db.get(
          "SELECT ping_count FROM command_counts WHERE user_id = ?",
          [userId],
          async (err, row) => {
            if (err) {
              console.error(err);
              return interaction.reply({
                content:
                  "Woops! Something went wrong while fetching your ping count.",
                ephemeral: true,
              });
            }

            let count = 1;

            if (row) {
              count = row.ping_count + 1;
              db.run(
                "UPDATE command_counts SET ping_count = ? WHERE user_id = ?",
                [count, userId],
                (err) => {
                  if (err) {
                    console.error("Update error:", err.message);
                  }
                }
              );
            } else {
              db.run(
                "INSERT INTO command_counts (user_id, ping_count) VALUES (?, ?)",
                [userId, count],
                (err) => {
                  if (err) {
                    console.error("Insert error:", err.message);
                  }
                }
              );
            }

            const sent = await interaction.reply({
              content: "Pinging...",
              fetchReply: true,
            });

            const latency = sent.createdTimestamp - interaction.createdTimestamp;

            await interaction.editReply(
              `PONG!💥\nLatency: ${latency}ms\nAPI Latency: ${Math.round(
                interaction.client.ws.ping
              )}ms\nYou've used this command **${count}** time(s)!`
            );

            db.close();
          }
        );
      }
    );
  },
};

