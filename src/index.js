const discord = require("discord.js");
const settings = require("./settings/index");
const handlers = require("./structures/handlers/index");

const client = new discord.Client({ intents: 131071 });

client.limit_command_uses = new discord.Collection();
client.expire_after = new discord.Collection();
client.message_commands = new discord.Collection();
client.message_commands_aliases = new discord.Collection();
client.events = new discord.Collection();
client.slash_commands = new discord.Collection();
client.context_menus = new discord.Collection();
client.select_menus = new discord.Collection();
client.button_commands = new discord.Collection();
client.modal_forms = new discord.Collection();

(async () =>
{
    await handlers.message_commands(client, __dirname);
    await handlers.events(client, __dirname);
    await handlers.button_commands(client, __dirname);
    await handlers.select_menus(client, __dirname);
    await handlers.modal_forms(client, __dirname);

    await client.login(settings.bot.token);

    await handlers.slash_commands(client, __dirname);
    await handlers.context_menus(client, __dirname);
})();