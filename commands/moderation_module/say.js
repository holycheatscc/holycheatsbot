const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Du hast nicht auszureichende Rechte!").then(msg => msg.delete(10000));
    let botMessage = args.join(" ");

    if(botMessage.length < 1) return message.channel.send("Bitte gebe eine Nachricht an!").then(msg => msg.delete(5000));
    message.channel.send(botMessage);
}

module.exports.help = {
    name: "announce"
}