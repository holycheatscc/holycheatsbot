const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let pingembed = new Discord.RichEmbed()
//    .setDescription("LegionRP | Administration")
    .setColor(botconfig["bot_setup"].main_embed_color)
    .addField("Ping Check", `:ping_pong: Pong! Latency is: **${new Date().getTime() - message.createdTimestamp}ms**`)
    .addField("Information", `Dieser Bot wurde für LegionRP geschrieben und alle Copyright Rechte gehören LegionRP!`);

    message.channel.send(pingembed).then(msg => msg.delete(60000));
}

module.exports.help = {
    name: "ping"
}