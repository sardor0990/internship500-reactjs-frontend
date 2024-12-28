const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const API_KEY = 'AIzaSyDs_yMm2aHlTAduYj9C-_TMd4Twt6DzmCc';
const GOOGLE_DOC = '1McvdwnfDE_ObJ30HSABl2osX5CR1c8Q3kEFNnOLgIh4';
const SHEET_ID = 0;

(async () => {
	try {
		console.log('Start processing...');
		// Initialize the sheet - doc ID is the long id in the sheets URL
		const doc = new GoogleSpreadsheet(GOOGLE_DOC);

		doc.useApiKey(API_KEY);
		// GoogleSpreadsheet.useApiKey(API_KEY);

		await doc.loadInfo(); // loads document properties and worksheets

		const sheet = doc.sheetsById[SHEET_ID];

		sheet.loadHeaderRow();

		// getting all rows
		const rows = await sheet.getRows();

		// getting languages from sheet.headerValues (array of keys)
		const langs = [...sheet.headerValues].filter((value) => value !== 'key');

		// init of new object with lang codes
		const result = langs.reduce((acc, curr) => ((acc[curr] = {}), acc), {});

		// filling translates in object, separated by language
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			langs?.forEach((lang) => {
				result[lang][row.key] = row[lang];
			});
		}

		console.log(result, 'result');
		console.log(langs, 'langs');
		// create folder 'locales' if doesn't exist
		if (!fs.existsSync(`./src/locales`)) fs.mkdirSync(`./src/locales`);

		// create folder for each language if doesn't exist and create file with translates inside this folder
		langs?.forEach((lang) => {
			if (!fs.existsSync(`./src/locales/${lang}`))
				fs.mkdirSync(`./src/locales/${lang}`);
			fs.writeFile(
				`./src/locales/${lang}/common.json`,
				JSON.stringify(result[lang], null, 2),
				function (err) {
					if (err) return console.log('Error: ', err);
					console.log(`/src/locales/${lang}/common.json - updated`);
				},
			);
		});
	} catch (error) {
		console.error(' ⚠️ Error lang ', error);
	}
})();
