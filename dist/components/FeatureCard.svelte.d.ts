import type { ThemeConfig } from '../types.js';
import type { Component } from 'svelte';
interface Props {
    id: string;
    label: string;
    icon?: Component;
    active?: boolean;
    theme: ThemeConfig;
    onToggle?: (id: string, active: boolean) => void;
}
declare const FeatureCard: Component<Props, {}, "">;
type FeatureCard = ReturnType<typeof FeatureCard>;
export default FeatureCard;
