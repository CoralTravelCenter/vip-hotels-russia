<script setup>
import { onMounted, ref } from "vue";
import Tabs from "./components/Tabs.vue";
import Slider from "./components/Slider.vue";
import { getArrivalLocation, getHotelInfo, getHotelPrice } from "./fetch";
import { removeDuplicateObjects } from "../../common/js/utils";

const activeTabIndex = ref(0);
const tabsIsLoading = ref(true);
let tabsArray = ref(null);
const parentRegionArr = [];

function responceAction(response) {
	const { id, type, name, friendlyUrl } = response.result.locations[0];
	const idToString = id.split("-")[0].toString();

	getHotelInfo(idToString).then((response) => {
		const parentRegion = response.result.areas;
		parentRegionArr.push(parentRegion);
		tabsArray.value = removeDuplicateObjects(parentRegionArr);
		tabsIsLoading.value = false;
	});
	// getHotelPrice(idToString, type, name, friendlyUrl).then(
	// 	(response) => {
	// 		sliderData.value.push({
	// 			[PARENT_REGION_ID]: {
	// 				price: response.result.products[0].offers[0].price
	// 					.amount,
	// 				hotel_name: response.result.products[0].hotel.name,
	// 				location_name:
	// 					response.result.products[0].hotel
	// 						.locationSummary,
	// 				img: response.result.products[0].hotel.images[0]
	// 					.sizes[0].url,
	// 				rating: response.result.hotelCategories["1"]
	// 					.starCount,
	// 			},
	// 		});
	// 		isLoading.value = false;
	// 		console.log(sliderData.value);
	// 	},
	// );
}

onMounted(() => {
	//Дожидаемся получения ID и запрашиваем остальные данные //
	Promise.all(getArrivalLocation).then((responses) => {
		responses.forEach((response) => responceAction(response));
	});
});
</script>

<template>
	<div class="tabs-wrapper">
		<Skeletor v-if="tabsIsLoading" width="100%" height="3.5em" as="div" />
		<Tabs v-else v-model="activeTabIndex" :tabs="tabsArray" />
	</div>

	<!-- <div class="slider-wrapper">
		<Skeletor v-if="isLoading" width="100%" height="40em" as="div" />
		<Slider :data="sliderData[activeTabIndex" />
	</div> -->

	<!-- <Skeletor v-if="isLoading" width="100%" height="32.5em" as="div" />
	<Map /> -->
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
</style>
