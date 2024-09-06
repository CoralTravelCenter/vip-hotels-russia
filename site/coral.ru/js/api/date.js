export function formatDate(date) {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function addDays(date, days) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + days);
	return newDate;
}
