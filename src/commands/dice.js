const obj =
{
    names: ["!dice", "!rolldice", "!würfel"],
    exec: function (client, target, context, msg) {

        const params = msg.split(' ').slice(1);
        let text = '';

        if (!isNaN(params[0])) {
            if (Math.floor(params[0]) < 2) text = 'Der Würfelbereich muss größer als 1 sein.';
            else if (Math.floor(params[0]) > 511) text = 'Der maximale Würfelwert ist 511.';
            else if (Math.floor(params[0] <= 511 && Math.floor(params[0]) >= 2)) {
                let num = Math.floor(Math.random() * Math.floor(params[0])) + 1;
                text = `Du hast eine ${num} gewürfelt.`;
            }
        }
        else {
            let num = Math.floor(Math.random() * 6) + 1;
            text = `Du hast eine ${num} gewürfelt.`;
        }

        console.log(text + "\n");
        client.say(target, text);
    }
}

module.exports.obj = obj;