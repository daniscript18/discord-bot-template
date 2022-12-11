const discord = require("discord.js");

module.exports = (client, message, command, is_interaction, interaction_type) =>
{
    if(!command.limit_uses) return true;
    if(isNaN(command.limit_uses)) return true;

    let user;
    if(is_interaction) user = message.user;
    else user = message.author;

    if(client.limit_uses.get(`${command.name}_${interaction_type}`) < command.limit_uses) return true;
    else
    {
        if(command.return_errors == false || command.limit_uses_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription("This command can no longer be used because it has reached the set usage limit.");
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}