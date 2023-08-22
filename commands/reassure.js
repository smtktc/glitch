const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reassure')
		.setDescription('Sends a reassuring message.')
		.addUserOption(option => option.setName('target')
      .setDescription('Who needs the support??')
      .setRequired(false))
};
