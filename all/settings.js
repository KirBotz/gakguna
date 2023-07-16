require("./module")

global.owner = "62877050482351"
global.creAtor = "62877050482351@s.whatsapp.net"
global.namabot = "KirBotz"
global.thumb = fs.readFileSync("./thumb.png")
global.thumbqris = fs.readFileSync("./qris.jpg")
global.packname = ""
global.author = "Sticker By KirBotz"
global.nameGEDE = "KIRBOTZ"
global.ovo = "0877-0504-8235" 
global.gopay = "0877-0504-8235"
global.shopeepay = "0857-9814-5596"
global.pulsaxl = "0877-0504-8235"
global.pulsaindosat = "0857-9814-5596"
global.phs = "•"
global.antilink = false

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})