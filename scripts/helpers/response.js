let getJson = res => {
	if (!res.ok) {
		throw {
			status: res.status,
			statusText: res.statusText
		}
	}

	return res.json();
}

export default { getJson };