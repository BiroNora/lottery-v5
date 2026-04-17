import { db } from '$lib/server/database';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const values = await request.json();

		const numbers = Object.values(values)
			.map(Number)
			.sort((a, b) => a - b);

		if (numbers.length < 7) {
			return json({ error: '7 szám szükséges' }, { status: 400 });
		}

		const [n1, n2, n3, n4, n5, n6, n7] = numbers;

		const lotteryData = await db.skandi.findMany({
			where: {
				OR: [
					{
						m_first: n1,
						m_second: n2,
						m_third: n3,
						m_fourth: n4,
						m_fifth: n5,
						m_sixth: n6,
						m_seventh: n7
					},
					{
						h_first: n1,
						h_second: n2,
						h_third: n3,
						h_fourth: n4,
						h_fifth: n5,
						h_sixth: n6,
						h_seventh: n7
					}
				]
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
		console.error('Skandi DB Error:', error);
		return json({ error: 'Server error' }, { status: 500 });
	}
}
