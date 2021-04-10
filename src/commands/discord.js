const obj =
{
    names: ["!dc", "!discord", "!dcserver"],
    exec: function (client, target, context, msg) {
        if (target === "#tefanoro") {
            client.say(target, `@${context['display-name']} https://discord.gg/GER4CT6HWT`);
        }
        else if (target === "#bene_1") {
            client.say(target, `@${context['display-name']} https://discord.gg/VcU4YSpte7`);
        }
    }
}

module.exports.obj = obj;