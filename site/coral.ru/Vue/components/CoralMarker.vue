<script setup>
import { truncateString } from "../../../common/js/utils";
const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

function priceCalculation(price) {
	return Math.floor(price / 7 / 2);
}
</script>

<template>
	<div class="coral-marker">
		<div class="placemark"></div>
		<div class="name">
			<span>{{ truncateString(props.data.hotel_name) }}</span
			><br />
			<span>
				от {{ priceCalculation(props.data.price) }}&nbsp;₽ / ночь
			</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.coral-marker {
	display: flex;
	align-items: center;
	cursor: pointer;

	.placemark {
		width: 2em;
		height: 2em;
		background: url("data:image/svg+xml,%3Csvg width='472' height='472' viewBox='0 0 472 472' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%230077b1' d='M68.83 402.343C112.203 445.714 171.345 472 235.745 472s124.857-26.286 166.914-69.657z'/%3E%3Cpath fill='%2378abdc' d='M8.374 298.515c10.514 39.428 31.542 74.914 60.457 103.828h335.14c27.6-28.914 48.63-64.4 60.458-103.828z'/%3E%3Cpath fill='%23e84e0f' d='M.488 235.43c0 21.028 2.629 42.057 7.886 61.77h454.74c5.257-19.713 7.886-40.742 7.886-61.77 0-11.829-1.314-22.343-2.629-34.172H3.117C1.802 213.087.488 224.915.488 235.43'/%3E%3Cpath fill='%23fab60d' d='M28.088 123.716c-13.143 23.657-21.029 49.943-26.286 77.542h466.57c-3.943-27.6-13.143-53.885-26.286-77.542z'/%3E%3Cpath fill='%23ee762d' d='M396.086 61.945C354.03 23.83 298.83.174 237.058.174S118.773 23.83 76.716 61.944z'/%3E%3Cpath fill='%23fdce86' d='M28.088 123.716H443.4c-13.143-23.657-28.914-44.686-48.628-61.771H76.716c-19.714 18.4-35.485 39.428-48.628 61.771'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		border-radius: 100%;
		border: 3px solid #0092d0;
		flex-shrink: 0;
	}

	.name {
		background: #fff;
		border-radius: 8px;
		padding: 4px 8px;
		font-size: 12px;
		flex-shrink: 0;
	}
}
</style>
