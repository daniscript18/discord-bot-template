const discord = require("discord.js");

module.exports =
{
    name: "example1",
    type: discord.ApplicationCommandType.ChatInput,
    description: "example1",
    run: async(client, interaction) =>
    {
        const modal = new discord.ModalBuilder()
		.setCustomId("modal")
		.setTitle("modal");

		const example1 = new discord.TextInputBuilder()
		.setCustomId("example1")
		.setLabel("example1")
		.setStyle(discord.TextInputStyle.Short);

		const example2 = new discord.TextInputBuilder()
		.setCustomId("example2")
		.setLabel("example2")
		.setStyle(discord.TextInputStyle.Paragraph);

		const one = new discord.ActionRowBuilder().addComponents(example1);
		const two = new discord.ActionRowBuilder().addComponents(example2);

		modal.addComponents(one, two);

		await interaction.showModal(modal);
    }
}