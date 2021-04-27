const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  aliases: ['botping'],
  async run (client, message, args) {
    message.channel.send(`Pong! ${client.ws.ping}ms`)
  }
}
  
