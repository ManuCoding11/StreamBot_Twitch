require('dotenv').config()
const fetch = require('node-fetch')


const opts = {
	identity: {
		username: process.env.bot_username,
		password: process.env.bot_password
	},
	channels: process.env.channels
}

const client = new require('tmi.js').client(opts)


client.on('connected', (addr, port) => console.log(`* Connected to ${addr}:${port}`))

client.on('message', (target, context, msg, self) => {

    if (self) return;

    let command = msg.split(" ");
	command[0] = command[0].toLowerCase();

    console.log(msg)
})


// connect to chat
client.connect()