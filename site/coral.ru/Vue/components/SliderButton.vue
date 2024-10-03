<script setup>
const props = defineProps({
	next: {
		type: Boolean,
		required: true,
	},
	prev: {
		type: Boolean,
		required: true,
	},
})
</script>

<template>
	<button :style="next ? 'right: 16px' : 'left: 16px'">
		<slot />
	</button>
</template>

<style scoped>
button {
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
	border-radius: 100%;
	width: 40px;
	height: 40px;
	position: absolute;
	top: 50%;
	z-index: 4;
	border: 1px solid #fff;
	transform: translateY(-50%);
	transition: all 500ms ease;
}
</style>
