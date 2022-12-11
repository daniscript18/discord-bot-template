const discord = require("discord.js");

module.exports =
{
    name: "example1-message",
    type: discord.ApplicationCommandType.Message,
    run: async (client, interaction) =>
    {
        interaction.reply("example1-message");
    }
}