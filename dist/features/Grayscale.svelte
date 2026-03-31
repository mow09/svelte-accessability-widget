<script module lang="ts">
	import { Blend } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	export const config: FeatureConfig = {
		id: 'grayscale',
		label: 'Graustufen',
		category: 'Sehen',
		size: 'sm',
		icon: Blend,
		css: `html { filter: grayscale(100%) !important; }`
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
