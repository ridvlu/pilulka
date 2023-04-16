<template>
	<div class="weatherBlock box">
		<div class="name">{{ weather.name }}</div>
		<img class="weather" :src="getWeatherIcon(weather.code)" alt="" />
		<div class="temp">{{ weather.temp }} °C</div>
		<div class="rain">
			<img src="/img/rain_sum.svg" alt="" />
			<span>{{ weather.rain }} <span class="small">mm</span></span>
		</div>
	</div>
</template>

<script setup lang="ts">

	interface Props {
		weather: Hour
	}

	defineProps<Props>();

	const getWeatherIcon = (code :string) => {
		return `/img/${code}.svg`
	}

</script>
