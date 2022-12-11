const fs = require("fs");
const file_scanner = require("node-recursive-directory");

module.exports = async (client, path) =>
{
    const scanned_files = await file_scanner(`${path}/message_commands`);
    scanned_files.forEach(file =>
    {
        if(fs.statSync(file).isDirectory()) return;
        const cmd = require(file);
        if(cmd.disabled) return;
        client.message_commands.set(cmd.name, cmd);
        if(cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias =>
        {
            client.message_commands_aliases.set(alias, cmd.name);
        });
    });
}