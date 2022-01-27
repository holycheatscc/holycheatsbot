const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Bitte gib einen Namen an.").then(msg => msg.delete(10000));
        let bReason = args.join(" ").slice(22);
        if(!bReason) return message.channel.send("Bitte gib eine Begründung an.").then(msg => msg.delete(10000));
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Invalid Permissions.").then(msg => msg.delete(10000));
        if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Invalid Permissions.").then(msg => msg.delete(10000));

        if(botconfig["module_toggles"].mod_logs) {
            let banEmbed = new Discord.RichEmbed()
            .setDescription("**ANONYMER BAN**")
            .setColor("#870000")
            .addField("------")
            .addField("Gebannter User", `${bUser} - Hash: ${bUser.user.tag} - ID: ${bUser.id}`)
            .addField("Gebannt von", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
            .addField("Channel wo er gebannt wurde", message.channel)
            .addField("Zeit", message.createdAt)
            .addField("Grund", `${bReason}.`);

            let banChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].admin_logs_channel);
            if(!banChannel) return console.log("Channel not found (Config: 'admin_logs_channel')");
            banChannel.send(banEmbed)
        }
        
        let bannedEmbed = new Discord.RichEmbed()
        .setDescription(":white_check_mark: User erfolgreich gebannt")
        .setColor("#00FF00")
        .addField("Gebannter User", `${bUser} - ID: ${bUser.id}`)
        .addField("Gebannt von", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("Grund", `${bReason}.`);

        //message.channel.send(bannedEmbed)
        message.guild.member(bUser).ban(bReason);
}

module.exports.help = {
    name: "anonban",
    name2: "adminban"
}