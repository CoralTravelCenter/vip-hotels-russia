<script setup>
const props = defineProps({
	data: Array,
});
</script>
<template>
	<swiper-container
		slides-per-view="1"
		direction="vertical"
		scrollbar-hide="false"
		grabCursor="true"
	>
		<swiper-slide
			v-for="slide in data"
			:style="{
				background: `url(${slide.img_url}) center/cover no-repeat`,
			}"
		>
			<div class="side-pannel">
				<span class="side-pannel__location">
					<div class="icon">
						<img src="/site/coral.ru/assets/location-icon.svg"/>
					</div>
					{{ slide.location }}
				</span>
				<div class="side-pannel-content">
					<div class="side-pannel-content__rating">
						<img
							v-for="idx in slide.stars"
							:key="idx"
							src="/site/coral.ru/assets/rating-icon.svg"
						/>
					</div>
					<h3>{{ slide.name }}</h3>
					<ul class="side-pannel-content__benefits">
						<li v-for="benefit in slide.benefits">
							{{ benefit }}
						</li>
					</ul>
					<span data-price>от XXX XXX ₽</span>
					<div class="actions">
						<a href="#">Забронировать онлайн</a>
						<a href="#" class="outline">Подробнее об отеле</a>
					</div>
				</div>
			</div>
		</swiper-slide>
	</swiper-container>
</template>

<style lang="scss">
@import "../../../common/css/coral/coral-fluid-mixins";

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
	display: flex;
	flex-direction: column;
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
			@include fontAndProperty(32px, margin-bottom, 48px);
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
