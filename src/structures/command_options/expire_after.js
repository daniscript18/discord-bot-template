const discord = require("discord.js");

module.exports = (client, message, command, is_interaction, interaction_type) =>
{
    if(!command.expire_after) return true;
    if(isNaN(command.expire_after)) return true;

    let user;
    if(is_interaction) user = message.user;
    else user = message.author;
    const time = client.expire_after.get(`${command.name}_${interaction_type}`) ?? Date.now();

    if(Math.floor(Date.now() - time) < command.expire_after) return true;
    else
    {
        if(command.return_errors == false || command.expire_after_error == false) return false;
        else
        {
            const embed_error = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
            .setColor("Red")
            .setDescription("This command can no longer be used because it has expired.");
            
            message.reply({ embeds: [embed_error], allowedMentions: { repliedUser: false } });
            
            return false;
        }
    }
}