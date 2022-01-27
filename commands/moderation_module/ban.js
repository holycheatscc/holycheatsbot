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
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid Permissions.").then(msg => msg.delete(10000));
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid Permissions.").then(msg => msg.delete(10000));

        if(botconfig["module_toggles"].mod_logs) {
            let banEmbed = new Discord.RichEmbed()
            .setDescription("User gebannt")
            .setColor("#870000")
            .addField("Gebannter User", `${bUser} - Hash: ${bUser.user.tag} - ID: ${bUser.id}`)
            .addField("Gebannt von", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
            .addField("Channel wo er gebannt wurde", message.channel)
            .addField("Zeit", message.createdAt)
            .addField("Grund", `${bReason}.`);

            let banChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].ban_logs_channel);
            if(!banChannel) return console.log("Channel not found (Config: 'ban_logs_channel')");
            banChannel.send(banEmbed)
        }

        if(botconfig["moderation_module"].DM_banned_user) {
            try{
                await bUser.send(`**MITTEILUNG** \nDiese Nachricht ist automatisiert, du wurdest von: **${message.guild.name}** für den folgenden Grund gebannt: \n${bReason}.*`);
            }catch(e){
                console.log('\x1b[33m%s\x1b[0m', "I tried to DM a new user, but their DM's are locked.");
            }
        }
        
        let bannedEmbed = new Discord.RichEmbed()
        .setDescription(":white_check_mark: User erfolgreich gebannt")
        .setColor("#00FF00")
        .addField("Gebannter User", `${bUser} - ID: ${bUser.id}`)
        .addField("Gebannt von", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("Grund", `${bReason}.`);

        message.channel.send(bannedEmbed)
        message.guild.member(bUser).ban(bReason);
}

module.exports.help = {
    name: "ban"
}