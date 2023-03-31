/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
export function EmptyFunction() {}

export function downloadFile(data: BlobPart, type: string, filename: string) {
	const file = new Blob([data], { type });
	const a = document.createElement('a');
	const url = URL.createObjectURL(file);
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 0);
}

export function parseCSV(content: string, delimeter: string) {
	content.replaceAll('\r\n', '\n');
	const allDataArray = content
		.split('\n')
		.map((line) => line.split(delimeter));
	const metaDataArray = allDataArray.slice(0, 2);
	const contentArray = allDataArray.slice(2);

	const dataObject: Array<{ [k: string]: any }> = [];
	for (const row of contentArray) {
		const newRow: { [k: string]: any } = {};
		for (const i in row) {
			const value = row[i];
			switch (metaDataArray[1][i]) {
				case 'int':
					newRow[metaDataArray[0][i]] = parseInt(value, 10);
					break;
				case 'float':
					newRow[metaDataArray[0][i]] = parseFloat(value);
					break;
				case 'date':
					newRow[metaDataArray[0][i]] = new Date(value);
					break;
				default:
					newRow[metaDataArray[0][i]] = value;
					break;
			}
		}
		dataObject.push(newRow);
	}

	return dataObject;
}
