const Command = require("../../command.js");
const errors = require("../../errors.js");

module.exports = context => {
	context.commands.push(new Command({
		name: "guildid",
		aliases: ["gid"],
		desc: "Selects a guild by its id.",
		run: async args => {
			if (args.length != 1) {
				errors.invalidArguments();
				return;
			}
			if (context.client == null) {
				errors.notLoggedIn();
				return;
			}
			const guild = context.client.guilds.cache.get(args[0]);
			if (!guild) {
				errors.guildNotFound();
			} else {
				context.guild = guild;
				context.config.set("guild", args[0]);
				errors.foundGuild();
			}
		}
	}));
};