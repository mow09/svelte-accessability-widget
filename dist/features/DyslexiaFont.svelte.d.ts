import type { FeatureConfig } from '../types.js';
export declare const config: FeatureConfig;
import type { ThemeConfig } from '../types.js';
interface Props {
    active: boolean;
    theme: ThemeConfig;
    onToggle: (id: string, active: boolean) => void;
}
declare const DyslexiaFont: import("svelte").Component<Props, {}, "">;
type DyslexiaFont = ReturnType<typeof DyslexiaFont>;
export default DyslexiaFont;
