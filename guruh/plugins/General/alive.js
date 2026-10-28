import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { botname } from '../../config/settings.js';

export default {
  name: 'alive',
  aliases: ['bot', 'test', 'isalive', 'status'],
  description: 'Checks if the bot is alive',
  run: async (context) => {
    const { client, m, prefix } = context;
    await client.sendMessage(m.chat, { react: { text: '🤖', key: m.reactKey } });
    const bName = 'COOLGUY MD TECH';

    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = Math.floor(uptime % 60);
    const uptimeStr = `${days}d ${hours}h ${mins}m ${secs}s`;

    const caption = `⚡ ──「 I'ᴍ Aʟɪᴠᴇ 」──
▢ @${m.sender.split('@')[0]}, I'm up and running.
▢ Bot: COOLGUY MD TECH 🔥
▢ Owner: David 256726940466
▢ Been alive for ${uptimeStr}.
▢ Type *${prefix}menu* for commands.
└──✦ COOLGUY MD TECH ┃ ᴹᴰ ✦──`;

    // YOUR NEW PIC - COOLGUY MD TECH
    const myPic = "https://files.catbox.moe/2rrq0u.jpg";

    await client.sendMessage(m.chat, {
      image: { url: myPic },
      caption: caption,
      mentions: [m.sender]
    });

    await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
  }
};
