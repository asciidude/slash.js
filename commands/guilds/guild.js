const Command = require("../../command.js");
const errors = require("../../errors.js");

module.exports = context => {
	context.commands.push(new Command({
		name: "guild",
		aliases: ["g"],
		desc: "Selects a guild by its name.",
		run: async args => {
			if (args.length != 1) {
				errors.invalidArguments();
				return;
			}
			if (context.client == null) {
				errors.notLoggedIn();
				return;
			}
			
			const guild = context.client.guilds.cache.find(g => g.name == args[0]);
			if (!guild) {
				errors.guildNotFound();
			} else {
				context.config.set("guild", guild.id);
				errors.foundGuild();
			}
		}
	}));
};