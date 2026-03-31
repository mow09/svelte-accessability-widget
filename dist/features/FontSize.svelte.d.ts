import type { FeatureConfig } from '../types.js';
export declare const FONT_SIZE_SIZES: number[];
export declare const config: FeatureConfig;
import type { ThemeConfig } from '../types.js';
interface Props {
    active: boolean;
    theme: ThemeConfig;
    onToggle: (id: string, active: boolean) => void;
}
declare const FontSize: import("svelte").Component<Props, {}, "">;
type FontSize = ReturnType<typeof FontSize>;
export default FontSize;
