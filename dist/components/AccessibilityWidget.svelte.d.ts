import type { Snippet } from 'svelte';
import type { ThemeConfig, ThemePreset, FeatureConfig, Labels, WidgetPosition } from '../types.js';
interface Props {
    theme?: ThemePreset | Partial<ThemeConfig>;
    position?: WidgetPosition;
    darkMode?: boolean;
    persist?: boolean;
    showBranding?: boolean;
    labels?: Labels;
    features?: FeatureConfig[];
    extra?: Snippet;
    branding?: Snippet;
}
declare const AccessibilityWidget: import("svelte").Component<Props, {}, "">;
type AccessibilityWidget = ReturnType<typeof AccessibilityWidget>;
export default AccessibilityWidget;
