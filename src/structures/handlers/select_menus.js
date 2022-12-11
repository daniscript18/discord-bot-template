const fs = require("fs");
const file_scanner = require("node-recursive-directory");

module.exports = async (client, path) =>
{
    const scanned_files = await file_scanner(`${path}/interactions/select_menus`);
    scanned_files.forEach(file =>
    {
        if(fs.statSync(file).isDirectory()) return;
        const menu = require(file);
        if(menu.disabled) return;
        client.select_menus.set(menu.name, menu);
    });
}