export function injectStyle(id: string, css: string): void {
	if (typeof document === 'undefined') return;
	let el = document.getElementById(id) as HTMLStyleElement | null;
	if (!el) {
		el = document.createElement('style');
		el.id = id;
		document.head.appendChild(el);
	}
	el.textContent = css;
}

export function removeStyle(id: string): void {
	if (typeof document === 'undefined') return;
	document.getElementById(id)?.remove();
}
