import { db } from '$lib/server/database';
import { json } from '@sveltejs/kit'; // Ez a SvelteKit saját segédfüggvénye

export async function POST({ request }) {
	try {
		const { first, second, third, fourth, fifth } = await request.json();

		const [f_first, f_second, f_third, f_fourth, f_fifth] = [
			first,
			second,
			third,
			fourth,
			fifth
		].sort((a, b) => a - b);

		const lotteryData = await db.five.findMany({
			where: { f_first, f_second, f_third, f_fourth, f_fifth }
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
