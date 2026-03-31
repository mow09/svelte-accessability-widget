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
declare const FeatureRow: Component<Props, {}, "">;
type FeatureRow = ReturnType<typeof FeatureRow>;
export default FeatureRow;
