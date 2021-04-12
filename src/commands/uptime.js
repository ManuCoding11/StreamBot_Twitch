const fetch = require('node-fetch');

const obj =
{
    names: ["!uptime"],
    exec: function (client, target, context, msg) {
        fetch(`https://decapi.me/twitch/uptime/${target.slice(1)}`)
            .then(res => res.text())
            .then(body => {

                let formatted = body
                .replace("days", "Tage").replace("day", "Tag")
                .replace("hours", "Stunden").replace("hour", "Stunde")
                .replace("minutes", "Minuten").replace("minute", "Minute")
                .replace("seconds", "Sekunden").replace("second", "Sekunde");

                let channel = target[1].toUpperCase() + target.slice(2);
                let text = `${channel} streamt schon seit ${formatted}.`;

                console.log(text + "\n");
                client.say(target, text);
            })
            .catch(rej => console.error(rej));
    }
}