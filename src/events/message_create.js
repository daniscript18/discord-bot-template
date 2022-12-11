const command_options_verifier = require("../structures/command_options/index");
const settings = require("../settings/index");

module.exports =
{
    name: "messageCreate",
    run: async (message, client) =>
    {
        settings.bot.default_prefix.forEach(prefix =>
        {
            if(!message.content.startsWith(prefix)) return;
            const command_name = message.content.toString().slice(prefix.length).trim().split(" ")[0];
            const command = client.message_commands.get(command_name) ?? client.message_commands.get(client.message_commands.get(command_name));
            if(!command) return;
            let args = message.content.slice(prefix.length).trim();
            if(args.toLowerCase().startsWith(command_name)) args = args.slice(command_name.length).trim().split(" ");
            if(command.limit_uses && !isNaN(command.limit_uses))
            {
                let limited_uses_count = client.limit_command_uses.get(`${command.name}_message_command`) ?? -1;
                client.limit_command_uses.set(`${command.name}_message_command`, Math.floor(limited_uses_count + 1));
            }
            if(!command_options_verifier(client, message, command, false, "message_command")) return;
            if(command.expire_after && !isNaN(command.expire_after))
            {
                if(!client.expire_after.get(`${command.name}_message_command`)) client.expire_after.set(`${command.name}_message_command`, Date.now());
            }
            if(command.allow_in_dms) command.run(client, message, args);
            else if(!message.guild) return;
            else if(command.allow_bots) command.run(client, message, args);
            else if(message.author.bot) return;
            else command.run(client, message, args);
        });
    }
}