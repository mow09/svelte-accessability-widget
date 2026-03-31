<script lang="ts">
	import type { ThemeConfig } from '../types.js';
	import type { Component } from 'svelte';

	interface Props {
		id: string;
		label: string;
		description?: string;
		icon?: Component;
		active?: boolean;
		theme: ThemeConfig;
		onToggle?: (id: string, active: boolean) => void;
	}

	let { id, label, description, icon: Icon, active = false, theme, onToggle }: Props = $props();

	function handleToggle() {
		onToggle?.(id, !active);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleToggle();
		}
	}
</script>

<div
	class="flex items-center gap-3 rounded-xl border p-3 transition-all duration-200"
	style="
		background-color: {active ? theme.surface : theme.background};
		border-color: {active ? theme.primary : theme.border};
	"
>
	{#if Icon}
		<span
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
			style="background-color: {active ? theme.primary : theme.surface};"
		>
			<Icon
				class="h-4 w-4"
				style="color: {active ? theme.primaryText : theme.primary};"
			/>
		</span>
	{/if}

	<div class="min-w-0 flex-1">
		<p class="text-sm font-medium leading-tight" style="color: {theme.text};">{label}</p>
		{#if description}
			<p class="mt-0.5 text-xs leading-snug" style="color: {theme.muted};">{description}</p>
		{/if}
	</div>

	<button
		onclick={handleToggle}
		onkeydown={handleKeydown}
		role="switch"
		aria-checked={active}
		aria-label={label}
		class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		style="
			background-color: {active ? theme.primary : theme.border};
			--tw-ring-color: {theme.primary};
		"
	>
		<span
			class="pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
			style="
				background-color: white;
				transform: translateX({active ? '20px' : '0px'});
			"
		></span>
	</button>
</div>
