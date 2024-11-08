<script setup>
import {inject, ref, watch} from "vue";
import {
	YandexMap,
	YandexMapClusterer,
	YandexMapControls,
	YandexMapDefaultFeaturesLayer,
	YandexMapDefaultSchemeLayer,
	YandexMapMarker,
	YandexMapZoomControl,
} from "vue-yandex-maps";
import CoralMarker from "./CoralMarker.vue";

const regionsCoordinates = window.regionsCoordinates;
const activeTabIndex = inject('activeTabIndex')

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
});

const clickedOnMapHotel = defineModel({default: 0});
const clusterer = ref(null);
const clustererGridSize = ref(90);

const setCenter = () => {
	const [lat, long] = regionsCoordinates[activeTabIndex.value].split(",");
	return [long, lat];
}

const setMapSettings = ref({
	location: {
		center: setCenter(),
		zoom: 7,
	},
	showScaleInCopyrights: true,
});

function onMarkerClick(idx) {
	setMapSettings.value.location.center = [
		props.data[idx].long,
		props.data[idx].lat,
	];
	setMapSettings.value.location.zoom = 17;
	clickedOnMapHotel.value = idx;
}

watch(activeTabIndex.value, setCenter)
</script>

<template>
	<div class="map-wrapper">
		<yandex-map height="32.5em" :settings="setMapSettings" width="100%">
			<yandex-map-default-scheme-layer/>
			<yandex-map-default-features-layer/>

			<yandex-map-controls :settings="{ position: 'right' }">
				<yandex-map-zoom-control/>
			</yandex-map-controls>

			<yandex-map-clusterer
				v-model="clusterer"
				:grid-size="clustererGridSize"
				zoom-on-cluster-click
			>
				<template #cluster="{ length, clusterer }">
					<div class="cluster">
						<div class="hud">{{ length }}</div>
					</div>
				</template>
				<yandex-map-marker
					v-for="(marker, idx) in data"
					:key="idx"
					position="top-center left-center"
					:settings="{
						coordinates: [marker.long, marker.lat],
					}"
				>
					<CoralMarker
						@click="onMarkerClick(idx)"
						:data="data[idx]"
					/>
				</yandex-map-marker>
			</yandex-map-clusterer>
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

		.cluster {
			width: 3em;
			height: 3em;
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(0, 0, 0, 0.15);
			cursor: pointer;

			.hud {
				width: 2em;
				height: 2em;
				background: #fff;
				font-weight: 600;
				font-size: 1.1em;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 100%;
			}
		}
	}
}
</style>
