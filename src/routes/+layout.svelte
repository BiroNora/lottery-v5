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

<nav class="fixed top-0 left-0 z-50 h-12 w-full bg-teal-700">
  <div class="mx-auto max-w-7xl h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
    <a
      href="https://github.com/BiroNora/lottery"
      target="_blank"
      class="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img src="/git.png" class="h-8" alt="Github Logo" />
      <span
        class="font-poppins hidden text-lg text-gray-100 sm:inline sm:text-base md:text-xl md:hover:text-purple-300 lg:text-2xl whitespace-nowrap"
      >
        See You on Github
      </span>
    </a>
    <div>
      <button
        onclick={toggleMenu}
        id="hamburger-button"
        class="relative h-8 w-8 cursor-pointer text-3xl text-white md:hidden"
        type="button"
      >
        &#9776;
      </button>

      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="text-lg mt-4 flex flex-col border p-4 font-light md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse"
        >
          <li>
            <a href="/" class="font-poppins block py-2 px-3 text-gray-100 md:hover:text-slate-200">
              Home
            </a>
          </li>
          <li>
            <a href="/five" class="font-poppins block py-2 px-3 text-gray-100 md:hover:text-green-200">
              Pick 5
            </a>
          </li>
          <li>
            <a href="/six" class="font-poppins block py-2 px-3 text-gray-100 md:hover:text-green-200">
              Pick 6
            </a>
          </li>
          <li>
            <a href="/skandi" class="font-poppins block py-2 px-3 text-gray-100 md:hover:text-green-200">
              Skandi
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

{#if is_menu_open}
  <nav
    class="font-poppins absolute top-12 z-40 flex w-full origin-top flex-col justify-center bg-slate-500/80 py-8 text-4xl text-white"
    aria-label="mobile"
  >
    <ul class="flex min-h-screen flex-col items-center">
      <li class="pb-7 pt-6">
        <a onclick={toggleMenu} href="/five" class="w-full py-6 text-center font-medium">Pick 5</a>
      </li>
      <li class="pb-7">
        <a onclick={toggleMenu} href="/six" class="w-full py-6 text-center font-medium">Pick 6</a>
      </li>
      <li class="pb-7">
        <a href="/skandi" onclick={toggleMenu} class="w-full py-6 text-center font-medium">Skandi</a>
      </li>
      <li class="pt-10">
        <a
          href="/"
          onclick={toggleMenu}
          class="w-full text-center text-5xl font-bold text-red-500 py-8"
        >
          Home
        </a>
      </li>
    </ul>
  </nav>
{/if}

<main>
  {@render children()}
</main>
