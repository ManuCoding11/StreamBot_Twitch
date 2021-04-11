const fetch = require('node-fetch');

const obj =
{
    names: ["!game", "!spiel", "!category", "!kategorie"],
    exec: function (client, target, context, msg) {

        fetch(`https://decapi.me/twitch/game/${target.slice(1).toLowerCase()}`)
            .then(res => res.text())
            .then(body => {
                let channel = target[1].toUpperCase() + target.slice(2);
                let text = (msg.split(' ')[0].toLowerCase() === "!category" || msg.split(' ')[0].toLowerCase() === "!kategorie") ?
                    `@${context['display-name']} ${channel} streamt derzeit in der Kategorie ${body}.` :
                    `@${context['display-name']} ${channel} spielt zurzeit ${body}.`;
                client.say(target, text);
                console.log(text + "\n");
            })
            .catch(rej => console.error(rej));
    }
};

module.exports.obj = obj;