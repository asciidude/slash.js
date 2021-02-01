module.exports = class Command {
	constructor({
		name = "test", run = () => {}, aliases = [],
		desc = "No description provided."
	} = {}) {
		this.name = name;
		this.run = run;
		this.desc = desc;
		this.aliases = aliases;
	}
};