const discord = require("discord.js");
const settings = require("../../settings/index");

module.exports = (client, message, command, is_interaction) =>
{
    if(!command.owner_only) return true;
    if(!message.guild) return true;

    let user;
    if(is_interaction) user = message.user;
    else user = message.author;

    if(settings.bot.bot_owners.some(id => user.id == id)) return true;
    else
    {
        if(command.return_errors == false || command.owner_only_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription("This command can only be executed by my developers.");
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}