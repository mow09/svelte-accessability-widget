export function injectStyle(id, css) {
    if (typeof document === 'undefined')
        return;
    let el = document.getElementById(id);
    if (!el) {
        el = document.createElement('style');
        el.id = id;
        document.head.appendChild(el);
    }
    el.textContent = css;
}
export function removeStyle(id) {
    if (typeof document === 'undefined')
        return;
    document.getElementById(id)?.remove();
}
