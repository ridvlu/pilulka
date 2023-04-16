// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		strict: true
	},

	css: [
		'@/assets/css/main.scss'
	],

	modules: ['nuxt-icon']
})