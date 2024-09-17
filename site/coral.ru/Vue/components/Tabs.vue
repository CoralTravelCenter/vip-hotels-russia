<script setup>
const props = defineProps({
	tabs: {
		type: Array,
		required: true,
	},
});

const activeTabIndex = defineModel({ default: 0 });

function handleTabClick(idx) {
	activeTabIndex.value = idx;
}
</script>

<template>
	<div class="tabs-wrapper">
		<ul class="vue-hotel-tabs">
			<li
				v-for="(el, idx) in props.tabs"
				:key="idx"
				:class="{ js_active: idx === activeTabIndex }"
				@click="handleTabClick(idx)"
			>
				<button>
					{{ el }}
				</button>
			</li>
		</ul>
	</div>
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

	@media (max-width: 768px) {
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		-ms-overflow-style: none;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}
}

li {
	font-family: inherit;
	flex-grow: 1;
	@media (max-width: 768px) {
		flex-shrink: 0;
		scroll-snap-align: start;
	}
}

li.js_active {
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		background: rgba(0, 146, 208, 1);
		transition: all 300ms ease;
	}
}

button {
	@include fontAndProperty(12px, padding-block, 12px);
	@include fontAndProperty(12px, padding-inline, 20px);

	background: #fff;
	border: none;
	color: #000;
	width: 100%;
	border-radius: 8px;
	font-style: normal;
	font-weight: 400;
	line-height: 1.3;
	cursor: pointer;
}
</style>
