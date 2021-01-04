import puppeteer from 'puppeteer'

const formatData = (header: any[], body: any[]) => {
	let keys: string[] = []
	let data: any[] = []
	for (let i = 0; i < header.length -2; i++) {
		switch (header[i]) {
			case '#':
				keys.push('id')
				break;
			case 'Name':
				keys.push('name')
				break;
			case 'Price':
				keys.push('price')
				break;
			case 'Market Cap':
				keys.push('market_Cap')
				break;
			case 'Volume':
				keys.push('volume')
				break;
			default:
				keys.push(header[i])
				break;
		}
	} 
	body.forEach((val: string[], index) => {
		if (val.length === keys.length) {
			const dataLine: any = {}
			val.forEach((v, i) => {
				dataLine[keys[i]] = v
			})
			data.push(dataLine)
		}
	})

	return data
}

export const crawling2 = (): Promise<any> => {
	return Promise.resolve(
	  [
		{
			id: "1",
			name: "Bitcoins",
			price: "BTC",
			'24': "$430",
			'7d': "$500",
			marketcap: "1,998,143 BTC",
			volume: "1,998,143 BTC",
		},
		{
			id: "3",
			name: "Bitcoins",
			price: "BTC",
			'24': "$430",
			'7d': "$500",
			marketcap: "1,998,143 BTC",
			volume: "1,998,143 BTC",
		},
		{
			id: "3",
			name: "Bitcoins",
			price: "BTC",
			'24': "$430",
			'7d': "$500",
			marketcap: "1,998,143 BTC",
			volume: "1,998,143 BTC",
		},
	  ]
	)
}

	export const crawling = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('https://coinmarketcap.com/')
	const response = await page.evaluate(() => {
		const thead: string[] = [] 
		const tbody: any[] = [] 
		Array.from(document.querySelectorAll('div.cmc-homepage table.cmc-table > thead > tr th p')).forEach((elem) => {
			thead.push(elem.textContent || ' -- ')
		})
		Array.from(document.querySelectorAll('div.cmc-homepage table.cmc-table > thead > tr')).forEach((elem) => {
			const data: string[] =[]
			Array.from(elem.querySelectorAll('td p')).forEach((e) => {
				data.push(e.textContent || ' -- ')
			})
			tbody.push(data)
		})

		return { thead, tbody }
	})

	await browser.close()
	const format = formatData( response.thead, response.tbody)
	return format
}