export default {
    name: 'coolguy',
    aliases: ['menu', 'my-menu'],
    run: async (context) => {
        const { client, m } = context;
        await client.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/2rrq0u.jpg" },
            caption: "⚡ COOLGUY MD TECH ┃ ᴹᴰ\n👤 User: @"+m.sender.split('@')[0]+"\n🤖 Bot: COOLGUY MD TECH\n👑 Owner: David\nPowered by COOLGUY MD TECH 🔥",
            mentions: [m.sender]
        });
    }
};
