const readline = require("readline");
const Context = require("./context.js");
const errors = require("./errors.js");
const Config = require("./config.js");
const path = require('path');
const fs = require('fs');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const context = new Context(new Config("./config.json"));

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

dirs('./commands/').forEach(directory => {
	fs.readdir('./commands/' + directory, (err, files) => {
		if(!files) return false;
		if (err) throw err;
		
		files.forEach(file => {
			require(`./commands/${directory}/${file}`)(context);
		});
	});
});

const step = () => {
	rl.question("slash.js > ", async text => {
		await context.run(text);
		step();
	});
};

step();

/*
	Embed command ideas:
	- format: createembed "Title" "Description" "Footer" "Color" "Author" "AuthorImg" "AuthorURL"
	- format: createembed title:"" desc:"" footer:"" color:"" author:"" authorimg:"" authorurl:""
*/