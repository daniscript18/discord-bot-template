const { Client } = require("discord.js");

module.exports =
{
    name: "ready",
    run_once: true,
    /**
     * @param {Client} client 
     */
    run: async (client) =>
    {
        console.log(`${client.user.tag} on!`);
    } 
}