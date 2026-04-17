import { db } from '$lib/server/database';
import { json } from '@sveltejs/kit'; // Ez a SvelteKit saját segédfüggvénye

export async function POST({ request }) {
	try {
		const { first, second, third, fourth, fifth, sixth, seventh } = await request.json();

		const mainNumbers = [first, second, third, fourth, fifth].sort((a, b) => a - b);
		const euroNumbers = [sixth, seventh].sort((a, b) => a - b);

		const [e_first, e_second, e_third, e_fourth, e_fifth] = mainNumbers;
		const [e_sixth, e_seventh] = euroNumbers;

		const lotteryData = await db.euro.findMany({
			where: {
				e_first,
				e_second,
				e_third,
				e_fourth,
				e_fifth,
				e_sixth,
				e_seventh
			}
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
