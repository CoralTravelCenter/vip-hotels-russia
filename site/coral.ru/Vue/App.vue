<script setup>
import { ref } from "vue";
// import Map from "./components/Map.vue";
// import Slider from "./components/Slider.vue";
// import Tabs from "./components/Tabs.vue";
const data = window.vip_russia_hotels;
const activeTabIndex = ref(0);

import {
	ARRIVAL_LOCATIONS_API,
	HOTEL_INFO_API,
	HOTEL_PRICE_API,
} from "../js/api/api.js";
import { formatDate, addDays } from "../js/api/date";
import { doRequestToServer, endpointUrl } from "../js/api/fetch.js";



const DEPTH = 30;
const NIGHTS = 7;
const today = new Date();
const beginSearchDate = formatDate(addDays(today, DEPTH));
const searchDepthDate = formatDate(addDays(beginSearchDate, NIGHTS));

// #1 - Получаем ID отеля //
const ARRIVAL_LOCATIONS_SENDED_DATA = {
	text: "RODINA GRAND HOTEL & SPA (РОДИНА ГРАНД ОТЕЛЬ)",
};
const getArrivalLocation = await doRequestToServer(
	endpointUrl(ARRIVAL_LOCATIONS_API),
	ARRIVAL_LOCATIONS_SENDED_DATA,
);
const { id, type, name, friendlyUrl } = getArrivalLocation.result.locations[0];
const idToString = id.split("-")[0].toString();

// #2 - Получаем кординаты отеля и картинку //
const HOTELS_SENDED_DATA = {
	hotelIds: [idToString],
	imageSizes: [8],
};
const getHotelInformation = await doRequestToServer(
	endpointUrl(HOTEL_INFO_API),
	HOTELS_SENDED_DATA,
);
const { latitude, longitude } =
	getHotelInformation.result.hotels[0].coordinates;
const hotelImg = getHotelInformation.result.hotels[0].images[0].sizes[0].url;

// #3 - Получаем информацию об стоимости //
const SEARCH_CRETERIA_DATA = {
	searchCriterias: {
		reservationType: 1,
		beginDates: [beginSearchDate, searchDepthDate],
		nights: [
			{
				value: NIGHTS,
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
};
const getHotelPrice = await doRequestToServer(
	endpointUrl(HOTEL_PRICE_API),
	SEARCH_CRETERIA_DATA,
);
const { price, stayNights } = getHotelPrice.result.products[0].offers[0];
const priceFrom = price.amount / stayNights / 2;
console.log(priceFrom)
</script>

<template>
	<!-- <Tabs v-model="activeTabIndex" :tabs="data" />
	<Slider :data="data[activeTabIndex].hotels" />
	<Map /> -->
</template>
