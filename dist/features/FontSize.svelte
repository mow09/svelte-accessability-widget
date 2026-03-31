<script module lang="ts">
	import { Type } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	export const FONT_SIZE_SIZES = [100, 110, 125, 150];

	export const config: FeatureConfig = {
		id: 'font-size',
		label: 'Schriftgröße',
		category: 'Lesen',
		size: 'md',
		icon: Type
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { ThemeConfig } from '../types.js';

	interface Props {
		active: boolean;
		theme: ThemeConfig;
		onToggle: (id: string, active: boolean) => void;
	}

	let { active, theme, onToggle }: Props = $props();

	const STORAGE_KEY = 'aw-font-size-level';
	const SIZES = [100, 110, 125, 150];
	const SIZE_LABELS = ['Normal', 'Groß', 'Größer', 'Sehr groß'];

	let level = $state(0);

	function applyLevel(l: number) {
		if (typeof document === 'undefined') return;
		if (l === 0) {
			document.documentElement.style.removeProperty('font-size');
		} else {
			document.documentElement.style.fontSize = SIZES[l] + '%';
		}
	}

	onMount(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved !== null) {
				const parsed = parseInt(saved, 10);
				if (parsed >= 0 && parsed < SIZES.length) {
					level = parsed;
					if (active) applyLevel(parsed);
				}
			}
		} catch {}
	});

	$effect(() => {
		if (!active && level !== 0) {
			level = 0;
			applyLevel(0);
		}
	});

	function decrease() {
		if (level === 0) return;
		const next = level - 1;
		level = next;
		applyLevel(next);
		try {
			localStorage.setItem(STORAGE_KEY, String(next));
		} catch {}
		if (next === 0) onToggle('font-size', false);
	}

	function increase() {
		if (level >= SIZES.length - 1) return;
		const wasInactive = level === 0;
		const next = level + 1;
		level = next;
		applyLevel(next);
		try {
			localStorage.setItem(STORAGE_KEY, String(next));
		} catch {}
		if (wasInactive) onToggle('font-size', true);
	}
</script>

<div
	class="flex items-center gap-3 rounded-xl border p-3 transition-all duration-200"
	style="
		background-color: {active ? theme.surface : theme.background};
		border-color: {active ? theme.primary : theme.border};
	"
>
	<span
		class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
		style="background-color: {active ? theme.primary : theme.surface};"
	>
		<Type class="h-4 w-4" style="color: {active ? theme.primaryText : theme.primary};" />
	</span>

	<div class="min-w-0 flex-1">
		<p class="text-sm font-medium leading-tight" style="color: {theme.text};">Schriftgröße</p>
		<p class="text-xs" style="color: {theme.muted};">{SIZE_LABELS[level]}</p>
	</div>

	<div class="flex items-center gap-1">
		<button
			onclick={decrease}
			disabled={level === 0}
			aria-label="Schriftgröße verkleinern"
			class="flex h-7 w-7 items-center justify-center rounded-lg text-base font-bold transition-colors disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2"
			style="background-color: {theme.surface}; color: {theme.text}; --tw-ring-color: {theme.primary};"
		>
			−
		</button>
		<span
			class="w-10 text-center text-xs tabular-nums"
			style="color: {theme.muted};"
			aria-live="polite"
			aria-label="Aktuelle Schriftgröße: {SIZES[level]} Prozent"
		>
			{SIZES[level]}%
		</span>
		<button
			onclick={increase}
			disabled={level >= SIZES.length - 1}
			aria-label="Schriftgröße vergrößern"
			class="flex h-7 w-7 items-center justify-center rounded-lg text-base font-bold transition-colors disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2"
			style="background-color: {theme.surface}; color: {theme.text}; --tw-ring-color: {theme.primary};"
		>
			+
		</button>
	</div>
</div>
