const Command = require("../../command.js");
const errors = require("../../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "channel",
		aliases: ["c", "ch"],
		desc: "Selects a channel in the current guild by its name.",
		run: async args => {
			if (args.length != 1) {
				errors.invalidArguments();
				return;
			}
			if (context.client == null) {
				errors.notLoggedIn();
				return;
			}
			if (context.guild == null) {
				errors.notInGuild();
				return;
			}
			
			try {
				context.channel = context.client.channels.cache.find(c => c.name == args[0]);
				errors.foundChannel();
			} catch(e) {
				errors.channelNotFound();
			}
		}
	}));
};