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
	channels: ["spielbaerlp"]//process.env.channels.split(',')
}

const client = new tmi.client(opts)

	.on('connected', (addr, port) => console.log(`* Connected to ${addr}:${port}, Channels: [${process.env.channels}]`))
	.on('message', (target, context, msg, self) => {

		if (self) return;

		handler.checkCommand(client, target, context, "!game", self);
	})


	// connect to chat
	.connect()