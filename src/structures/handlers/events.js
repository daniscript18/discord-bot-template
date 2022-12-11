const fs = require("fs");
const file_scanner = require("node-recursive-directory");

module.exports = async (client, path) =>
{
    const scanned_files = await file_scanner(`${path}/events`);
    scanned_files.forEach(file =>
    {
        if(fs.statSync(file).isDirectory()) return;
        const event = require(file);
        if(event.disabled) return;
        client.events.set(event.name, event);

        if(event.is_custom) event.run(client, path);
        else
        {
            if(event.run_once) client.once(event.name, (...args) => event.run(...args, client, path));
            else client.on(event.name, (...args) => event.run(...args, client, path));
        }
    });
}