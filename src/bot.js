require('dotenv').config({ path: 'src/env/.env' })
const tmi = require('tmi.js')
const CommandHandler = require("./commandHandler")
const handler = new CommandHandler()

handler.loadFunctions();

const opts = {
	identity: {
		username: process.env.bot_username,
		password: process.env.bot_password
	},
	channels: process.env.channels.split(',')
}

const client = new tmi.client(opts);

client
	.on('connected', (addr, port) => console.log(`* Connected to ${addr}:${port}, Channels: [${process.env.channels}]`))
	.on('message', (target, context, msg, self) => {

		if (self) return;

		handler.checkCommand(client, target, context, msg);
		
	})


	// connect to chat
	.connect()