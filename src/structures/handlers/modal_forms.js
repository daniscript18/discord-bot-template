const fs = require("fs");
const file_scanner = require("node-recursive-directory");

module.exports = async (client, path) =>
{
    const scanned_files = await file_scanner(`${path}/interactions/modal_forms`);
    scanned_files.forEach(file =>
    {
        if(fs.statSync(file).isDirectory()) return;
        const modal = require(file);
        if(modal.disabled) return;
        client.modal_forms.set(modal.name, modal);
    });
}