const fs = require("fs");
const file_scanner = require("node-recursive-directory");

module.exports = async (client, path) =>
{
    const scanned_files = await file_scanner(`${path}/interactions/context_menus`);
    scanned_files.forEach(file =>
    {
        if(fs.statSync(file).isDirectory()) return;
        const menu = require(file);
        if(menu.disabled) return;
        client.context_menus.set(menu.name, menu);
    });
    let promise = Promise.resolve();
    scanned_files.forEach(async function(file)
    {
        promise = promise.then(async function()
        {
            const interval = 5000;
            if(fs.statSync(file).isDirectory()) return;
            const menu = require(file);
            if(menu.disabled) return;

            if(menu.guilds && Array.isArray(menu.guilds)) menu.forEach(guild_id =>
            {
                (async () =>
                {
                    const guild = client.guilds.cache.get(guild_id) ?? await client.guilds.fetch(guild_id);
                    const verifier = guild.commands.cache.find(cmd => cmd.name == menu.name);
                    if(verifier) await guild.commands.edit(verifier.id,
                    {
                        name: menu.name,
                        options: menu.options ?? [],
                        type: menu.type
                    });
                    else await guild.commands.create(
                    {
                        name: menu.name,
                        options: menu.options ?? [],
                        type: menu.type
                    });
                })();
            });
            else
            {
                const verifier = client.application.commands.cache.find(cmd => cmd.name == menu.name);
                if(verifier) await client.application.commands.edit(verifier.id,
                {
                    name: menu.name,
                    options: menu.options ?? [],
                    type: menu.type
                });
                else await client.application.commands.create(
                {
                    name: menu.name,
                    options: menu.options ?? [],
                    type: menu.type
                });
            }
            return new Promise(function(resolve)
            {
                setTimeout(resolve, interval);
            });
        });
    });
}