<script lang="ts">
	import { formats } from '../stores/dataStore';

	let first = $state<number>();
	let second = $state<number>();
	let third = $state<number>();
	let fourth = $state<number>();
	let fifth = $state<number>();
	let sixth = $state<number>();
	let seventh = $state<number>();

	let lotteryData = $state<any[]>([]);
	let err_mess = $state(false);
	let no_res = $state(false);
	let show = $state(false);

	const minValue = 1;
	const mainStarsmax = 50;
	const euroStarsMax = 12;
	let url = '';

	async function sendDataWithForm(event: Event) {
		event.preventDefault();
		err_mess = false;
		no_res = false;
		show = false;

		const nums = [first, second, third, fourth, fifth].filter((n) => n !== undefined) as number[];
		const uniqueNums = new Set(nums);

		const numsSec = [sixth, seventh].filter((n) => n !== undefined && n !== null) as number[];

		if (
			nums.length !== 5 ||
			uniqueNums.size !== 5 ||
			numsSec.length !== 2 ||
			numsSec[0] === numsSec[1]
		) {
			err_mess = true;
			return;
		}

		const mainStars = nums.sort((a, b) => a - b);
		const euroStars = numsSec.sort((a, b) => a - b);

		const sortedNums = [...mainStars, ...euroStars];
		[first, second, third, fourth, fifth, sixth, seventh] = sortedNums;

		const body = JSON.stringify({
			first: mainStars[0],
			second: mainStars[1],
			third: mainStars[2],
			fourth: mainStars[3],
			fifth: mainStars[4],
			sixth: euroStars[0],
			seventh: euroStars[1]
		});

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: body
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

{#snippet lottoInput(
	val: number | undefined,
	setter: (v: number) => void,
	num: string,
	maxVal: number
)}
	<input
		id="ball-{num}"
		name="ball-{num}"
		class="lotto-ball"
		type="number"
		onkeydown={(e) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
		value={val}
		oninput={(e) => setter(Number((e.currentTarget.value = e.currentTarget.value.slice(0, 2))))}
		min={minValue}
		max={maxVal}
		required
	/>
{/snippet}

<div
	class="h-screen rounded bg-cover bg-center bg-no-repeat pt-12"
	style="background-image: url('balls100.jpg');"
>
	<div class="rounded bg-slate-400/50 backdrop-blur-sm">
		<div>
			<p class="p-5 text-center font-poppins text-3xl text-gray-50 md:text-5xl md:font-medium">
				Search on Eurojackpot Lottery
			</p>

			<div
				class="flex flex-col items-center justify-center text-center font-poppins text-4xl font-bold"
			>
				<form
					onsubmit={sendDataWithForm}
					class="skandi-container flex flex-wrap justify-center gap-3"
				>
					<div class="flex flex-wrap justify-center gap-3">
						{@render lottoInput(first, (v) => (first = v), '1', mainStarsmax)}
						{@render lottoInput(second, (v) => (second = v), '2', mainStarsmax)}
						{@render lottoInput(third, (v) => (third = v), '3', mainStarsmax)}
						{@render lottoInput(fourth, (v) => (fourth = v), '4', mainStarsmax)}
						{@render lottoInput(fifth, (v) => (fifth = v), '5', mainStarsmax)}

						<div class="plus flex flex-wrap justify-center gap-3">
							{@render lottoInput(sixth, (v) => (sixth = v), '6', euroStarsMax)}
							{@render lottoInput(seventh, (v) => (seventh = v), '7', euroStarsMax)}
						</div>
					</div>

					<button
						class="max-w-[152.6px] text-2xl font-normal text-white md:text-3xl md:hover:text-black"
						id="btn"
						type="submit"
					>
						Confirm
					</button>
				</form>
			</div>

			<div
				class="flex flex-col items-center justify-center pt-6 pb-6 font-poppins text-2xl font-bold text-white"
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
									{formats(lot.e_total)} <span class="text-2xl font-normal"> Euro</span>
								</p>
								<p>
									<span class="text-xl font-normal md:text-2xl">Year/Week:</span>
									{lot.e_year}/{lot.e_week}
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
	.lotto-ball {
		background:
			radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.1) 45%),
			radial-gradient(circle at 35% 35%, #f7e00c 0%, #b89b07 70%, #6e4d0a 100%) !important;
	}

	@media (min-width: 510px) {
		.plus {
			margin-left: 1.5rem;
			position: relative;
		}
	}
</style>
