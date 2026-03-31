<script module lang="ts">
	import { Eye } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	export const config: FeatureConfig = {
		id: 'high-contrast',
		label: 'Hoher Kontrast',
		category: 'Sehen',
		size: 'sm',
		icon: Eye,
		css: `html { filter: invert(100%) hue-rotate(180deg) !important; } html img, html video, html canvas, html svg { filter: invert(100%) hue-rotate(180deg) !important; }`
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
