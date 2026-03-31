<script module lang="ts">
	import { AlignJustify } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	export const config: FeatureConfig = {
		id: 'line-height',
		label: 'Zeilenhöhe',
		category: 'Lesen',
		size: 'sm',
		icon: AlignJustify,
		css: `p, li, h1, h2, h3, h4, h5, h6, span, div, a, td, th, label { line-height: 1.8 !important; }`
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

<FeatureCard id={config.id} label={config.label} icon={config.icon} {active} {theme} {onToggle} />
