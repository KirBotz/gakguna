require("./module")

function stickerSearch(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://getstickerpack.com/stickers?query='+query).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#stickerPacks > div > div:nth-child(3) > div > a')
			main.each( function() {
				const url = $(this).attr('href')
				const title = $(this).find('div > span').text()
				result.push({ title, url })
			})
			resolve(result)
		}).catch(reject)
	})
}

global.stickerSearch = stickerSearch