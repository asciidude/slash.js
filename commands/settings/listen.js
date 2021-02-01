const Command = require("../../command.js");
const errors = require("../../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "listen",
		desc: "Toggles whether or not you receive messages in the active channel.",
		run: async args => {
			if (args.length != 0) {
				errors.invalidArguments();
				return;
			}
			const res = !context.config.get("listening");
			context.config.set("listening", res);
			errors.isListening(res);
		}
	}));
}