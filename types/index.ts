export { };

declare global {

	type WeatherLocation = {
		name: string,
		lat: number,
		lon: number,
	}

	type Day = {
		name: string,
		date: string,
		min: number,
		max: number,
		rain: number,
		code: string,
	}

	type Days = {
		[key: string]: Day
	}

	/* type ApiDataDaily = {
		daily: {
			rain_sum: number[],
			temperature_2m_min: number[],
			temperature_2m_max: number[],
			time: string[],
			weathercode: number[]
		}
	} */

	type Hour = {
		name: string,
		temp: number,
		code: string,
		rain?: number,
	}

	type Hours = {
		[key: number]: Hour
	}

	/* type ApiDataHourly = {
		hourly: {
			rain: number[],
			temperature_2m: number[],
			time: string[],
			weathercode: number[]
		}
	} */

	type Icons = {
		[key: number]: string
	}


}