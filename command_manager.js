const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const secrets = require('./db/secrets.json');

const token = secrets["token"]
const client_id = secrets["client_id"]
const guild_id = secrets["guild_id"]

const rest = new REST({ version: '9' }).setToken(token);

if (process.argv[2] == undefined || process.argv[2] == "create")
{
	const commands = [];
	const pepex_commands = [];

	const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	const pepex_command_files = fs.readdirSync('./commands/pepex').filter(file => file.endsWith('.js'));

	for (const file of command_files) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}

	for (const file of pepex_command_files) {
		const pepex_command = require(`./special_commands/${file}`);
		pepex_commands.push(pepex_command.data.toJSON());
	}

	(async () => {
	  try {
	    console.log('Started refreshing application (/) commands.');

	    await rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: pepex_commands })
		.then(() => console.log('Successfully created all pepex commands.'))
		.catch(console.error);

			await rest.put(Routes.applicationCommands(client_id), { body: commands })
		.then(() => console.log('Successfully created all application commands.'))
		.catch(console.error);

	  } catch (error) {
	    console.error(error);
	  }
	})();

}
else if(process.argv[2] == "delete")
{

	(async () => {
	  try {
	    console.log('Started refreshing application (/) commands.');

	    await rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: [] })
		.then(() => console.log('Successfully deleted all pepex commands.'))
		.catch(console.error);

			await rest.put(Routes.applicationCommands(client_id), { body: [] })
		.then(() => console.log('Successfully deleted all application commands.'))
		.catch(console.error);

	  } catch (error) {
	    console.error(error);
	  }
	})();
}
