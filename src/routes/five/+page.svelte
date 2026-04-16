<script lang="ts">
	import { page } from '$app/stores';
	import { formats, url_router } from '../stores/dataStore';

	let first = $state<number>();
	let second = $state<number>();
	let third = $state<number>();
	let fourth = $state<number>();
	let fifth = $state<number>();

	let lotteryData = $state<any[]>([]);
	let err_mess = $state(false);
	let no_res = $state(false);
	let show = $state(false);

	const minValue = 1;
	const maxValue = 90;
	let url = '';
	let folder_name = $page.url.pathname;

	async function sendDataWithForm(event: Event) {
		event.preventDefault();

		err_mess = false;
		no_res = false;
		show = false;

		const nums = [first, second, third, fourth, fifth].filter((n) => n !== undefined) as number[];
		const uniqueNums = new Set(nums);

		if (nums.length !== 5 || uniqueNums.size !== 5) {
			err_mess = true;
			return;
		}

		nums.sort((a, b) => a - b);

		first = nums[0];
		second = nums[1];
		third = nums[2];
		fourth = nums[3];
		fifth = nums[4];

		try {
			url_router(url, folder_name);

			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ first, second, third, fourth, fifth })
			});

			if (response.ok) {
				const responseData = await response.json();
				lotteryData = responseData.lotteryData;

				if (!lotteryData || lotteryData.length === 0) {
					no_res = true;
				} else {
					show = true;
				}
			}
		} catch (err) {
			console.error('Fetch error:', err);
		}
	}
</script>

<div
	class="h-screen rounded bg-cover bg-center bg-no-repeat pt-12"
	style="background-image: url('balls100.jpg');"
>
	<div class="rounded bg-slate-400/50 backdrop-blur-sm">
		<div>
			<p class="p-5 text-center font-poppins text-3xl text-gray-50 md:text-5xl md:font-medium">
				Search on Pick-5 Lottery
			</p>

			<div
				class="flex flex-col items-center justify-center text-center font-poppins text-3xl font-semibold"
			>
				<form onsubmit={sendDataWithForm}>
					<input
						class="no-spinner aspect-square h-16 w-16 rounded-full border-4 border-amber-500 text-center font-bold text-white transition-all outline-none focus:border-cyan-600"
						type="number"
						bind:value={first}
						min={minValue}
						max={maxValue}
						required
					/>
					<input
						class="no-spinner aspect-square h-16 w-16 rounded-full border-4 border-amber-500 text-center font-bold text-white transition-all outline-none focus:border-cyan-600"
						type="number"
						bind:value={second}
						min={minValue}
						max={maxValue}
						required
					/>
					<input
						class="no-spinner aspect-square h-16 w-16 rounded-full border-4 border-amber-500 text-center font-bold text-white transition-all outline-none focus:border-cyan-600"
						type="number"
						bind:value={third}
						min={minValue}
						max={maxValue}
						required
					/>
					<input
						class="no-spinner aspect-square h-16 w-16 rounded-full border-4 border-amber-500 text-center font-bold text-white transition-all outline-none focus:border-cyan-600"
						type="number"
						bind:value={fourth}
						min={minValue}
						max={maxValue}
						required
					/>
					<input
						class="no-spinner aspect-square h-16 w-16 rounded-full border-4 border-amber-500 text-center font-bold text-white transition-all outline-none focus:border-cyan-600"
						type="number"
						bind:value={fifth}
						min={minValue}
						max={maxValue}
						required
					/>

					<div class="mx-0.5 my-1 md:mx-0 md:my-0 md:inline">
						<button
							class="max-w-[152.6px] text-2xl font-normal text-white md:text-3xl md:hover:text-black"
							id="btn"
							type="submit"
						>
							Confirm
						</button>
					</div>
				</form>
			</div>

			<div
				class="flex flex-col items-center justify-center pt-6 pb-6 font-poppins text-3xl font-bold text-white"
			>
				{#if err_mess}
					<div class="text-xl font-normal md:text-2xl">
						<p><i>Numbers can not be the same.</i></p>
					</div>
				{/if}

				{#if no_res}
					<div class="text-xl font-normal md:text-2xl">
						<p>No result.</p>
					</div>
				{/if}

				{#if show}
					<div class="flex flex-col items-center justify-center">
						{#each lotteryData as lot}
							<div class="mb-4 text-center">
								<p>
									<span class="text-xl font-normal md:text-2xl">Amount:</span>
									{formats(lot.f_total)} <span class="text-2xl font-normal"> Ft</span>
								</p>
								<p>
									<span class="text-xl font-normal md:text-2xl">Year/Week:</span>
									{lot.f_year}/{lot.f_week}
								</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Eltünteti a nyilakat Chrome, Safari, Edge és Firefox esetén */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
