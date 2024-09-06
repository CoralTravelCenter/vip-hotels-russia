<script setup>
import {
	YandexMap,
	YandexMapDefaultSchemeLayer,
	YandexMapDefaultFeaturesLayer,
	YandexMapControls,
	YandexMapZoomControl,
	YandexMapScaleControl,
	YandexMapMarker,
} from "vue-yandex-maps";
import { ref } from "vue";

const counter = ref(0);

const produceAnAlert = () => {
	alert(`${++counter.value} capybara`);
};

const markers = [
	{
		coordinates: [37.623, 55.752],
		iconSrc:
			"https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/yellow-capybara.png",
	},
	{
		coordinates: [38.125, 55.622],
		iconSrc:
			"https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/purple-capybara.png",
	},
	{
		coordinates: [37.295, 55.415],
		iconSrc:
			"https://yastatic.net/s3/front-maps-static/maps-front-jsapi-3/examples/images/marker-custom-icon/green-capybara.png",
	},
];
</script>

<template>
	<div class="map-wrapper">
		<yandex-map
			:settings="{
				location: {
					center: [37.617644, 55.755819],
					zoom: 9,
				},
			}"
			width="100%"
			height="500px"
		>
			<yandex-map-default-scheme-layer />
			<yandex-map-default-features-layer />

			<yandex-map-controls :settings="{ position: 'right' }">
				<yandex-map-zoom-control />
				<yandex-map-scale-control />
			</yandex-map-controls>

			<yandex-map-marker
				v-for="(marker, idx) in markers"
				:key="idx"
				position="top-center left-center"
				:settings="{ coordinates: marker.coordinates }"
			>
				<img
					alt=""
					class="pin"
					:src="marker.iconSrc"
					@click="produceAnAlert"
				/>
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
	}
}

.pin {
	cursor: pointer;
	max-width: unset;
	width: 75px;
	height: 75px;
	border-radius: 50%;
}
</style>
