<script setup>
import { computed } from 'vue'
import {
	YandexMap,
	YandexMapControls,
	YandexMapDefaultFeaturesLayer,
	YandexMapDefaultSchemeLayer,
	YandexMapMarker,
	YandexMapZoomControl,
} from 'vue-yandex-maps'

const regionsCoordinates = window.regionsCoordinates

const props = defineProps({
	activeTabIndex: {
		type: Number,
		required: true,
	},
	coordinates: {
		type: Array,
		required: true,
	},
})

const clickedOnMapHotel = defineModel({ default: 0 })

const setCenter = computed(() => {
	const [lat, long] = regionsCoordinates[props.activeTabIndex].split(',')
	return [long, lat]
})

function onMarkerClick(idx) {
	clickedOnMapHotel.value = idx
}
</script>

<template>
	<div class="map-wrapper">
		<yandex-map
			height="32.5em"
			:settings="{
				location: {
					center: setCenter,
					zoom: 7,
				},
				showScaleInCopyrights: true,
				theme,
			}"
			width="100%"
		>
			<yandex-map-default-scheme-layer />
			<yandex-map-default-features-layer />

			<yandex-map-controls :settings="{ position: 'right' }">
				<yandex-map-zoom-control />
			</yandex-map-controls>

			<yandex-map-marker
				v-for="(marker, idx) in coordinates"
				:key="idx"
				position="top-center left-center"
				:settings="{
					coordinates: [marker.long, marker.lat],
					title: 'Marker with slot',
					subtitle: 'Marker with slot description',
				}"
			>
				<div class="pin" @click="onMarkerClick(idx)" />
			</yandex-map-marker>
		</yandex-map>
	</div>
</template>

<style lang="scss" scoped>
.map-wrapper {
	aspect-ratio: 171/65;
	margin-top: 24px;

	.__ymap {
		border-radius: 20px;
		overflow: hidden;

		.pin {
			cursor: pointer;
			max-width: unset;
			width: 50px;
			height: 50px;
			border: 8px solid #0092d0;
			border-radius: 100%;

			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			background-image: url("data:image/svg+xml,%3Csvg width='472' height='472' viewBox='0 0 472 472' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%230077b1' d='M68.83 402.343C112.203 445.714 171.345 472 235.745 472s124.857-26.286 166.914-69.657z'/%3E%3Cpath fill='%2378abdc' d='M8.374 298.515c10.514 39.428 31.542 74.914 60.457 103.828h335.14c27.6-28.914 48.63-64.4 60.458-103.828z'/%3E%3Cpath fill='%23e84e0f' d='M.488 235.43c0 21.028 2.629 42.057 7.886 61.77h454.74c5.257-19.713 7.886-40.742 7.886-61.77 0-11.829-1.314-22.343-2.629-34.172H3.117C1.802 213.087.488 224.915.488 235.43'/%3E%3Cpath fill='%23fab60d' d='M28.088 123.716c-13.143 23.657-21.029 49.943-26.286 77.542h466.57c-3.943-27.6-13.143-53.885-26.286-77.542z'/%3E%3Cpath fill='%23ee762d' d='M396.086 61.945C354.03 23.83 298.83.174 237.058.174S118.773 23.83 76.716 61.944z'/%3E%3Cpath fill='%23fdce86' d='M28.088 123.716H443.4c-13.143-23.657-28.914-44.686-48.628-61.771H76.716c-19.714 18.4-35.485 39.428-48.628 61.771'/%3E%3C/svg%3E");
		}
	}
}
</style>
