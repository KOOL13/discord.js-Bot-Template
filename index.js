const Discord = require("discord.js");
const client = new Discord.Client();

const config = require('./config.json')
const prefix = config.prefix

const fs = require('fs')

const { readdirSync, read } = require('fs');
const ms = require('ms');
const { join } = require('path');

client.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');
const Timeout = new Discord.Collection();

for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('error', console.error)

client.on('ready', async () => {
   console.log(`Ready!`)

    //Bot Status

    client.user.setActivity('Alpha Testing v0', {
      type: 'WATCHING'
    }).catch(console.error)
})

client.on("message", async (message) => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;

        if (command) {
            if(command.cooldown) {
                if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please Wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` Before using this command again!`);
                command.run(client, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else command.run(client, message, args);
        }
    }
})

client.login(config.token)
