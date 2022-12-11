const discord = require("discord.js");

module.exports = (client, message, command, is_interaction) =>
{
    if(!command.only_users) return true;
    if(!Array.isArray(command.only_users)) return true;
    if(!message.guild) return true;

    let user;
    if(is_interaction) user = message.user;
    else user = message.author;
    
    if(command.only_users.some(id => user.id == id)) return true;
    else
    {
        if(command.return_errors == false || command.only_users_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription(`This command can only be executed by these users: ${command.only_users.map(id => `<@${id}>`).join(", ")}`);
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}