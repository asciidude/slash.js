const Botcord = require("discord.js");
const errors = require("./errors.js");
const colors = require("colors");
const params = require("./params.js");

module.exports = class Context {
	constructor(config) {
		config.create("token", null);
		config.create("guild", null);
		config.create("listening", true);
		config.create("doFormatting", true);
		config.create("showRole", true);

		const type = config.get("type");
		const token = config.get("token");

		this.config = config;
		this.client = null;
		this.guild = config.get("guild");
		//this.channel = config.get("channel"); (new feature?)
		this.commands = [];
		
		this.client = new Botcord.Client;
		this.setupEvents();
		this.client.login(token).then(() => {
			errors.successfulLogin();
		}).catch(() => {
			errors.invalidLogin();
		});
	}
	setupEvents() {
		this.client.on("message", msg => {
			if(msg.author.id == this.client.user.id) return;
			if (
				this.channel != null &&
				msg.channel.id == this.channel.id &&
				this.config.get("listening")
			) {
				var text = msg.content;

				// formatting
				text = text.replace(/\*\*(.*?)\*\*/g, (match, text) => {
					return colors.bold(text);
				});
				text = text.replace(/\*(.*?)\*/g, (match, text) => {
					return colors.italic(text);
				});
				text = text.replace(/\_\_(.*?)\_\_/g, (match, text) => {
					return colors.underline(text);
				});
				text = text.replace(/\_(.*?)\_/g, (match, text) => {
					return colors.italic(text);
				});
				text = text.replace(/\~\~(.*?)\~\~/g, (match, text) => {
					return colors.strikethrough(text);
				});

				// log messages
				if(this.config.get("showRole")) {
					console.log(
						colors.bold.red("[" + msg.member.roles.highest.name + "] ") + colors.cyan(msg.author.username) + " > " + text
					);
				} else {
					console.log(
						colors.cyan(msg.author.username) + " > " + text
					);
				}
			}
		});
	}
	async handle(cmd, args) {
		var found = false;
		this.commands.forEach(async command => {
			if (command.name.toLowerCase() == cmd.toLowerCase()) {
				found = true;
				await command.run(args);
			}
		});
		if (!found) {
			this.commands.forEach(async command => {
				command.aliases.forEach(async alias => {
					if (alias.toLowerCase() == cmd.toLowerCase()) {
						found = true;
						await command.run(args);
					}
				});
			});
		}
		if (!found) {
			errors.unknownCommand(cmd);
		}
	}
	async execute(items) {
		if (items.length != 0) {
			return await this.handle(items[0], items.slice(1));
		}
	}
	async run(text) {
		const items = params(text);
		return await this.execute(items);
	}
};

// https://nodejs.org/en/knowledge/command-line/how-to-get-colors-on-the-command-line/