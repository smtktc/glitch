const { Client, Intents } = require('discord.js');
const moment = require('moment');

//const keepAlive = require("./server");

const messages = require('./db/messages.json');
const secrets = require('./db/secrets.json');

const client = new Client({ intents: 4609 });

const token = secrets["token"]
const client_id = secrets["client_id"]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("-----\nlist of guilds:")
  client.guilds.cache.forEach((guild) => {
    console.log(guild.name)
  })

});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  command_name = interaction.commandName
  command_arguments = interaction.options.data
  channel = interaction.channel

  console.log(command_name + " | command received")

  if (command_name == 'reassure') {
    var message = messages["reassure"][Math.floor(Math.random() * messages["reassure"].length)]

    if (command_arguments[0]) { //if an arguement was entered
      await interaction.reply("<@" + command_arguments[0]["value"] + "> " + message)
    }
    else {
      await interaction.reply(message)
    }
  }
})


client.login(token)
