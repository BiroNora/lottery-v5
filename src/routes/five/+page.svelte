<script lang="ts">
  import { page } from '$app/stores';
  import { formats, url_router } from '../stores/dataStore';

  // --- Svelte 5 Runes ($state) ---
  // Külön változókat használunk a bind:value-hoz, hogy ne vesszenek el az inputok
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

    // Értékek ellenőrzése és rendezése
    const nums = [first, second, third, fourth, fifth].filter(n => n !== undefined) as number[];
    const uniqueNums = new Set(nums);

    if (nums.length !== 5 || uniqueNums.size !== 5) {
      err_mess = true;
      return;
    }

    nums.sort((a, b) => a - b);

    // Visszaírjuk a rendezett számokat a kijelzőre
    first = nums[0]; second = nums[1]; third = nums[2]; fourth = nums[3]; fifth = nums[4];

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

<div class="pt-12 h-screen bg-no-repeat bg-cover bg-center" style="background-image: url('balls100.jpg');">
  <div class="bg-slate-500/40 backdrop-blur-sm">
    <div>
      <p class="p-5 text-center font-poppins md:font-extrabold md:text-5xl text-3xl text-gray-50">
        Search on Pick-5 Lottery
      </p>

      <div class="text-center flex flex-col items-center justify-center font-poppins text-3xl font-semibold">
        <form onsubmit={sendDataWithForm}>
          <input
            class="max-w-[152.6px] md:my-0 my-1 md:mx-0 mx-0.5 rounded bg-slate-400 opacity-90 border-2 border-lime-300 text-white font-bold text-opacity-100"
            type="number"
            bind:value={first}
            min={minValue}
            max={maxValue}
            required
          />
          <input
            class="max-w-[152.6px] md:my-0 my-1 md:mx-0 mx-0.5 rounded bg-slate-400 opacity-90 border-2 border-lime-300 text-white font-bold text-opacity-100"
            type="number"
            bind:value={second}
            min={minValue}
            max={maxValue}
            required
          />
          <input
            class="max-w-[152.6px] md:my-0 my-1 md:mx-0 mx-0.5 rounded bg-slate-400 opacity-90 border-2 border-lime-300 text-white font-bold text-opacity-100"
            type="number"
            bind:value={third}
            min={minValue}
            max={maxValue}
            required
          />
          <input
            class="max-w-[152.6px] md:my-0 my-1 md:mx-0 mx-0.5 rounded bg-slate-400 opacity-90 border-2 border-lime-300 text-white font-bold text-opacity-100"
            type="number"
            bind:value={fourth}
            min={minValue}
            max={maxValue}
            required
          />
          <input
            class="max-w-[152.6px] md:my-0 my-1 md:mx-0 mx-0.5 rounded bg-slate-400 opacity-90 border-2 border-lime-300 text-white font-bold text-opacity-100"
            type="number"
            bind:value={fifth}
            min={minValue}
            max={maxValue}
            required
          />
          <div class="md:my-0 my-1 md:mx-0 mx-0.5 md:inline">
            <button
              class="max-w-[152.6px] text-white md:hover:text-lime-300 font-normal text-2xl md:text-3xl"
              id="btn"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>

      <div class="pt-6 pb-6 flex flex-col items-center justify-center font-poppins font-bold text-white opacity-86 text-3xl">
        {#if err_mess}
          <div class="text-xl md:text-2xl font-normal">
            <p><i>Numbers can not be the same.</i></p>
          </div>
        {/if}

        {#if no_res}
          <div class="text-xl md:text-2xl font-normal">
            <p>No result.</p>
          </div>
        {/if}

        {#if show}
          <div class="flex flex-col items-center justify-center">
            {#each lotteryData as lot}
              <div class="mb-4 text-center">
                <p>
                  <span class="text-xl md:text-2xl font-normal">Amount:</span>
                  {formats(lot.f_total)} <span class="text-2xl font-normal"> Ft</span>
                </p>
                <p>
                  <span class="text-xl md:text-2xl font-normal">Year/Week:</span>
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
