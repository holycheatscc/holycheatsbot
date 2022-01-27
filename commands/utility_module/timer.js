const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let Timer = args[0];
    if(!args[0]){
        return message.channel.send("Bitte gib eine Zeit an. `s, m oder h` am Ende!");
    }
    if(args[0] <= 0){
        return message.channel.send("Please enter a period of time, with either `s, m or h` at the end!");
    }
    message.channel.send(":white_check_mark: Timer wurde auf diese Zeit gesetzt: " + `${ms(ms(Timer), {long: true})}`)
    setTimeout(function(){
        message.channel.send(`Der Timer wurde beendet nach ${ms(ms(Timer), {long: true})} ` + message.author.toString())
    }, ms(Timer));
}

module.exports.help = {
    name: "timer"
}