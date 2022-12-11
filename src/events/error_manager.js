module.exports =
{
    name: "error_manager",
    is_custom: true,
    run: async () =>
    {
        process.on("unhandledRejection", error => console.log(error));
        process.on("uncaughtException", error => console.log(error));
    }
}