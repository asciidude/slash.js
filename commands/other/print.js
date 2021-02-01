const Command = require("../../command.js");
const errors = require("../../errors.js");
const colors = require("colors");
module.exports = context => {
	context.commands.push(new Command({
		name: "print",
		desc: "Print something to the console.",
		run: async args => {
            if (args.length != 1) {
                errors.invalidArguments();
                return;
            }
			console.log("[Console]: " + args[0]);
		}
	}));
};