<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Accessibility, X, RotateCcw, EyeOff } from '@lucide/svelte';
	import type { ThemeConfig, ThemePreset, FeatureConfig, Labels, WidgetPosition } from '../types.js';
	import { resolveTheme } from '../themes.js';
	import { injectStyle, removeStyle } from '../utils/style.js';
	import { BUILTIN_FEATURES, FONT_SIZE_SIZES, FontSize } from '../features/index.js';
	import FeatureCard from './FeatureCard.svelte';
	import FeatureRow from './FeatureRow.svelte';

	interface Props {
		theme?: ThemePreset | Partial<ThemeConfig>;
		position?: WidgetPosition;
		darkMode?: boolean;
		persist?: boolean;
		showBranding?: boolean;
		labels?: Labels;
		features?: FeatureConfig[];
		extra?: Snippet;
		branding?: Snippet;
	}

	let {
		theme = 'indigo',
		position = 'bottom-right',
		darkMode = undefined,
		persist = true,
		showBranding = false,
		labels = {},
		features: consumerFeatures = [],
		extra,
		branding
	}: Props = $props();

	const defaultLabels = {
		title: 'Barrierefreiheit',
		subtitle: 'Passen Sie die Darstellung an Ihre Bedürfnisse an',
		close: 'Schließen',
		reset: 'Zurücksetzen',
		hideToolbar: 'Symbolleiste ausblenden',
		poweredBy: 'Powered by svelte-accessibility-widget'
	};

	const l = $derived({ ...defaultLabels, ...labels });

	let systemDark = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		systemDark = mq.matches;
		const handler = (e: MediaQueryListEvent) => {
			systemDark = e.matches;
		};
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});

	const isDark = $derived(darkMode !== undefined ? darkMode : systemDark);
	const resolvedTheme = $derived(resolveTheme(theme, isDark));

	let isOpen = $state(false);
	let isHidden = $state(false);

	const STORAGE_KEY = 'aw-active-features';
	let activeFeatures = $state<Set<string>>(new Set());

	onMount(() => {
		if (!persist) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) activeFeatures = new Set(JSON.parse(raw) as string[]);
		} catch {}
	});

	$effect(() => {
		if (typeof document === 'undefined') return;

		for (const f of [...BUILTIN_FEATURES, ...consumerFeatures]) {
			if (!f.css) continue;
			if (activeFeatures.has(f.id)) injectStyle(`aw-${f.id}`, f.css);
			else removeStyle(`aw-${f.id}`);
		}

		if (activeFeatures.has('dyslexia-font')) {
			if (!document.getElementById('aw-dyslexia-font-link')) {
				const link = document.createElement('link');
				link.id = 'aw-dyslexia-font-link';
				link.rel = 'stylesheet';
				link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
				document.head.appendChild(link);
			}
		} else {
			document.getElementById('aw-dyslexia-font-link')?.remove();
		}

		if (activeFeatures.has('font-size')) {
			try {
				const saved = localStorage.getItem('aw-font-size-level');
				const level = saved !== null ? parseInt(saved, 10) : 0;
				if (level > 0 && level < FONT_SIZE_SIZES.length)
					document.documentElement.style.fontSize = FONT_SIZE_SIZES[level] + '%';
			} catch {}
		} else {
			document.documentElement.style.removeProperty('font-size');
		}
	});

	function handleToggle(id: string, active: boolean) {
		const next = new Set(activeFeatures);
		if (active) next.add(id);
		else next.delete(id);
		activeFeatures = next;
		if (persist) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
			} catch {}
		}
	}

	function resetAll() {
		activeFeatures = new Set();
		if (persist) {
			try {
				localStorage.removeItem(STORAGE_KEY);
			} catch {}
		}
	}

	function hideToolbar() {
		isOpen = false;
		isHidden = true;
		document.body.style.overflow = '';
	}

	const activeCount = $derived(activeFeatures.size);

	const allFeatures = $derived([...BUILTIN_FEATURES, ...consumerFeatures]);

	const groupedFeatures = $derived.by(() => {
		const groups = new Map<string, FeatureConfig[]>();
		const uncategorized: FeatureConfig[] = [];
		for (const feature of allFeatures) {
			if (feature.category) {
				if (!groups.has(feature.category)) groups.set(feature.category, []);
				groups.get(feature.category)!.push(feature);
			} else {
				uncategorized.push(feature);
			}
		}
		return { groups, uncategorized };
	});

	let panelEl = $state<HTMLElement | undefined>(undefined);

	function getFocusable(): HTMLElement[] {
		if (!panelEl) return [];
		return Array.from(
			(panelEl as HTMLElement).querySelectorAll<HTMLElement>(
				'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
			)
		);
	}

	function openPanel() {
		isOpen = true;
		document.body.style.overflow = 'hidden';
		setTimeout(() => getFocusable()[0]?.focus(), 60);
	}

	function closePanel() {
		isOpen = false;
		document.body.style.overflow = '';
	}

	function handlePanelKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			closePanel();
			return;
		}
		if (e.key === 'Tab') {
			const focusable = getFocusable();
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	}

	const panelFlyX = $derived(position === 'bottom-right' ? 400 : -400);
	const fabPositionClass = $derived(position === 'bottom-right' ? 'bottom-5 right-5' : 'bottom-5 left-5');
	const panelSideClass = $derived(
		position === 'bottom-right'
			? 'sm:right-0 sm:left-auto sm:border-l sm:rounded-l-2xl'
			: 'sm:left-0 sm:right-auto sm:border-r sm:rounded-r-2xl'
	);
</script>

{#if !isHidden}
	<button
		onclick={openPanel}
		class="fixed z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 {fabPositionClass}"
		style="background-color: {resolvedTheme.primary}; --tw-ring-color: {resolvedTheme.primary};"
		aria-label={l.title}
		aria-haspopup="dialog"
		aria-expanded={isOpen}
	>
		<Accessibility class="h-7 w-7" style="color: {resolvedTheme.primaryText};" />
		{#if activeCount > 0}
			<span
				class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
				style="background-color: #ef4444; color: #ffffff;"
				aria-label="{activeCount} aktive Einstellungen"
			>
				{activeCount}
			</span>
		{/if}
	</button>
{/if}

{#if isOpen}
	<div
		class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
		onclick={closePanel}
		aria-hidden="true"
		role="presentation"
	></div>

	<div
		bind:this={panelEl}
		role="dialog"
		aria-modal="true"
		aria-label={l.title}
		tabindex="-1"
		onkeydown={handlePanelKeydown}
		class="fixed bottom-0 left-0 right-0 z-50 flex max-h-[90vh] flex-col overflow-hidden rounded-t-2xl shadow-2xl sm:inset-y-0 sm:max-h-full sm:w-96 sm:rounded-t-none {panelSideClass}"
		style="background-color: {resolvedTheme.background}; border-color: {resolvedTheme.border};"
		transition:fly={{ x: panelFlyX, y: 0, duration: 300 }}
	>
		<header
			class="flex shrink-0 items-start justify-between gap-3 border-b px-5 py-4"
			style="border-color: {resolvedTheme.border};"
		>
			<div>
				<h2 class="text-base font-semibold" style="color: {resolvedTheme.text};">{l.title}</h2>
				{#if l.subtitle}
					<p class="mt-0.5 text-xs leading-snug" style="color: {resolvedTheme.muted};">{l.subtitle}</p>
				{/if}
			</div>
			<button
				onclick={closePanel}
				class="shrink-0 rounded-lg p-1.5 transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
				style="color: {resolvedTheme.muted}; --tw-ring-color: {resolvedTheme.primary};"
				aria-label={l.close}
			>
				<X class="h-5 w-5" />
			</button>
		</header>

		<div
			class="flex shrink-0 items-center border-b px-4 py-2"
			style="border-color: {resolvedTheme.border};"
		>
			<button
				onclick={resetAll}
				class="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-medium transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:ring-2"
				style="color: {resolvedTheme.muted}; --tw-ring-color: {resolvedTheme.primary};"
			>
				<RotateCcw class="h-3.5 w-3.5" />
				{l.reset}
			</button>
		</div>

		<div class="flex-1 space-y-5 overflow-y-auto px-4 py-4">
			{#each [...groupedFeatures.groups.entries()] as [category, features]}
				<section>
					<h3
						class="mb-2 px-1 text-xs font-semibold uppercase tracking-wider"
						style="color: {resolvedTheme.muted};"
					>
						{category}
					</h3>
					<div class="grid grid-cols-2 gap-2">
						{#each features as feature (feature.id)}
							<div class="{feature.size !== 'sm' ? 'col-span-2' : ''}">
								{#if feature.id === 'font-size'}
									<FontSize
										active={activeFeatures.has(feature.id)}
										theme={resolvedTheme}
										onToggle={handleToggle}
									/>
								{:else if feature.size !== 'sm'}
									<FeatureRow
										id={feature.id}
										label={feature.label}
										description={feature.description}
										icon={feature.icon}
										active={activeFeatures.has(feature.id)}
										theme={resolvedTheme}
										onToggle={handleToggle}
									/>
								{:else}
									<FeatureCard
										id={feature.id}
										label={feature.label}
										icon={feature.icon}
										active={activeFeatures.has(feature.id)}
										theme={resolvedTheme}
										onToggle={handleToggle}
									/>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/each}

			{#if groupedFeatures.uncategorized.length > 0}
				<section>
					<div class="grid grid-cols-2 gap-2">
						{#each groupedFeatures.uncategorized as feature (feature.id)}
							<div class="{feature.size !== 'sm' ? 'col-span-2' : ''}">
								{#if feature.size !== 'sm'}
									<FeatureRow
										id={feature.id}
										label={feature.label}
										description={feature.description}
										icon={feature.icon}
										active={activeFeatures.has(feature.id)}
										theme={resolvedTheme}
										onToggle={handleToggle}
									/>
								{:else}
									<FeatureCard
										id={feature.id}
										label={feature.label}
										icon={feature.icon}
										active={activeFeatures.has(feature.id)}
										theme={resolvedTheme}
										onToggle={handleToggle}
									/>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/if}

			{#if extra}
				{@render extra()}
			{/if}
		</div>

		<footer
			class="shrink-0 space-y-1 border-t px-4 py-3"
			style="border-color: {resolvedTheme.border}; background-color: {resolvedTheme.background};"
		>
			<button
				onclick={hideToolbar}
				class="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:ring-2"
				style="color: {resolvedTheme.muted}; --tw-ring-color: {resolvedTheme.primary};"
			>
				<EyeOff class="h-3.5 w-3.5" />
				{l.hideToolbar}
			</button>

			{#if showBranding}
				{#if branding}
					{@render branding()}
				{:else}
					<p class="text-center text-xs" style="color: {resolvedTheme.muted};">
						{l.poweredBy}
					</p>
				{/if}
			{/if}
		</footer>
	</div>
{/if}
