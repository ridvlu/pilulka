<template>

	<div class="locations">

		<div 
			v-for="(location, i) in locations"
			:key="i" @click="e => loadWeek(location)"
			class="location box clickable"
			:class="{ 'selected' : location.name == selectedLocation?.name }"
		>
			<img class="icon" src="/img/location.svg" alt="" />
			<div class="name">{{ location.name }}</div>
			<div class="coords">
				<div class="lat">{{ location.lat }}</div>
				<div class="lon">{{ location.lon }}</div>
			</div>
		</div>

	</div>

	<div class="info">

		<WeatherDay 
			v-for="(day, i) in days" 
			:key="i"
			:weather="day"
			:selected="selectedDate"
			@loadDay="$event => loadDay(day)"
		/>

		<WeatherHour 
			v-for="(hour, i) in hours"
			:weather="hour" 
		/>
		
	</div>

	<div v-if="Object.keys(days).length === 0" class="choose box">Vyberte lokaci pro zobrazení předpovědi</div>
	<div v-if="Object.keys(hours).length === 0 && Object.keys(days).length !== 0" class="choose day box">Vyberte den pro zobrazení kompletní předpovědi</div>
	
</template>


<script setup lang="ts">

	useHead({
		title: "Weather machine",
		meta: [
			{ 
				name: "description", 
				content: "Vypracování úkolu na předpověď deště."
			}
		],
	})

	const locations: Array<WeatherLocation> = [
		{
			name: "Praha",
			lat: 50.09,
			lon: 14.42,
		},
		{
			name: "Brno",
			lat: 49.20,
			lon: 16.61,
		},
		{
			name: "Ostrava",
			lat: 49.83,
			lon: 18.28,
		},
	]

	let selectedLocation: WeatherLocation | null = null
	let selectedDate: string = ''

	const { getWeek, getDay } = useWeather()

	const days = ref<Days>({})
	const hours = ref<Hours>({})

	const loadWeek = async (location: WeatherLocation) => {
		selectedLocation = location
		days.value = await getWeek(location.lat, location.lon)
		hours.value = {}
		selectedDate = ''
	}

	const loadDay = async (day: Day) => {
		selectedDate = day.date
		hours.value = await getDay(day.date, selectedLocation!.lat, selectedLocation!.lon)
	}
	
</script>

<style lang="scss">

	.locations {
		margin-bottom: 50px;
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;

		.location {
			width: 150px;
			min-width: 150px;
			display: flex;
			gap: 15px;
			flex-direction: column;
			align-items: center;
			

			.icon {
				width: 30px;
			}

			.coords {
				display: flex;
				font-size: 8pt;
				gap: 10px;
				color: #B8B8B8;
			}

		}
	}

	.choose {
		text-align: center;
		font-style: italic;

		&.day {
			margin-top: 1rem;
		}
	}

</style>
