//message.channel.send();
const Command = require("../../command.js");
const errors = require("../../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "getavatar",
		aliases: ["ga", "getav"],
		desc: "Get users avatar URL by their ID.",
		run: async args => {
			if (args.length != 1) {
				errors.invalidArguments();
				return;
            }
            
			if (context.client == null) {
				errors.notLoggedIn();
				return;
            }

            if(isNaN(args[0])) {
                errors.invalidArguments();
                return;
            }

			try {
                const user = context.client.users.cache.get(args[0]);
                console.log(user.displayAvatarURL);
            } catch(e) {
                errors.userNotFound();
                console.log(e);
            }
		}
	}));
};