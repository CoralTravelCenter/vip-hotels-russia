import {
	ARRIVAL_LOCATIONS_API,
	HOTEL_INFO_API,
	HOTEL_PRICE_API,
	doRequestToServer,
} from './api.js'
import { addDays, formatDate } from './date.js'

const today = new Date()
const beginSearchDate = formatDate(
	addDays(today, data_onlyhotel_lookup_depth_days)
)
const searchDepthDate = formatDate(
	addDays(beginSearchDate, data_onlyhotel_lookup_nights)
)

function endpointUrl(endpoint) {
	const host =
		location.hostname === 'localhost'
			? 'http://localhost:8010/proxy'
			: '//' + location.hostname.replace(/www|new/, 'b2capi')
	return host + endpoint
}

// #1 Получаем ID отелей //
export const getArrivalLocation = vip_russia_hotels.map(hotel => {
	return doRequestToServer(endpointUrl(ARRIVAL_LOCATIONS_API), {
		text: hotel.data_onlyhotel_lookup_regions,
	})
})

// #2 Получаем координаты и изображения отелей //
export const getHotelInfo = id => {
	return doRequestToServer(endpointUrl(HOTEL_INFO_API), {
		hotelIds: [id],
		imageSizes: [1, 8],
	})
}

// #3 Получаем стоимость номера //
export const getHotelPrice = (idToString, type, name, friendlyUrl) => {
	return doRequestToServer(endpointUrl(HOTEL_PRICE_API), {
		searchCriterias: {
			reservationType: 1,
			beginDates: [beginSearchDate, searchDepthDate],
			nights: [
				{
					value: data_onlyhotel_lookup_nights,
				},
			],
			roomCriterias: [
				{
					passengers: [
						{
							passengerType: 0,
							age: 20,
						},
						{
							passengerType: 0,
							age: 20,
						},
					],
				},
			],
			arrivalLocations: [
				{
					id: idToString,
					type: type,
					name: name,
					friendlyUrl: friendlyUrl,
				},
			],
			paging: {
				pageNumber: 1,
				pageSize: 1,
				sortType: 0,
			},
		},
	})
}
