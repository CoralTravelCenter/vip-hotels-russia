<script setup>
// import { onMounted, provide, ref, watch } from "vue";
// import Map from "./components/Map.vue";
// import Slider from "./components/Slider.vue";
// import Tabs from "./components/Tabs.vue";
// import { getArrivalLocation, getHotelPrice } from "./fetch.js";
// import { setJSON, getJSON } from "../../common/js/utils";

// const activeTabIndex = ref(0);
// const clickedHotel = ref(0);
// provide("clickedHotel", clickedHotel);
// provide("activeTabIndex", activeTabIndex);

// const regionsTabs = window.vip_russia_hotels.map((tab) => Object.keys(tab)[0]);
// const fetchedData = ref([]);
// const isLoading = ref({ slider: true, map: true });
// let cachedHotelsId = getJSON("VIP_HOTELS_ID");
// let cachedHotelsData = getJSON("VIP_HOTELS_DATA");

// async function fetchHotelData(response) {
// 	const { id, type, name, friendlyUrl } = response[0];
// 	const idToString = id.split("-")[0].toString();
// 	const priceResponses = await Promise.all([
// 		getHotelPrice(idToString, type, name, friendlyUrl),
// 	]);
// 	setJSON("VIP_HOTELS_DATA", priceResponses);

// 	if (cachedHotelsData) {
// 		if (priceResponses.length > 0) {
// 			cachedHotelsData.forEach((response) => {
// 				if (response.result.products) {
// 					const { hotel, offers } = response.result.products[0];
// 					fetchedData.value.push({
// 						price: offers[0].price.amount,
// 						hotel_name: hotel.name,
// 						location_name: hotel.locationSummary
// 							.split(",")
// 							.splice(1, 2)
// 							.join(","),
// 						img: hotel.images[0].sizes[0].url,
// 						marker_img: hotel.images[0].sizes[0].url,
// 						rating: [1, 2, 3, 4, 5],
// 						lat: hotel.coordinates.latitude,
// 						long: hotel.coordinates.longitude,
// 					});
// 					isLoading.value = {
// 						...isLoading.value,
// 						slider: false,
// 						map: false,
// 					};
// 				}
// 			});
// 		}
// 	} else {
// 		if (priceResponses.length > 0) {
// 			priceResponses.forEach((response) => {
// 				if (response.result.products) {
// 					const { hotel, offers } = response.result.products[0];
// 					fetchedData.value.push({
// 						price: offers[0].price.amount,
// 						hotel_name: hotel.name,
// 						location_name: hotel.locationSummary
// 							.split(",")
// 							.splice(1, 2)
// 							.join(","),
// 						img: hotel.images[0].sizes[0].url,
// 						marker_img: hotel.images[0].sizes[0].url,
// 						rating: [1, 2, 3, 4, 5],
// 						lat: hotel.coordinates.latitude,
// 						long: hotel.coordinates.longitude,
// 					});
// 					isLoading.value = {
// 						...isLoading.value,
// 						slider: false,
// 						map: false,
// 					};
// 				}
// 			});
// 		}
// 	}
// }

// async function fetchServerData() {
// 	fetchedData.value = [];
// 	fetchedData.value.length === 0
// 		? (isLoading.value = {
// 				...isLoading.value,
// 				slider: true,
// 				map: true,
// 			})
// 		: (isLoading.value = {
// 				...isLoading.value,
// 				slider: false,
// 				map: false,
// 			});

// 	const responses = await Promise.all(
// 		getArrivalLocation(activeTabIndex.value),
// 	);
// 	setJSON("VIP_HOTELS_ID", responses);

// 	if (cachedHotelsId) {
// 		cachedHotelsId.forEach((response) => {
// 			if (response.result.locations.length > 0) {
// 				fetchHotelData(response.result.locations);
// 			}
// 		});
// 	} else {
// 		responses.forEach((response) => {
// 			if (response.result.locations.length > 0) {
// 				fetchHotelData(response.result.locations);
// 			}
// 		});
// 	}
// }

// onMounted(() => {
// 	fetchServerData();
// });
// watch(activeTabIndex, fetchServerData);

import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getArrivalLocation, getHotelPrice } from "./fetch.js";

const data = ref(null);
const activeIndex = ref(0);

// Используем useQuery для получения списка id
const {
	isLoading,
	isError,
	error,
	data: ids,
} = useQuery({
	queryKey: ["ids"], // Ключ для кэширования
	queryFn: () =>
		getArrivalLocation(activeIndex.value).then((res) => res.json()),
});

// Обновляем data,  когда данные получены
watch(ids, () => {
	data.value = ids.value;
});
console.log(data.value);
</script>

<!-- <template>
	<div class="tabs-wrapper">
		<Tabs v-model="activeTabIndex" :tabs="regionsTabs" />
	</div>

	<div class="slider-wrapper">
		<Skeletor v-if="isLoading.slider" width="100%" height="40em" as="div" />
		<Slider
			v-else
			:activeTabIndex="activeTabIndex"
			:data="fetchedData"
			:clickedHotel="clickedHotel"
		/>
	</div>

	<Skeletor v-if="isLoading.map" width="100%" height="32.5em" as="div" />
	<Map
		v-else
		:activeTabIndex="activeTabIndex"
		:data="fetchedData"
		v-model="clickedHotel"
	/>
</template>

<style lang="scss" scoped>
.vue-skeletor {
	border-radius: 1em;
}

.tabs-wrapper {
	margin-bottom: 40px;
}

.slider-wrapper {
	margin-bottom: 24px;
}
</style> -->
