const fs = require("fs");
const file_scanner = require("node-recursive-directory");

module.exports = async (client, path) =>
{
    const scanned_files = await file_scanner(`${path}/interactions/button_commands`);
    scanned_files.forEach(file =>
    {
        if(fs.statSync(file).isDirectory()) return;
        const button = require(file);
        if(button.disabled) return;
        client.button_commands.set(button.name, button);
    });
}