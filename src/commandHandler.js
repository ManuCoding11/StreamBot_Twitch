const fs = require('fs');

class CommandHandler {

    commandFunctions = {}
    names = []

    constructor (cf = {}) {

        this.commandFunctions = cf;
    }

    loadFunctions (dir = "src/commands/") {

        let files = fs.readdirSync(dir);

        for (let file of files) {
            if (!file.endsWith('.js') && file == "commandHandler.js") return;

            const fDir = "./commands/" + file;
            let cf = require(fDir.replace('.js', ''));
            
            cf.obj.names.forEach(n => {
                this.commandFunctions[n] = cf.obj.exec;
                this.names.push(n)
            });
        }
    }

    checkCommand (client, target, context, msg, self = false) {

        if (this.commandFunctions !== {}) {

            if (this.names.includes(msg.split(' ')[0].toLowerCase())) {

                this.commandFunctions[msg.split(' ')[0]](client, target, context, msg, self);

                console.log(`${context['display-name']} issued command ${msg.split(' ')[0].toLowerCase()} with parameters [${msg.split(' ').slice(1)}]`);
            }
        }

        else {

            throw new ReferenceError("Command list is empty.");
        }
    }
}

module.exports = CommandHandler;