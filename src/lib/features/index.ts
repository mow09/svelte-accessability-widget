import type { FeatureConfig } from '../types.js';
import { config as highContrast } from './HighContrast.svelte';
import { config as grayscale } from './Grayscale.svelte';
import { config as pauseAnimations } from './PauseAnimations.svelte';
import { config as fontSize } from './FontSize.svelte';
import { config as highlightLinks } from './HighlightLinks.svelte';
import { config as textSpacing } from './TextSpacing.svelte';
import { config as lineHeight } from './LineHeight.svelte';
import { config as dyslexiaFont } from './DyslexiaFont.svelte';
import { config as bigCursor } from './BigCursor.svelte';

export { default as FontSize, FONT_SIZE_SIZES } from './FontSize.svelte';

export const BUILTIN_FEATURES: FeatureConfig[] = [
	highContrast,
	grayscale,
	pauseAnimations,
	fontSize,
	highlightLinks,
	textSpacing,
	lineHeight,
	dyslexiaFont,
	bigCursor
];
