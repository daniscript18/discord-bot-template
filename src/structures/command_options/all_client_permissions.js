const discord = require("discord.js");

module.exports = (client, message, command) =>
{
    if(!command.all_client_permissions) return true;
    if(!Array.isArray(command.all_client_permissions)) return true;
    if(!message.guild) return true;

    let missing_permissions = [];

    command.all_client_permissions.forEach(permissions =>
    {
        if(message.guild.members.me.permissions.has(permissions)) missing_permissions.push(permissions);
    });

    if(missing_permissions.length == 0) return true;
    else
    {
        if(command.return_errors == false || command.all_client_permissions_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription(`In order to run this command I need to have these permissions: ${missing_permissions.map(permission => `\`${permission}\``).join(", ")}`);
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}