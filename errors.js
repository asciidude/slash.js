function error(text) {
	console.error("[Error]: " + text)
}
function info(text) {
	console.log("[INFO]: " + text);
}
function argsLogin() {
	error("Usage: login [token]")
}
function unknownCommand(command) {
	error("Command \"" + command + "\" was not found.")
}
function invalidArguments() {
	error("Invalid arguments.")
}
function userNotFound() {
	error("User was not found.");
}
function invalidLogin() {
	error("Could not login with that token.\nIf you are recieving this on startup, the token you have provided last time does not exist or has changed")
}
function successfulLogin() {
	info("Successfully logged in.")
}
function foundGuild() {
	info("Sucessfully selected guild.")
}
function foundChannel() {
	info("Sucessfully selected channel.")
}
function evalError() {
	error("Failed to run eval command.")
}
function guildNotFound() {
	error("Guild was not found.")
}
function notInGuild() {
	error("Guild has not been selected.")
}
function channelNotFound() {
	error("Channel was not found.")
}
function notLoggedIn() {
	error("You are not logged in, please login using the login command.")
}
function notInChannel() {
	error("You are not in a channel.")
}
function emptyMessage() {
	error("Cannot send an empty message.")
}
function sentMessage(channelName) {
	info("Successfully sent message in " + channelName + ".")
}
function isListening(bool) {
	info(bool ? "Listening to the active channel's messages." : "No longer listening to the active channel's messages.")
}
function nullGuilds() {
	error("No guilds were found on cache.");
}
function messageNotFound() {
	error("Message not found.");
}

module.exports = {
	error, info, evalError,
	unknownCommand, invalidArguments,
	invalidLogin, successfulLogin, foundGuild,
	guildNotFound, notLoggedIn, notInChannel,
	channelNotFound, notInGuild, userNotFound,
	foundChannel, emptyMessage, sentMessage,
	isListening, argsLogin, nullGuilds,
	messageNotFound, 
};