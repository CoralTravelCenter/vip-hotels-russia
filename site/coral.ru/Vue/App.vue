<script setup>
import { onMounted, reactive, ref } from 'vue'
import { removeDuplicates } from '../../common/js/utils'
import Tabs from './components/Tabs.vue'
import { getArrivalLocation, getHotelInfo, getHotelPrice } from './fetch'
const tabsArray = reactive([])
const activeTabIndex = ref(0)
const isLoading = ref(false)

onMounted(() => {
	//Дожидаемся получения ID и запрашиваем остальные данные //
	Promise.all(getArrivalLocation).then(responses => {
		responses.forEach(response => {
			const { id, type, name, friendlyUrl } = response.result.locations[0]
			const idToString = id.split('-')[0].toString()
			getHotelInfo(idToString).then(response => {
				const parentRegion = Object.values(response.result.areas)[0].name

				console.log(parentRegion)
				const parentRegionWithoutDuplicates = removeDuplicates(parentRegion)
				tabsArray.push(parentRegionWithoutDuplicates)
			})
			getHotelPrice(idToString, type, name, friendlyUrl).then(response => {
				isLoading.value = false
			})
		})
	})
})
</script>

<template>
	<div class="tabs-wrapper">
		<Skeletor v-if="isLoading" width="100%" height="40px" as="div" />
		<Tabs v-else v-model="activeTabIndex" :tabs="tabsArray" />
	</div>

	<!-- <div class="slider-wrapper">
		<Skeletor v-if="isLoading" width="100%" height="40em" as="div" />
		<Slider :data="tabsData[activeTabIndex].hotels" />
	</div>

	<Skeletor v-if="isLoading" width="100%" height="32.5em" as="div" />
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
