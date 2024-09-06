export function endpointUrl(endpoint) {
	const host = location.hostname === 'localhost' ? 'http://localhost:8010/proxy' : '//' + location.hostname.replace(/www|new/, 'b2capi');
	return host + endpoint;
}

export async function doRequestToServer(url, data) {
	console.log(url)
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(data),
		});

		return response.json();
	} catch (err) {
		throw new Error(err);
	}
}
