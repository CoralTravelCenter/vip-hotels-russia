<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
	activeTabIndex: {
		type: Number,
		required: true,
	},
	data: {
		type: Array,
		required: true,
	},
	clickedHotel: {
		type: Number,
		required: true,
	},
})

const SWIPER_SLIDER = ref(null)

const hotelsBenefits = Object.values(
	window.vip_russia_hotels[props.activeTabIndex]
)[0]

const x_Links = {
	data_onlyhotel_lookup_depth_days: window.data_onlyhotel_lookup_depth_days,
	data_onlyhotel_lookup_nights: window.data_onlyhotel_lookup_nights,
	data_onlyhotel_lookup_destination: window.data_onlyhotel_lookup_destination,
}

function priceCalculation(price) {
	return Math.floor(price / 7 / 2)
}

onMounted(() => {
	SWIPER_SLIDER.value.on('initialize', function () {
		console.log('slider ignited')
	})
	SWIPER_SLIDER.value.initialize()
})
</script>
<template>
	<swiper-container
		ref="SWIPER_SLIDER"
		slides-per-view="1"
		direction="vertical"
		scrollbarHide="false"
		grabCursor="true"
		scrollbar="true"
		init="false,"
	>
		<swiper-slide
			v-for="slide in data"
			:style="{
				background: `url(${slide.img}) center/cover no-repeat`,
			}"
		>
			<div class="side-pannel">
				<span class="side-pannel__location">
					<div class="icon">
						<img src="/site/coral.ru/assets/location-icon.svg" />
					</div>
					{{ slide.location_name }}
				</span>
				<div class="side-pannel-content">
					<div class="side-pannel-content__rating">
						<img
							v-for="idx in slide.rating"
							:key="idx"
							src="/site/coral.ru/assets/rating-icon.svg"
						/>
					</div>
					<h3>{{ slide.hotel_name }}</h3>
					<ul class="side-pannel-content__benefits">
						<li v-for="benefit in hotelsBenefits[activeTabIndex].benefits">
							{{ benefit }}
						</li>
					</ul>
					<div data-price>
						<span class="price">от {{ priceCalculation(slide.price) }} ₽</span
						><br />
						<span class="attention"
							>* Цена указана из расчета прибывания не менее 7 ночей, за одного
							туриста</span
						>
					</div>
					<div class="actions">
						<a
							href="#"
							:data-onlyhotel-lookup-regions="slide.hotel_name"
							:data_onlyhotel_lookup_depth_days="
								x_Links.data_onlyhotel_lookup_depth_days
							"
							:data_onlyhotel_lookup_nights="
								x_Links.data_onlyhotel_lookup_nights
							"
							:data_onlyhotel_lookup_destination="
								x_Links.data_onlyhotel_lookup_destination
							"
							>Забронировать онлайн</a
						>
						<!-- <a href="#" class="outline">Подробнее об отеле</a> -->
					</div>
				</div>
			</div>
		</swiper-slide>
	</swiper-container>
</template>

<style lang="scss">
@import '../../../common/css/coral/coral-fluid-mixins';

:root {
	--swiper-scrollbar-right: 40%;
	--swiper-scrollbar-sides-offset: 0px;
	--swiper-scrollbar-bg-color: rgba(255, 255, 255, 0.29);
	--swiper-scrollbar-drag-bg-color: #0092d0;
}

swiper-container {
	@include property(height, 630px);
	border-radius: 1em;
}

swiper-slide {
	border-radius: 1em;
	display: flex;
	justify-content: end;
}

.side-pannel {
	@include property(padding, 30px);
	width: 40%;
	color: #fff;
	display: grid;
	grid-template-rows: max-content auto;
	background: linear-gradient(
		180deg,
		rgba(31, 31, 31, 0.44) 0.03%,
		rgba(0, 0, 0, 0.4) 105.62%
	);
	backdrop-filter: blur(15px);
	border-top-right-radius: 1em;
	border-bottom-right-radius: 1em;

	&__location {
		@include font(20px);
		display: inline-flex;
		align-items: center;
		margin-left: auto;
		gap: 8px;

		.icon {
			width: 1em;
			height: 1em;

			> img {
				object-fit: contain;
			}
		}
	}

	.side-pannel-content {
		display: flex;
		flex-direction: column;
		align-self: center;
		@include property(padding, 26px);

		&__rating {
			width: 1em;
			height: 1em;
			display: flex;
			gap: 4px;
			@include property(margin-bottom, 13px);
		}

		h3 {
			@include fontAndProperty(32px, margin-bottom, 24px);
		}

		&__benefits {
			@include fontAndProperty(16px, margin-bottom, 32px);
			@include fontAndProperty(16px, padding-left, 24px);
			margin-top: 0;
			line-height: 1.5;
		}

		[data-price] {
			@include property(margin-bottom, 48px);

			.price {
				@include font(32px);
			}

			.attention {
				font-size: 8px;
				line-height: 1;
			}
		}

		.actions {
			display: flex;
			flex-direction: column;
			@include property(gap, 24px);
			margin-top: auto;

			a.outline {
				border-color: #fff;
				color: #fff;
			}
		}
	}
}
</style>
