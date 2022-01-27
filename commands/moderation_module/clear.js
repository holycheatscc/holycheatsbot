const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    
    
    let clearEmbed = new Discord.RichEmbed()
    .setDescription(`**Clear Befehl**`)
    .setColor(botconfig["bot_setup"].green_embed_color)
    .addField(`Es wurden erfolgreich ${args[0]} Nachrichten gelöscht!`)
    .setTimestamp()
    .setFooter(`${botconfig["bot_setup"].copyright}`)
    
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Du hast nicht auszureichende Rechte!").then(msg => msg.delete(10000));
    if(!args[0]) return message.channel.send("Benutze bitte eine Zahl bspw.: `clear 5`.").then(msg => msg.delete(5000));
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(clearEmbed).then(msg => msg.delete(10000));
    });
}

module.exports.help = {
    name: "clear",
    name2: "purge"
}