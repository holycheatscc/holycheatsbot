const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let totalSeconds = (bot.online / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);

    let onlineEmbed = new Discord.RichEmbed()
    .setDescription(`${bot.user.username} ist seit dieser Zeit online!`)
    .setColor(botconfig["bot_setup"].main_embed_color)
    .addField("Stunden", hours)
    .addField("Minuten", minutes)
    .setTimestamp()
    .setFooter(`${botconfig["bot_setup"].copyright}`)
    
    message.channel.send(onlineEmbed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "online",
    name2: "uptime",
    name3: "onlinetime",
    name4: "wielangebistda",
}