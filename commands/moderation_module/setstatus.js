// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let arg = message.content.split(" ").slice(1);
    let status = arg.join(' ')
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Du hast nicht die nötigen Rechte.").then(msg => msg.delete(10000));
    bot.user.setActivity(status)
    message.channel.send("Mein Status wurde geändert. Sieh nach!").then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "setstatus"
}