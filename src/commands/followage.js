const fetch = require('node-fetch');

const obj =
{
    names: ["!followage", "!follow"],
    exec: function (client, target, context, msg) {

        fetch(`https://2g.be/twitch/following.php?user=${context.username}&channel=${target.slice(1)}&format=mwdhms&notext`)
            .then(res => res.text())
            .then(body => {

                let channel = target[1].toUpperCase() + target.slice(2);

                let formatted = body
                .replace("years", "Jahren").replace("year", "Jahr")
                .replace("months", "Monaten").replace("month", "Monat")
                .replace("weeks", "Wochen").replace("week", "Woche")
                .replace("days", "Tage").replace("day", "Tag")
                .replace("hours", "Stunden").replace("hour", "Stunde")
                .replace("minutes", "Minuten").replace("minute", "Minute")
                .replace("seconds", "Sekunden").replace("second", "Sekunde")
                .replace("has been following", "folgt").replace("for", "seit")
                .replace("is not following", `ist kein Follower von ${channel}`);

                let text = `@${context['display-name']} folgt diesem Kanal schon seit ${formatted}`;
                client.say(target, text);
                console.log(text);
            })
            .catch(rej => console.error(rej));
    }
};

module.exports.obj = obj;