const argumentRegex = /(;*(?:("(?:[^"\\]|\\.)*"|(?:[^ ;]+)));*)/g;
const trimifyRegex = /(?:^;+)|(?:;+$)/g;

function parse(text) {
	var match = argumentRegex.exec(text);
	const items = [];
	while (match != null) {
		items.push(match[1]);
		match = argumentRegex.exec(text);
	}
	for (var i = 0; i < items.length; i++) {
		items[i] = trim(items[i]);
	}
	return items;
}
function trim(text) {
	text = text.replace(trimifyRegex, "");
	if (text.startsWith('"') && text.endsWith('"')) {
		text = text.slice(1, text.length - 1).replace(/\\(.)/g, "$1");
	}
	return text;
}

module.exports = parse;