const discord = require("discord.js");

module.exports =
{
    name: "example3",
    run: async (client, message, args) =>
    {
        const components = new discord.ActionRowBuilder().addComponents
        (
            new discord.ButtonBuilder().setCustomId("example1").setLabel("example1").setStyle(discord.ButtonStyle.Danger),
            new discord.ButtonBuilder().setURL("https://github.com/daniscript18/discord-bot-template").setLabel("redirect").setStyle(discord.ButtonStyle.Link),
            new discord.ButtonBuilder().setCustomId("example2").setLabel("example2").setStyle(discord.ButtonStyle.Primary),
            new discord.ButtonBuilder().setCustomId("example3").setLabel("example3").setStyle(discord.ButtonStyle.Secondary),
            new discord.ButtonBuilder().setCustomId("example4").setLabel("example4").setStyle(discord.ButtonStyle.Success)
        );
        message.reply({ components: [components] });
    }
}