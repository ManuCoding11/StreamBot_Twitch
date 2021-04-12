const obj =
{
    names: ["!dice", "!rolldice", "!würfel"],
    exec: function (client, target, context, msg) {

        const params = msg.split(' ').slice(1);
        let text = '';

        if (!isNaN(params[0])) {
            if (Math.floor(n) < 2) text = 'Der Würfelbereich muss größer als 1 sein.';
            else if (Math.floor(n) > 511) text = 'Der maximale Würfelwert ist 511.';
            else {
                let num = Math.floor(Math.random() * Math.floor(n)) + 1;
                text = `Du hast eine ${num} gewürfelt.`;
            }
        }

        console.log(text + "\n");
        client.say(target, text);
    }
}

module.exports.obj = obj;