<template>
	<div 
		class="weatherBlock box clickable" 
		@click="$event => $emit('loadDay')"
		:class="{ 'selected' : weather.date == selected }"
	>
		<div class="name">{{ weather.name }}</div>
		<img class="weather" :src="getWeatherIcon(weather.code)" alt="" />
		<div class="temp">
			<div class="max">{{ weather.max }} °C</div>
			<div class="min">{{ weather.min }} °C</div>
		</div>
		<div class="rain">
			<img src="/img/rain_sum.svg" alt="" />
			<span>{{ weather.rain }} <span class="small">mm</span></span>
		</div>
	</div>
</template>

<script setup lang="ts">

	interface Props {
		weather: Day,
		selected: string
	}

	defineProps<Props>();

	const getWeatherIcon = (code: string): string => {
		return `/img/${code}.svg`
	}

</script>
