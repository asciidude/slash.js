const Command = require("../../command.js");
const errors = require("../../errors.js");
const colors = require("colors");

module.exports = context => {
	context.commands.push(new Command({
		name: "deletemessage",
		aliases: ["delmsg", "delm"],
		desc: "Delete message by ID.",
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
			
			if(context.channel == null) {
				errors.notInChannel();
				return;
			}
            
            if(isNaN(args[0])) {
                errors.invalidArguments();
                return;
            }

			//const msg = context.channel.messages.delete(args[0]);

			context.channel.messages.delete(args[0])
				.catch(e => console.log("An error occured, you probably dont have permissions to delete that message or the message does not exist.\n" + colors.gray("Detailed error: " + e)));
			console.log("Deleted message with an ID of " + args[0]);
		}
	}));
};