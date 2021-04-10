const fs = require('fs');

/**
 * Module used to load and call files containing command actions.
 * 
 */

class CommandHandler {

    commandFunctions = {}
    names = []

    constructor (cf = {}) {

        this.commandFunctions = cf;
    }

    /**
     * Loads function files from a set directory.
     * @param {string} dir Directory to search for files
     */

    loadFunctions (dir = "src/commands/") {

        let files = fs.readdirSync(dir),
            fileErrors = {
                empty: [],
                type: [],
                undefined: []
            };

        for (let file of files) {
            if (!file.endsWith('.js') && file == "commandHandler.js") continue;

            const fDir = "./commands/" + file;
            let cf = require(fDir.replace('.js', ''));
            
            if (cf.obj.names == undefined) {
                fileErrors.undefined.push(file);
                continue;
            }

            if (cf.obj.names.length <= 0) {
                fileErrors.empty.push(file);
                continue;
            }

            if (!(cf.obj.names instanceof Array)) {
                fileErrors.type.push(file);
                continue;
            }

            cf.obj.names.forEach(n => {
                this.commandFunctions[n] = cf.obj.exec;
                this.names.push(n)
            });
        }


        try {
            if (fileErrors.empty.length > 0) 
            throw new ReferenceError(`No command name specified. Error in file(s): ${fileErrors.empty}\n${fileErrors.empty.length > 1 ? "Files have" : "File has"} been skipped`);
        }
        catch (e) {
            console.error(e);
        }

        try {
            if (fileErrors.undefined.length > 0) 
            throw new ReferenceError(`No command name property found. Please add a "names" property to the base object.\nError in file(s): ${fileErrors.undefined}\n${fileErrors.empty.length > 1 ? "Files have" : "File has"} been skipped`);
        }
        catch (e) {
            console.error(e);
        }

        try {
            if (fileErrors.type.length > 0)
            throw new TypeError(`Command name property is not of type Array.\nError in file(s): ${fileErrors.empty}\n${fileErrors.empty.length > 1 ? "Files have" : "File has"} been skipped`);
        }
        catch (e) {
            console.error(e);
        }
    }

    checkCommand (client, target, context, msg) {

        if (this.commandFunctions !== {}) {

            if (this.names.includes(msg.split(' ')[0].toLowerCase())) {

                this.commandFunctions[msg.split(' ')[0]](client, target, context, msg);

                console.log(`${context['display-name']} issued command ${msg.split(' ')[0].toLowerCase()} with parameters [${msg.split(' ').slice(1)}]`);
            }
        }

        else {

            throw new ReferenceError("Command list is empty.");
        }
    }
}

module.exports = CommandHandler;