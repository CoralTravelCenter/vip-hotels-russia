export const ARRIVAL_LOCATIONS_API = "/OnlyHotelProduct/ListArrivalLocations";
export const HOTEL_INFO_API = "/HotelContent/ListHotelsInfo";
export const HOTEL_PRICE_API = "/OnlyHotelProduct/PriceSearchList";

export async function doRequestToServer(url, data) {
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
