<script module lang="ts">
	import { BookOpen } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	export const config: FeatureConfig = {
		id: 'dyslexia-font',
		label: 'Dyslexie-Schrift',
		category: 'Lesen',
		size: 'sm',
		icon: BookOpen,
		css: `*, body { font-family: 'OpenDyslexic', 'Verdana', 'Geneva', sans-serif !important; }`
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
