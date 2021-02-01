const Command = require("../../command.js");
const errors = require("../../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "send", 
		aliases: ["say", "s", "chat"],
		desc: "Send a message to the active channel",
		run: async args => {
			if (args.length != 1) {
                errors.invalidArguments();
                return;
			}
			if (args[0].trim().length == 0) {
				errors.emptyMessage();
				return;
			}
            if (context.channel == null) {
				errors.notInChannel();
				return;
			}
            context.channel.send(args[0]);
            errors.sentMessage("#" + context.channel.name);
		}
	}));
};