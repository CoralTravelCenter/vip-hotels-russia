export function getItem(key) {
	try {
		return window.sessionStorage.getItem(key)
	} catch (e) {
		console.log(e)
	}
}

export function setItem(key, value) {
	try {
		return window.sessionStorage.setItem(key, value)
	} catch (e) {
		console.log(e)
	}
}

export function setJSON(key, value) {
	try {
		const json = JSON.stringify(value)

		setItem(key, json)
	} catch (e) {
		console.error(e)
	}
}

export function getJSON(key) {
	try {
		const json = getItem(key)

		return JSON.parse(json)
	} catch (e) {
		console.error(e)
	}
}