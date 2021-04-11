const obj =
{
    names: ["!dc", "!discord", "!dcserver"],
    exec: function (client, target, context, msg) {
        let text = '';

        if (target === "#tefanoro") {
            text = `@${context['display-name']} https://discord.gg/GER4CT6HWT`;
        }
        else if (target === "#bene_1") {
            text = `@${context['display-name']} https://discord.gg/VcU4YSpte7`;
        }

        client.say(target, text);
        console.log(text + "\n")
    }
}

module.exports.obj = obj;