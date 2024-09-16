<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import Map from './components/Map.vue'
import Slider from './components/Slider.vue'
import Tabs from './components/Tabs.vue'
import { getArrivalLocation, getHotelInfo, getHotelPrice } from './fetch.js'

const activeTabIndex = ref(0)
const clickedOnMapHotel = ref(0)
const regionsTabs = computed(() => {
	return window.vip_russia_hotels.map(tab => Object.keys(tab)[0])
})

const sliderData = ref([])
const currentMapCoordinates = ref([])
const isLoading = ref({ slider: true, map: true })

function fetchHotelData(response) {
	const { id, type, name, friendlyUrl } = response.result.locations[0]
	const idToString = id.split('-')[0].toString()

	Promise.all([
		getHotelInfo(idToString),
		getHotelPrice(idToString, type, name, friendlyUrl),
	]).then(([infoResponse, priceResponse]) => {
		const hotelInfo = infoResponse.result.hotels[0]
		const hotelPrice = priceResponse.result.products[0]

		currentMapCoordinates.value.push({
			lat: hotelInfo.coordinates.latitude,
			long: hotelInfo.coordinates.longitude,
			marker_img: hotelInfo.images[0].sizes[0].url,
		})

		sliderData.value.push({
			price: hotelPrice.offers[0].price.amount,
			hotel_name: hotelPrice.hotel.name,
			location_name: hotelPrice.hotel.locationSummary
				.split(',')
				.splice(1, 2)
				.join(','),
			img: hotelPrice.hotel.images[0].sizes[0].url,
			rating: priceResponse.result.hotelCategories['1'].starCount,
		})

		isLoading.value = { ...isLoading.value, slider: false, map: false }
	})
}

async function fetchServerData() {
	sliderData.value = []
	currentMapCoordinates.value = []
	sliderData.value.length === 0
		? (isLoading.value = { ...isLoading.value, slider: true })
		: (isLoading.value = { ...isLoading.value, slider: false })
	const responses = await Promise.all(getArrivalLocation(activeTabIndex.value))
	responses.forEach(response => fetchHotelData(response))
}

onMounted(fetchServerData)
watch(activeTabIndex, fetchServerData)
</script>

<template>
	<div class="tabs-wrapper">
		<Tabs v-model="activeTabIndex" :tabs="regionsTabs" />
	</div>

	<div class="slider-wrapper">
		<Skeletor v-if="isLoading.slider" width="100%" height="40em" as="div" />
		<Slider
			v-else
			:activeTabIndex="activeTabIndex"
			:data="sliderData"
			:clickedHotel="clickedOnMapHotel"
		/>
	</div>

	<Skeletor v-if="isLoading.map" width="100%" height="32.5em" as="div" />
	<Map
		v-else
		:activeTabIndex="activeTabIndex"
		:coordinates="currentMapCoordinates"
		v-model="clickedOnMapHotel"
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
</style>
