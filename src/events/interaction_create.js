const command_options_verifier = require("../structures/command_options/index");

module.exports =
{
    name: "interactionCreate",
    run: async (interaction, client) =>
    {
        let command;
        if(interaction.isChatInputCommand())
        {
            command = client.slash_commands.get(interaction.commandName);
            if(!command) return;
            if(command.limit_uses && !isNaN(command.limit_uses))
            {
                let limited_uses_count = client.limit_command_uses.get(`${command.name}_slash_command`) ?? -1;
                client.limit_command_uses.set(`${command.name}_slash_command`, Math.floor(limited_uses_count + 1));
            }
            if(!command_options_verifier(client, interaction, command, true, "slash_command")) return;
            if(command.expire_after && !isNaN(command.expire_after))
            {
                if(!client.expire_after.get(`${command.name}_slash_command`)) client.expire_after.set(`${command.name}_slash_command`, Date.now());
            }
            command.run(client, interaction);
        }
        else if(interaction.isContextMenuCommand())
        {
            command = client.context_menus.get(interaction.commandName);
            if(!command) return;
            if(command.limit_uses && !isNaN(command.limit_uses))
            {
                let limited_uses_count = client.limit_command_uses.get(`${command.name}_context_menu`) ?? -1;
                client.limit_command_uses.set(`${command.name}_context_menu`, Math.floor(limited_uses_count + 1));
            }
            if(!command_options_verifier(client, interaction, command, true, "context_menu")) return;
            if(command.expire_after && !isNaN(command.expire_after))
            {
                if(!client.expire_after.get(`${command.name}_context_menu`)) client.expire_after.set(`${command.name}_context_menu`, Date.now());
            }
            client.context_menus.get(interaction.commandName).run(client, interaction);
        }
        else if(interaction.isStringSelectMenu())
        {
            if(client.select_menus.get(interaction.values[0]))
            {
                command = client.select_menus.get(interaction.values[0]);
                if(!command) return;
                if(command.limit_uses && !isNaN(command.limit_uses))
                {
                    let limited_uses_count = client.limit_command_uses.get(`${command.name}_select_menu_value`) ?? -1;
                    client.limit_command_uses.set(`${command.name}_select_menu_value`, Math.floor(limited_uses_count + 1));
                }
                if(!command_options_verifier(client, interaction, command, true, "select_menu_value")) return;
                if(command.expire_after && !isNaN(command.expire_after))
                {
                    if(!client.expire_after.get(`${command.name}_select_menu_value`)) client.expire_after.set(`${command.name}_select_menu_value`, Date.now());
                }
                client.select_menus.get(interaction.values[0]).run(client, interaction);
            }
            else
            {
                command = client.select_menus.get(interaction.customId);
                if(!command) return;
                if(command.limit_uses && !isNaN(command.limit_uses))
                {
                    let limited_uses_count = client.limit_command_uses.get(`${command.name}_select_menu`) ?? -1;
                    client.limit_command_uses.set(`${command.name}_select_menu`, Math.floor(limited_uses_count + 1));
                }
                if(!command_options_verifier(client, interaction, command, true, "select_menu")) return;
                if(command.expire_after && !isNaN(command.expire_after))
                {
                    if(!client.expire_after.get(`${command.name}_select_menu`)) client.expire_after.set(`${command.name}_select_menu`, Date.now());
                }
                client.select_menus.get(interaction.customId).run(client, interaction);
            }
        }
        else if(interaction.isButton())
        {
            command = client.button_commands.get(interaction.customId);
            if(!command) return;
            if(command.limit_uses && !isNaN(command.limit_uses))
            {
                let limited_uses_count = client.limit_command_uses.get(`${command.name}_button_commands`) ?? -1;
                client.limit_command_uses.set(`${command.name}_button_commands`, Math.floor(limited_uses_count + 1));
            }
            if(!command_options_verifier(client, interaction, command, true, "button_commands")) return;
            if(command.expire_after && !isNaN(command.expire_after))
            {
                if(!client.expire_after.get(`${command.name}_button_commands`)) client.expire_after.set(`${command.name}_button_commands`, Date.now());
            }
            client.button_commands.get(interaction.customId).run(client, interaction);
        }
        else if(interaction.isModalSubmit())
        {
            command = client.modal_forms.get(interaction.customId);
            if(!command) return;
            if(command.limit_uses && !isNaN(command.limit_uses))
            {
                let limited_uses_count = client.limit_command_uses.get(`${command.name}_modal_forms`) ?? -1;
                client.limit_command_uses.set(`${command.name}_modal_forms`, Math.floor(limited_uses_count + 1));
            }
            if(!command_options_verifier(client, interaction, command, true, "modal_forms")) return;
            if(command.expire_after && !isNaN(command.expire_after))
            {
                if(!client.expire_after.get(`${command.name}_modal_forms`)) client.expire_after.set(`${command.name}_modal_forms`, Date.now());
            }
            client.modal_forms.get(interaction.customId).run(client, interaction);
        }
    }
}