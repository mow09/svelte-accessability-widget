<script lang="ts">
	import type { ThemeConfig } from '../types.js';
	import type { Component } from 'svelte';

	interface Props {
		id: string;
		label: string;
		icon?: Component;
		active?: boolean;
		theme: ThemeConfig;
		onToggle?: (id: string, active: boolean) => void;
	}

	let { id, label, icon: Icon, active = false, theme, onToggle }: Props = $props();

	function handleClick() {
		onToggle?.(id, !active);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	}
</script>

<button
	onclick={handleClick}
	onkeydown={handleKeydown}
	role="switch"
	aria-checked={active}
	aria-label={label}
	class="flex flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full"
	style="
		background-color: {active ? theme.primary : theme.surface};
		border-color: {active ? theme.primary : theme.border};
		color: {active ? theme.primaryText : theme.text};
		--tw-ring-color: {theme.primary};
	"
>
	{#if Icon}
		<span
			class="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
			style="background-color: {active ? 'rgba(255,255,255,0.2)' : theme.background};"
		>
			<Icon
				class="h-4 w-4"
				style="color: {active ? theme.primaryText : theme.primary};"
			/>
		</span>
	{/if}
	<span class="text-xs font-medium leading-tight">{label}</span>
</button>
