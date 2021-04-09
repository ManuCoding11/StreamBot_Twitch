require('dotenv').config({path: 'src/env/.env'})
const fetch = require('node-fetch')
const tmi = require('tmi.js')


const opts = {
	identity: {
		username: process.env.bot_username,
		password: process.env.bot_password
	},
	channels: process.env.channels.split(',')
}

new tmi.client(opts)

	.on('connected', (addr, port) => console.log(`* Connected to ${addr}:${port}, Channels: [${process.env.channels}]`))
	.on('message', (target, context, msg, self) => {

    	if (self) return;

    	let command = msg.split(" ");
		command[0] = command[0].toLowerCase();

    	console.log(msg)
	})


	// connect to chat
	.connect()