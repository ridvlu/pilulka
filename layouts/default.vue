<template>
	
	<header>
		<h1>Weather Machine</h1>
		<nav>
			<NuxtLink to="/" class="box clickable">Aplikace</NuxtLink>
			<NuxtLink to="/about" class="box clickable">Poznámky</NuxtLink>
		</nav>
	</header>

	<main>
		<slot />
	</main>

</template>
