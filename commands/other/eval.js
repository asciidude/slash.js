const Command = require("../../command.js");
const errors = require("../../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "eval",
		desc: "Executes JavaScript code.",
		run: async args => {
			if (args.length > 1) {
				errors.invalidArguments();
				return;
			}
			
            try {
			    console.log(eval(args[0]));
			} catch (e) {
                errors.evalError();
                console.log(e);
			}
		}
	}));
};