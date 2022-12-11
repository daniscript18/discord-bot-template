const discord = require("discord.js");

module.exports = (client, message, command) =>
{
    if(!command.only_channels) return true;
    if(!Array.isArray(command.only_channels)) return true;
    if(!message.guild) return true;
    
    command.only_channels.forEach(id =>
    {
        if(!message.guild.channels.cache.get(id)) return true;
    });

    if(command.only_channels.some(id => message.channel.id == id)) return true;
    else
    {
        if(command.return_errors == false || command.only_channels_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription(`This command can only be executed on these channels: ${command.only_channels.map(id => `<#${id}>`).join(", ")}`);
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}