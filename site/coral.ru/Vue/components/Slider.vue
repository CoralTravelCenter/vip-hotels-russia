<script setup>
import { inject, onMounted, ref, watch } from 'vue'

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
})

const SWIPER_SLIDER = ref(null)
const clickedHotel = inject('clickedHotel')
const activeTabIndex = inject('activeTabIndex')
const x_Links = {
	data_onlyhotel_lookup_depth_days: window.data_onlyhotel_lookup_depth_days,
	data_onlyhotel_lookup_nights: window.data_onlyhotel_lookup_nights,
	data_onlyhotel_lookup_destination: window.data_onlyhotel_lookup_destination,
}

const swiperParams = {
	init: false,
	slidesPerView: 1,
	grabCursor: true,
	scrollbar: true,
	pagination: true,
	breakpoints: {
		768: {
			direction: 'vertical',
			pagination: false,
		},
	},
}

function priceCalculation(price) {
	return Math.floor(price / 7 / 2)
}

function getHotelBenefits(hotelName) {
	const benefitsArr = Object.values(
		window.vip_russia_hotels[activeTabIndex.value]
	)[0]
	return benefitsArr.find(item => item.hotel_name === hotelName).benefits
}

watch(clickedHotel)
onMounted(() => {
	Object.assign(SWIPER_SLIDER.value, swiperParams)
	SWIPER_SLIDER.value.initialize()
})
</script>
<template>
	<swiper-container ref="SWIPER_SLIDER">
		<swiper-slide
			v-for="(slide, slideIdx) in data"
			:key="slideIdx"
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
						<li
							v-for="(benefit, idx) in getHotelBenefits(slide.hotel_name)"
							:key="idx"
						>
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

	@media (max-width: 768px) {
		@include property(height, 800px);
	}
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

	@media (max-width: 768px) {
		border-top-right-radius: 1em;
		border-top-left-radius: 1em;
		border-bottom-right-radius: 0;
		padding: 1em;
		height: 31em;
	}

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

		@media (max-width: 768px) {
			@include font(16px);
			margin-left: 0;
			margin-right: auto;
		}
	}

	.side-pannel-content {
		display: flex;
		flex-direction: column;
		align-self: center;
		@include property(padding, 26px);

		@media (max-width: 768px) {
			padding: 0;
		}

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

	@media (max-width: 768px) {
		width: 100%;
	}

	.swiper-pagination-bullet-active {
		background: #0092d0;
	}
}
</style>
