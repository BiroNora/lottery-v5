import { db } from '$lib/server/database';
import { json } from '@sveltejs/kit'; // Ez a SvelteKit saját segédfüggvénye

export async function POST({ request }) {
  try {
    const { first, second, third, fourth, fifth, sixth } = await request.json();

    const [s_first, s_second, s_third, s_fourth, s_fifth, s_sixth] = [
      first,
      second,
      third,
      fourth,
      fifth,
      sixth
    ].sort((a, b) => a - b);

    const lotteryData = await db.six.findMany({
      where: { s_first, s_second, s_third, s_fourth, s_fifth, s_sixth }
    });

    const body = JSON.stringify({ lotteryData }, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v
    );

    return new Response(body, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Database Error:', error);
    return json({ error: 'An error occurred' }, { status: 500 });
  }
}
