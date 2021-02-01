const Command = require("../../command.js");
const errors = require("../../errors.js");
const Botcord = require("discord.js");

module.exports = context => {
	context.commands.push(new Command({
		name: "login",
		run: async args => {
			if (args.length != 1) {
				errors.argsLogin();
				return;
			}

			if (context.client != null) context.client.destroy();
			context.client = new Botcord.Client;
			context.setupEvents();

			context.client.login(args[0]).then(() => {
				errors.successfulLogin();
			}).catch(() => {
				errors.invalidLogin();
			});

			context.config.set("token", args[0]);
		}
	}));
};