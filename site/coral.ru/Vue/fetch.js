import {
	ARRIVAL_LOCATIONS_API,
	HOTEL_PRICE_API,
	doRequestToServer,
} from './api.js'
import {addDays, formatDate} from './date.js'

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
export const getArrivalLocation = activeRegion => {
	const hotels = Object.values(window.vip_russia_hotels[activeRegion])[0]
	return hotels.map(hotel => {
		return doRequestToServer(endpointUrl(ARRIVAL_LOCATIONS_API), {
			text: hotel.hotel_name,
		})
	})
}

// #2 Получаем стоимость номера //
export const getHotelPrice = arrivalLocationsArr => {
	return doRequestToServer(endpointUrl(HOTEL_PRICE_API), {
		searchCriterias: {
			reservationType: 1,
			beginDates: [beginSearchDate, searchDepthDate],
			nights: [
				{
					value: data_onlyhotel_lookup_nights,
				},
			],
			imageSizes: [8],
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
			arrivalLocations: arrivalLocationsArr,
			paging: {
				pageNumber: 1,
				pageSize: arrivalLocationsArr.length,
				sortType: 0,
			},
		},
	})
}
