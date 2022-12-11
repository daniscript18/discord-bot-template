const discord = require("discord.js");

module.exports =
{
    name: "example2",
    run: async (client, message, args) =>
    {
        const components = new discord.ActionRowBuilder().addComponents
        (
            new discord.StringSelectMenuBuilder()
            .setCustomId("example")
            .setPlaceholder("example")
            .addOptions
            (
                [
                    {
                        label: "example1",
                        description: "example1",
                        value: "example1"
                    },
                    {
                        label: "example2",
                        description: "example2",
                        value: "example2"
                    },
                    {
                        label: "example3",
                        description: "example3",
                        value: "example3"
                    }
                ]
            )
        )
        message.reply({ components: [components] });
    }
}