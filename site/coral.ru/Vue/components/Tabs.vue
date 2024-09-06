<script setup>
import { computed } from "vue";

const props = defineProps({
	tabs: {
		type: Array,
		required: true,
	},
});

const activeTabIndex = defineModel({ default: 0 });

const getGliderWidth = computed(() => {
	return Math.round(100 / props.tabs.length);
});

function setGliderPosition() {
	if (activeTab.value === 0) {
		return `translate(8px, -50%)`;
	} else if (activeTab.value === props.tabs.length) {
		return `translate(${tabs.length}00%, -50%)`;
	} else {
		return `translate(calc(${activeTab.value}00% + 5px), -50%)`;
	}
}

function handleTabClick(idx) {
	activeTabIndex.value = idx;
}
</script>

<template>
	<div>{{ tabs }}</div>
	<!-- <div class="tabs-wrapper">
		<ul class="vue-hotel-tabs">
			<li
				v-for="(el, idx) in tabs"
				:key="idx"
				@click="handleTabClick(idx)"
			>
				<button>
					{{ el }}
				</button>
			</li>
		</ul>
		<span
			ref="tabsGlider"
			class="tabs-glider"
			:style="{
				transform: setGliderPosition(),
				width: `calc(${getGliderWidth}% - 8px)`,
			}"
			>{{ el }}</span
		>
	</div> -->
</template>

<style lang="scss" scoped>
@import "../../../common/css/coral/coral-fluid-mixins";

.tabs-wrapper {
	position: relative;
	margin-bottom: 40px;
}

ul {
	list-style: none;
	display: flex;
	padding: 8px;
	width: 100%;
	margin: 0;
	border-radius: 16px;
	overflow: hidden;
	padding: 8px !important;
	background: #fff;
}

li {
	flex: 1;
	font-family: inherit;
}

button {
	@include fontAndProperty(12px, padding-block, 12px);
	@include fontAndProperty(12px, padding-inline, 20px);

	background: #fff;
	border: none;
	color: #000;
	width: 100%;

	font-style: normal;
	font-weight: 400;
	line-height: 1.3;
	cursor: pointer;
}

.tabs-glider {
	@include fontAndProperty(12px, padding-block, 12px);
	@include fontAndProperty(12px, padding-inline, 20px);
	position: absolute;
	border-radius: 8px;
	top: 50%;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	background: rgba(0, 146, 208, 1);
	transition: transform 300ms ease;
}
</style>
