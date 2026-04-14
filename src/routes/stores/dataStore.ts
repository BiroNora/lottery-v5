export function url_router(url: string, folder_name: string): string {
	if (!import.meta.env.MODE) {
		throw new Error('import.meta.env.MODE is not available');
	}

	if (!folder_name || typeof folder_name !== 'string' || folder_name.trim() === '') {
		throw new Error('folder_name is not available');
	}

	if (import.meta.env.MODE === 'production') {
		url = `https://lotto-ashen.vercel.app/${folder_name}`;
		return url;
	} else if (import.meta.env.MODE === 'development') {
		url = `http://localhost:5173/${folder_name}`;
		return url;
	} else {
		throw new Error(`Unexpected import.meta.env.MODE value: ${import.meta.env.MODE}`);
	}
}

export function formats(num: number) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
