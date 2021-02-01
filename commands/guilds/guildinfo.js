const Command = require("../../command.js");
const errors = require("../../errors.js");
const colors = require("colors");

module.exports = context => {
	context.commands.push(new Command({
		name: "guildinfo",
		aliases: ["ginfo", "guildinf", "ginf", "serverinfo", "serverinf", "servinf", "servinfo"],
		desc: "See the guild's information.",
		run: async args => {
			if (context.guild == null) {
				errors.notInGuild();
				return;
            }
			
			const guild = context.client.guilds.cache.get(context.guild);
			console.log(colors.gray(`---- ${guild.name}'s Information ----`));
			console.log(`Name: ${guild.name}`);
			console.log(`ID (Identifier): ${guild.id}`);
			console.log(`Emoji amount: ${guild.emojis.cache.size}`);
			console.log(`Member amount: ${guild.memberCount}`);
			console.log(`Channels amount: ${guild.channels.cache.size}`);
			console.log(`Owner: ${(await context.client.users.fetch(guild.ownerID)).tag}`);
			console.log(`Owner is Bot?: ${(await context.client.users.fetch(guild.ownerID).bot ? true : false)}`);
			console.log(`Created at: ${new Date().toUTCString(guild.createdAt)}`);
			console.log(colors.gray(`---- ${guild.name}'s Information ----`));
		}
	}));
};