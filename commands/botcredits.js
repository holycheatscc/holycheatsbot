const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let botembed = new Discord.RichEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .addField("Name", `${bot.user.username}`)
    .addField("Servers", bot.guilds.size)
    .addField("Credits", `This Bot was made by holycheats.cc#4293!`)

    message.channel.send(botembed).then(msg => msg.delete(60000));
}

module.exports.help = {
    name: "credits",
    name2: "ersteller",
    name3: "madeby"
}