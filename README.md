# Discord.JS-Bot-Template
A discord.js bot template that includes a command handler which has aliases and cooldowns.

> Note: This uses discord.js version 12, which is outdated. This repository will no longer be updated.

# How To Use

## Setup
1. Download the files or git clone it.
2. Install discord.js by typing `npm install discord.js` in the console/terminal.
3. Go to `config.json` and put your values according to your bot.
```
{
  token: 'YOUR TOKEN HERE',
  prefix: 'YOUR PREFIX HERE'
}
```
3. (Optional) Go to index.js and customize the ready messasge and bot status.

## Creating Commands
1. Create a .js file inside a sub-folder inside the commands directory. (If it's not in a sub-folder it will error)
2. Use the following format:
```
module.exports = {
  name: 'command-name',
  aliases: ['alias1', 'alias2', 'etc'],
  cooldown: 1000, //Time should be in milliseconds
  async run (client, message, args) {
    //Your code here
  }
}
```
