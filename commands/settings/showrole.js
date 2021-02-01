const Command = require("../../command.js");
const errors = require("../../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "showrole",
		aliases: ["sr"],
		desc: "Toggle whether or not roles will be shown in messages.",
		run: async args => {
			if (context.client == null) {
				errors.notLoggedIn();
				return;
            }
            
			const isToggled = context.config.get("showRole");
			context.config.set("showRole", !isToggled);
			console.log("Set showRole to " + context.config.get("showRole"));
		}
	}));
};