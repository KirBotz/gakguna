require("./global")
const func = require("./place") 

const basenewkirbotz = {};

async function jadibot(basenewkirbotz, jid) {
const { state, saveCreds } = await useMultiFileAuthState(`./all/jasajadibot/${jid.split("@")[0]}`);
const { version, isLatest } = await fetchLatestBaileysVersion();

basenewkirbotz[jid] = func.makeWASocket({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['Base By KirBotz','Safari','1.0.0'],
auth: state,
version,
});

const store = makeInMemoryStore({
logger: pino().child({ level: "fatal", stream: "store" }),
});

basenewkirbotz[jid].ev.on("creds.update", saveCreds);

basenewkirbotz[jid].ev.on("contacts.update", (update) => {
for (let contact of update) {
let id = basenewkirbotz[jid].decodeJid(contact.id);
if (store && store.contacts)
store.contacts[id] = { id, name: contact.notify };
}
});

basenewkirbotz[jid].ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return basenewkirbotz[jid].readMessages([m.key])
if (!basenewkirbotz[jid].public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(basenewkirbotz[jid], m, store)
require("../appearance")(basenewkirbotz[jid], m, store)
} catch (err) {
console.log(err)
}
})

basenewkirbotz[jid].public = true

basenewkirbotz[jid].ev.on("connection.update", async (update) => {
const { connection, qr, lastDisconnect } = update;
const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
if (connection == "open") {
return basenewkirbotz[jid].sendMessage(jid, { text: "Connected to server." });
return basenewkirbotz[jid].groupAcceptInvite(codeInvite);
}
if (qr) {
return basenewkirbotz.sendMessage(jid, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: "Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Klik Perangkat tertaut\n3. Klik Tautkan Perangkat\n4. Scan QR Ini\n\nKalau Mau Berhentiin Jadibot Silahkan Ketik .stopjadibot"});
}
if (connection === "close") {
if (reason === DisconnectReason.restartRequired) {
console.log(color("Restart Required, Restarting..."));
return this.jadibot(basenewkirbotz, jid);
} else if (reason === DisconnectReason.timedOut) {
console.log(color("Connection TimedOut, Reconnecting..."));
return this.jadibot(basenewkirbotz, jid);
} else {
return basenewkirbotz.sendMessage(jid, {
text: "Anda sudah tidak lagi menjadi bot.",
});
}
}
});
};

async function stopjadibot(basenewkirbotz, jid) {
if (!Object.keys(basenewkirbotz).includes(jid)) {
return basenewkirbotz.sendMessage(jid, { text: "Anda tidak ada di list jadi bot." });
}
try {
basenewkirbotz[jid].end("Stop");
} catch {}
try {
basenewkirbotz[jid].logout();
} catch {}
delete basenewkirbotz[jid];
rimraf.sync(`./all/jasajadibot/${jid.split("@")[0]}`);
};

async function listjadibot(basenewkirbotz, m) {
let from = m.key.remoteJid
let mentions = [];
let text = "List Jadi Bot :\n";
for (let jadibot of Object.values(basenewkirbotz)) {
mentions.push(jadibot.user.jid);
text += ` × @${jadibot.user.jid.split("@")[0]}\n`;
}
return basenewkirbotz.sendMessage(from, {
text: text.trim(),
mentions,
});
};

global.jadibot = jadibot
global.stopjadibot = stopjadibot
global.listjadibot = listjadibot