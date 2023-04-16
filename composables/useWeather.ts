import dayjs from "dayjs"

export const useWeather = () => {

	const getWeek = async (lat :number, lon :number): Promise<Days> => {
		return $fetch("/v1/forecast", {
			method: "GET",
			baseURL: "https://api.open-meteo.com",
			params: {
				latitude: lat,
				longitude: lon,
				daily: "temperature_2m_max,temperature_2m_min,rain_sum,weathercode",
				start_date: dayjs().format('YYYY-MM-DD'),
				end_date: dayjs().add(7, 'day').format('YYYY-MM-DD'),
				timezone: "Europe/Berlin"
			   },
		}).then((data: any) => {

			let returnData: Days = {}

			data.daily.time.forEach((day: string, index :number) => {

				const days = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"]
				
				let name :string = days[parseInt(dayjs(day).format("d"))]

				if (index == 0) name = 'dnes'
				else if (index == 1) name = 'zítra'

				returnData[day] = {
					name: name,
					date: day,
					min: Math.round(data.daily.temperature_2m_min[index]),
					max: Math.round(data.daily.temperature_2m_max[index]),
					rain: Math.round(data.daily.rain_sum[index] * 10) / 10,
					code: weatherIcons[data.daily.weathercode[index]],
				}
			})

			return returnData
		}).catch(err => {
			console.log(err)
			return {}
		})
	}

	const getDay = async (day :string, lat :number, lon :number): Promise<Hours> => {
		return $fetch("/v1/forecast", {
			method: "GET",
			baseURL: "https://api.open-meteo.com",
			params: {
				latitude: lat,
				longitude: lon,
				hourly: "temperature_2m,rain,weathercode",
				start_date: day,
				end_date: day,
				timezone: "Europe/Berlin"
			   },
		}).then((data: any) => {

			let returnData: Hours = {}

			let rain_sum = 0

			data.hourly.time.forEach((date: string, index: number) => {

				const hour = dayjs(date).hour()

				rain_sum += data.hourly.rain[index]

				if (hour % 3 == 0) {
					return
				} else if (hour % 3 == 2) {
					returnData[hour-1].rain = Math.round(rain_sum * 10) / 10
					rain_sum = 0
					return
				}
				
				const name: string = hour + ':00'

				returnData[hour] = {
					name: name,
					temp: Math.round(data.hourly.temperature_2m[index]),
					code: weatherIcons[data.hourly.weathercode[index]],
				}
			});

			return returnData
		}).catch(err => {
			console.log(err)
			return {}
		})
	}

	const weatherIcons: Icons = {
		0: 'sun',
		1: 'sun',
		2: 'part_cloud',
		3: 'cloud',
		45: 'fog',
		48: 'fog',
		51: 'rain',
		53: 'rain',
		55: 'rain',
		56: 'rain',
		57: 'rain',
		61: 'rain',
		63: 'rain',
		65: 'rain',
		66: 'rain',
		67: 'rain',
		71: 'snow',
		73: 'snow',
		75: 'snow',
		77: 'snow',
		80: 'rain',
		81: 'rain',
		82: 'rain',
		85: 'snow',
		86: 'snow',
		95: 'thunder',
		96: 'thunder',
		99: 'thunder',
	}

	return {
		getWeek, getDay
	}
}
