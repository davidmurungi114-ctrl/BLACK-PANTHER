import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const require    = createRequire(import.meta.url);

const { setMenuState } = require('../../lib/menuState.cjs');
const { getSortedCategories } = require('../../design');

export default {
    name: 'menu',
    aliases: ['commands', 'list', 'cmds', 'm', 'cmd', 'commandlist', 'allcmds'],
    description: 'Displays COOLGUY MD TECH menu',
    run: async (context) => {
        const { client, m, mode, botname, prefix, config: cfg } = context;

        await client.sendMessage(m.chat, { react: { text: '🤖', key: m.reactKey } });

        const expiryDate = cfg?.EXPIRY_DATE || '';
        let expiryLine;
        if (!expiryDate) {
            expiryLine = `▢ ⏳ 𝐄𝐱𝐩𝐢𝐫𝐲  : ∞ Never`;
        } else {
            const exp = new Date(expiryDate);
            const now = new Date();
            const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
            if (diffDays < 0) expiryLine = `▢ ⏳ 𝐄𝐱𝐩𝐢𝐫𝐲  : *EXPIRED* ❌`;
            else if (diffDays === 0) expiryLine = `▢ ⏳ 𝐄𝐱𝐩𝐢𝐫𝐲  : *Today* ⚠️`;
            else expiryLine = `▢ ⏳ 𝐄𝐱𝐩𝐢𝐫𝐲  : ${expiryDate} _(${diffDays}d left)_`;
        }

        const headerText =
`⚡ ──「 COOLGUY MD TECH ┃ ᴹᴰ 」──
▢ 👤 𝐔𝐬𝐞𝐫    : @${m.sender.split('@')[0].split(':')[0]}
▢ 🤖 𝐁𝐨𝐭     : COOLGUY MD TECH
▢ 📌 𝐏𝐫𝐞𝐟𝐢𝐱  : ${prefix}
▢ 🌐 𝐌𝐨𝐝𝐞    : ${mode}
${expiryLine}
└──✦ COOLGUY MD TECH ✦──`;

        const sorted = getSortedCategories();
        let catLines = '';
        sorted.forEach(({ cat }, i) => {
            const label = (cat[0].toUpperCase() + cat.slice(1)).toUpperCase();
            const num = String(i + 1).padStart(2, ' ');
            catLines += `▢ ${num} 〢 ${label}\n`;
        });

        const categoryText =
`⚡ ──「 Sᴇʟᴇᴄᴛ Cᴀᴛᴇɢᴏʀʏ 」──
${catLines.trimEnd()}
└──✦ COOLGUY MD TECH ✦──

> *Reply with a number to view that category*`;

        const fullText = headerText + '\n\n' + categoryText;

        // YOUR NEW PIC HERE - COOLGUY MD TECH
        const menuImage = "https://files.catbox.moe/2rrq0u.jpg";

        const sentMsg = await client.sendMessage(m.chat, {
            image: { url: menuImage },
            caption: fullText,
            mentions: [m.sender],
        }).catch(async () => {
            // Fallback to text if image fails
            return await client.sendMessage(m.chat, {
                text: fullText,
                mentions: [m.sender],
            });
        });

        const menuMsgId = sentMsg?.key?.id;
        setMenuState(m.chat, menuMsgId || null);

        await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
    }
};
