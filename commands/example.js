const Command = require("../command.js");
const errors = require("../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "",
		desc: "An example command.",
		run: async args => {
			
		}
	}));
};