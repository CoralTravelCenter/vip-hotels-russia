<script setup>
import {onMounted, provide, reactive, ref, watch} from 'vue'
import Map from './components/Map.vue'
import Slider from './components/Slider.vue'
import Tabs from './components/Tabs.vue'
import {getArrivalLocation, getHotelPrice} from './fetch.js'

const activeTabIndex = ref(0)
const clickedHotel = reactive(0)
provide('clickedHotel', clickedHotel)
provide('activeTabIndex', activeTabIndex)

const regionsTabs = window.vip_russia_hotels.map(tab => Object.keys(tab)[0])
const fetchedData = ref([])
const isLoading = ref({slider: true, map: true})

async function fetchServerData() {
	fetchedData.value.splice(0, fetchedData.value.length);
	fetchedData.value.length === 0 && (isLoading.value = {...isLoading.value, slider: true, map: true})


	const locationResponses = await Promise.all(
		getArrivalLocation(activeTabIndex.value)
	)
	const locationsData = locationResponses.map(response => {
		if (response.result.locations.length > 0) {
			const {id, type, name, friendlyUrl} = response.result.locations[0]
			const idToString = id.split('-')[0].toString()
			return {
				id: idToString,
				type: type,
				name: name,
				friendlyUrl: friendlyUrl,
			}
		}
	})
	const hotelPriceResponses = await getHotelPrice(locationsData)
	hotelPriceResponses.result.products.forEach(response => {
		const {hotel, offers} = response;
		fetchedData.value.push({
			price: offers[0].price.amount,
			hotel_name: hotel.name,
			location_name: hotel.locationSummary
				.split(',')
				.splice(1, 2)
				.join(','),
			img: hotel.images[0].sizes[0].url,
			marker_img: hotel.images[0].sizes[0].url,
			rating: Array.from({length: 5}),
			lat: hotel.coordinates.latitude,
			long: hotel.coordinates.longitude,
		})
		isLoading.value = {
			...isLoading.value,
			slider: false,
			map: false,
		}
	})
}


onMounted(() => {
	fetchServerData()
})
watch(activeTabIndex, fetchServerData)
</script>

<template>
	<div class="tabs-wrapper">
		<Tabs v-model="activeTabIndex" :tabs="regionsTabs"/>
	</div>

	<div class="slider-wrapper">
		<Skeletor v-if="isLoading.slider" width="100%" height="40em" as="div"/>
		<Slider
			v-else
			:activeTabIndex="activeTabIndex"
			:data="fetchedData"
			:clickedHotel="clickedHotel"
		/>
	</div>

	<Skeletor v-if="isLoading.map" width="100%" height="32.5em" as="div"/>
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
</style>
