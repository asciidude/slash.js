const Command = require("../../command.js");
const errors = require("../../errors.js");
const colors = require("colors");
module.exports = context => {
	context.commands.push(new Command({
		name: "help",
		aliases: ["?", "commands", "cmds", "h"],
		desc: "Shows a list of commands.",
		run: async args => {
			if (args.length != 0) {
				errors.invalidArguments();
				return;
			}
			const res = [];
			context.commands.forEach(command => {
				res.push(colors.cyan(command.name) + ": " + command.desc);
			});
			console.log(colors.gray("-------HELP------"));
			console.log(res.join("\n"));
			console.log(colors.gray("-----------------"));
		}
	}));
};