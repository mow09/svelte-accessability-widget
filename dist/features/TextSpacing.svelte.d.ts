import type { FeatureConfig } from '../types.js';
export declare const config: FeatureConfig;
import type { ThemeConfig } from '../types.js';
interface Props {
    active: boolean;
    theme: ThemeConfig;
    onToggle: (id: string, active: boolean) => void;
}
declare const TextSpacing: import("svelte").Component<Props, {}, "">;
type TextSpacing = ReturnType<typeof TextSpacing>;
export default TextSpacing;
