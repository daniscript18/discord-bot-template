const discord = require("discord.js");

module.exports =
{
    name: "example1-user",
    type: discord.ApplicationCommandType.User,
    run: async (client, interaction) =>
    {
        interaction.reply("example1-user");
    }
}