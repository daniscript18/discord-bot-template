const fs = require("fs");
const file_scanner = require("node-recursive-directory");

module.exports = async (client, path) =>
{
    const scanned_files = await file_scanner(`${path}/interactions/slash_commands`);
    scanned_files.forEach(file =>
    {
        if(fs.statSync(file).isDirectory()) return;
        const cmd = require(file);
        if(cmd.disabled) return;
        client.slash_commands.set(cmd.name, cmd);
    });
    let promise = Promise.resolve();
    scanned_files.forEach(async function(file)
    {
        promise = promise.then(async function()
        {
            const interval = 5000;
            if(fs.statSync(file).isDirectory()) return;
            const cmd = require(file);
            if(cmd.disabled) return;

            if(cmd.guilds && Array.isArray(cmd.guilds)) cmd.guilds.forEach(guild_id =>
            {
                (async () =>
                {
                    const guild = client.guilds.cache.get(guild_id) ?? await client.guilds.fetch(guild_id);
                    const verifier = guild.commands.cache.find(command => command.name == cmd.name);
                    if(verifier) await guild.commands.edit(verifier.id,
                    {
                        name: cmd.name,
                        description: cmd.description ?? "none",
                        options: cmd.options ?? [],
                        type: cmd.type
                    });
                    else await guild.commands.create(
                    {
                        name: cmd.name,
                        description: cmd.description ?? "none",
                        options: cmd.options ?? [],
                        type: cmd.type
                    });
                })();
            });
            else
            {
                const verifier = client.application.commands.cache.find(command => command.name == cmd.name);
                if(verifier) await client.application.commands.edit(verifier.id,
                {
                    name: cmd.name,
                    description: cmd.description ?? "none",
                    options: cmd.options ?? [],
                    type: cmd.type
                });
                else await client.application.commands.create(
                {
                    name: cmd.name,
                    description: cmd.description ?? "none",
                    options: cmd.options ?? [],
                    type: cmd.type
                });
            }
            return new Promise(function(resolve)
            {
                setTimeout(resolve, interval);
            });
        });
    });
}