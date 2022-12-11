module.exports = (client, message, command, is_interaction, interaction_type) =>
{
    let verification_count = 0;
    if(require("./owner_only")(client, message, command, is_interaction)) verification_count = verification_count + 1;
    if(require("./limit_uses")(client, message, command, is_interaction, interaction_type)) verification_count = verification_count + 1;
    if(require("./expire_after")(client, message, command, is_interaction, interaction_type)) verification_count = verification_count + 1;
    if(require("./any_client_permissions")(client, message, command)) verification_count = verification_count + 1;
    if(require("./all_client_permissions")(client, message, command)) verification_count = verification_count + 1;
    if(require("./any_user_permissions")(client, message, command)) verification_count = verification_count + 1;
    if(require("./all_user_permissions")(client, message, command)) verification_count = verification_count + 1;
    if(require("./only_channels")(client, message, command)) verification_count = verification_count + 1;
    if(require("./only_users")(client, message, command, is_interaction)) verification_count = verification_count + 1;
    if(require("./only_guilds")(client, message, command)) verification_count = verification_count + 1;
    if(verification_count === 10) return true;
    else return false;
}