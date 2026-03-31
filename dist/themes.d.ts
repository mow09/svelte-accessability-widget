import type { ThemeConfig, ThemePreset } from './types.js';
export declare const presets: Record<ThemePreset, ThemeConfig>;
export declare const darkOverrides: Partial<ThemeConfig>;
export declare function resolveTheme(theme: ThemePreset | Partial<ThemeConfig> | undefined, isDark: boolean): ThemeConfig;
