<script module lang="ts">
	import { Link } from '@lucide/svelte';
	import type { FeatureConfig } from '../types.js';

	export const config: FeatureConfig = {
		id: 'highlight-links',
		label: 'Links hervorheben',
		category: 'Lesen',
		size: 'sm',
		icon: Link,
		css: `a:not([href=""]):not([href="#"]) { text-decoration: underline !important; text-decoration-thickness: 2px !important; text-underline-offset: 3px !important; outline: 2px solid currentColor !important; outline-offset: 2px !important; border-radius: 2px !important; }`
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
