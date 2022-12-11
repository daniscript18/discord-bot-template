const discord = require("discord.js");

module.exports = (client, message, command) =>
{
    if(!command.only_guilds) return true;
    if(!Array.isArray(command.only_guilds)) return true;
    if(!message.guild) return true;
    
    let guild_names = [];

    if(command.only_guilds.some(id => id == message.guild.id)) return true;
    else
    {
        command.only_guilds.forEach(id =>
        {
            guild_names.push(client.guilds.cache.get(id).name);
        });

        if(command.return_errors == false || command.only_guilds_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription(`This command can only be run on these servers: ${guild_names.map(name => `\`${name}\``).join(", ")}`);
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}