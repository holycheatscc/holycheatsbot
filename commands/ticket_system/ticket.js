const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
         
    if (!message.guild.roles.find(role => role.id === botconfig["ticket_system"].support_role)) return message.channel.send(`No role to create ticket. Please contact the server owner.`).then(msg => msg.delete(15000));
    
    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        moveTicket(c)
        let roleSupportRole = message.guild.roles.find(role => role.id === botconfig["ticket_system"].support_role);
        let roleEveryone = message.guild.roles.find(role => role.name === "@everyone");
        c.overwritePermissions(roleSupportRole, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(roleEveryone, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.setTopic(`Ticket ID: ${message.author.id} | Creator: ${message.author.username}`)
        message.channel.send(`:white_check_mark: ***<@${message.author.id}> Dein Ticket wurde erfolgreich erstellt, <#${c.id}>.***`).then(msg => msg.delete(15000));
        const embed = new Discord.RichEmbed()
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setDescription(`**Lieber <@${message.author.id}>!**\n\nUnser Support Team wurde benachrichtigt und wird sich gleich um dich kümmern!\n Um das Ticket zu schließen nutze: \`?close\`.`)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright}`)
        c.send(embed)

        if(botconfig["ticket_system"].auto_reply) {
            if(!message.guild.channels.find(channel => channel.name === c.id)) return
            const filter = m => m.author.id === message.author.id;
            c.awaitMessages(filter, { max: 1, time: ms('1d') }).then(idfk => {
                c.send(botconfig["ticket_system"].auto_reply_message)
            })
        }
    }).catch(console.error);
    async function moveTicket(c) {
        await c.setParent(botconfig["channel_setup"].ticket_category);
    };
}

module.exports.help = {
    name: "new"
}