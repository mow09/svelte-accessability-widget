<script module lang="ts">
	import { MousePointer2 } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	const _svg = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 16 16'><path d='M0 0L0 12L3.5 8.5L6 14.5L8.5 13.5L6 7.5H11Z' fill='black' stroke='white' stroke-width='1'/></svg>`;

	export const config: FeatureConfig = {
		id: 'big-cursor',
		label: 'Großer Cursor',
		category: 'Motorik',
		size: 'sm',
		icon: MousePointer2,
		css: `* { cursor: url("data:image/svg+xml,${encodeURIComponent(_svg)}") 0 0, auto !important; }`
	};
</script>

<script lang="ts">
	import FeatureCard from '../components/FeatureCard.svelte';
	import type { ThemeConfig } from '../types.js';

	interface Props {
		active: boolean;
		theme: ThemeConfig;
		onToggle: (id: string, active: boolean) => void;
	}

	let { active, theme, onToggle }: Props = $props();
</script>

<FeatureCard
	id="big-cursor"
	label="Großer Cursor"
	icon={MousePointer2}
	{active}
	{theme}
	{onToggle}
/>
