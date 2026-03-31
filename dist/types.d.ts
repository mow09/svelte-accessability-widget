import type { Component } from 'svelte';
export type ThemePreset = 'indigo' | 'emerald' | 'rose' | 'slate' | 'violet' | 'amber';
export interface ThemeConfig {
    primary: string;
    primaryHover: string;
    primaryText: string;
    background: string;
    surface: string;
    text: string;
    border: string;
    muted: string;
}
export type FeatureSize = 'sm' | 'md' | 'lg';
export interface FeatureConfig {
    id: string;
    label: string;
    description?: string;
    icon?: Component;
    category?: string;
    size?: FeatureSize;
    css?: string;
}
export interface Labels {
    title?: string;
    subtitle?: string;
    close?: string;
    reset?: string;
    hideToolbar?: string;
    poweredBy?: string;
}
export type WidgetPosition = 'bottom-right' | 'bottom-left';
export interface WidgetProps {
    theme?: ThemePreset | Partial<ThemeConfig>;
    position?: WidgetPosition;
    darkMode?: boolean;
    persist?: boolean;
    showBranding?: boolean;
    labels?: Labels;
    features?: FeatureConfig[];
}
