<script lang="ts">
	import { formats } from '../stores/dataStore';

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
		[first, second, third, fourth, fifth] = nums;

		try {
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

{#snippet lottoInput(val: number | undefined, setter: (v: number) => void)}
	<input
		class="lotto-ball"
		type="number"
		value={val}
		oninput={(e) => setter(Number(e.currentTarget.value))}
		min={minValue}
		max={maxValue}
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
				Search on Pick-5 Lottery
			</p>

			<div
				class="flex flex-col items-center justify-center text-center font-poppins text-4xl font-bold"
			>
				<form onsubmit={sendDataWithForm} class="flex flex-wrap justify-center gap-3">
					{@render lottoInput(first, (v) => (first = v))}
					{@render lottoInput(second, (v) => (second = v))}
					{@render lottoInput(third, (v) => (third = v))}
					{@render lottoInput(fourth, (v) => (fourth = v))}
					{@render lottoInput(fifth, (v) => (fifth = v))}

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

	/* .lotto-ball {
		aspect-ratio: 1 / 1;
		height: 4rem;
		width: 4rem;
		border-radius: 9999px; /* rounded-full
		text-align: center;
		font-weight: bold;
		color: white !important;
		transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
		border: none;
		color-scheme: light !important;

		background:
			radial-gradient(circle at 32% 32%, rgba(173, 242, 90, 0.6) 0%, rgba(173, 242, 90, 0.1) 35%),
			radial-gradient(circle at 35% 35%, #34f70c 0%, #07b842 70%, #0a6e3a 100%) !important;
		background-color: transparent !important;
		color: white !important;

		box-shadow:
			inset -3px -3px 10px rgba(0, 0, 0, 0.4),
			5px 10px 20px rgba(0, 0, 0, 0.3);

		-webkit-appearance: none;
		-moz-appearance: textfield;
		appearance: none;
	} */
	 .lotto-ball {
  aspect-ratio: 1 / 1;
		height: 4rem;
		width: 4rem;
		border-radius: 9999px;
		text-align: center;
		font-weight: bold;
		color: white !important;
		transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
		border: none;
		color-scheme: light !important;
  position: relative; /* Kell az utóelemnek */
  overflow: hidden;
  background: radial-gradient(circle at 35% 35%, #34f70c 0%, #07b842 70%, #0a6e3a 100%) !important;
  color-scheme: light;
}

/* Külön rétegre tesszük a csillanást, amit nem tud sötétíteni a rendszer */
.lotto-ball::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 32% 32%, white 0%, rgba(255,255,255,0) 35%);

  /* Ez a kulcs: hozzáadja a fényt az alatta lévő zöldhöz */
  mix-blend-mode: overlay;
  pointer-events: none;
}

	.lotto-ball:focus {
		transform: scale(1.1);
	}
</style>
