<script lang="ts">
	import './layout.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	let { children } = $props();

	injectSpeedInsights();

	let is_menu_open = $state(false);

	function toggleMenu() {
		is_menu_open = !is_menu_open;
	}
</script>

<nav class="fixed top-0 left-0 z-50 h-12 w-full rounded bg-cyan-600">
	<div class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<a
			href="https://github.com/BiroNora/lottery-v5"
			target="_blank"
			class="flex items-center space-x-3 rtl:space-x-reverse"
		>
			<img src="/git.png" class="h-8" alt="Github Logo" />
			<span
				class="hidden font-poppins text-lg whitespace-nowrap text-gray-100 sm:inline sm:text-base md:text-xl md:hover:text-purple-300 lg:text-2xl"
			>
				See You on Git
			</span>
		</a>
		<div>
			<button
				onclick={toggleMenu}
				id="hamburger-button"
				class="relative h-8 w-8 cursor-pointer text-3xl text-white lg:hidden"
				type="button"
			>
				&#9776;
			</button>

			<div class="hidden w-full md:w-auto lg:block" id="navbar-default">
				<ul
					class="mt-4 flex flex-col border p-4 text-lg font-light md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse"
				>
					<li class="nav-container">
						<a
							href="/"
							class="block py-2 font-poppins text-gray-100 hover:font-bold md:hover:text-white"
						>
							Home
						</a>
					</li>
					<li class="nav-container">
						<a
							href="/five"
							class="block py-2 font-poppins text-gray-100 hover:font-bold md:hover:text-green-400"
						>
							Pick 5
						</a>
					</li>
					<li class="nav-container">
						<a
							href="/six"
							class="block py-2 font-poppins text-gray-100 hover:font-bold md:hover:text-fuchsia-500"
						>
							Pick 6
						</a>
					</li>
					<li class="nav-container">
						<a
							href="/skandi"
							class="block py-2 font-poppins text-gray-100 hover:font-bold md:hover:text-blue-800"
						>
							Skandi
						</a>
					</li>
					<li class="nav-container wid">
						<a
							href="/euro"
							class="block py-2 font-poppins text-gray-100 hover:font-bold md:hover:text-amber-200"
						>
							Eurojackpot
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>

{#if is_menu_open}
	<nav
		class="absolute top-12 z-40 flex w-full origin-top flex-col justify-center rounded bg-cyan-300/98 py-8 font-poppins text-4xl text-white"
		aria-label="mobile"
	>
		<ul class="flex min-h-screen flex-col items-center">
			<li class="pt-6 pb-7">
				<a onclick={toggleMenu} href="/five" class="w-full py-6 text-center font-medium">Pick 5</a>
			</li>
			<li class="pb-7">
				<a onclick={toggleMenu} href="/six" class="w-full py-6 text-center font-medium">Pick 6</a>
			</li>
			<li class="pb-7">
				<a href="/skandi" onclick={toggleMenu} class="w-full py-6 text-center font-medium">Skandi</a
				>
			</li>
			<li class="pb-7">
				<a href="/euro" onclick={toggleMenu} class="w-full py-6 text-center font-medium"
					>Eurojackpot</a
				>
			</li>
			<li class="pt-7">
				<a
					href="/"
					onclick={toggleMenu}
					class="w-full py-8 text-center text-5xl font-bold text-red-600"
				>
					Home
				</a>
			</li>
		</ul>
	</nav>
{/if}

<main class="rounded">
	{@render children()}
</main>

<style>
	/* A tartály fix szélessége biztosítja a helyet */
	.nav-container {
		width: 4rem; /* Fix szélesség minden elemnek */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wid {
		width: 7.5rem;
	}
</style>
