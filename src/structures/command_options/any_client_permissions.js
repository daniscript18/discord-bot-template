const discord = require("discord.js");

module.exports = (client, message, command) =>
{
    if(!command.any_client_permissions) return true;
    if(!Array.isArray(command.any_client_permissions)) return true;
    if(!message.guild) return true;

    if(message.guild.members.me.permissions.toArray().some(I => command.any_client_permissions.some(i => i.toUpperCase() == I.toUpperCase()))) return true;
    else
    {
        if(command.return_errors == false || command.any_client_permissions_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription(`To run this command I need to have one of these permissions: ${command.any_client_permissions.map(permission => `\`${permission}\``).join(", ")}`);
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}