<script module lang="ts">
	import { MoveHorizontal } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	export const config: FeatureConfig = {
		id: 'text-spacing',
		label: 'Abstände',
		category: 'Lesen',
		size: 'sm',
		icon: MoveHorizontal,
		css: `* { letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }`
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
