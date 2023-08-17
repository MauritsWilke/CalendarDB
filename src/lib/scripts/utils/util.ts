export function debounce<T extends (...args: Parameters<T>) => void>(this: ThisParameterType<T>, fn: T, ms = 300) {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};