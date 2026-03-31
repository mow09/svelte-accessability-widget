export const presets = {
    indigo: {
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        primaryText: '#ffffff',
        background: '#ffffff',
        surface: '#f1f5f9',
        text: '#0f172a',
        border: '#e2e8f0',
        muted: '#64748b'
    },
    violet: {
        primary: '#8b5cf6',
        primaryHover: '#7c3aed',
        primaryText: '#ffffff',
        background: '#ffffff',
        surface: '#f5f3ff',
        text: '#0f172a',
        border: '#ede9fe',
        muted: '#6b7280'
    },
    emerald: {
        primary: '#10b981',
        primaryHover: '#059669',
        primaryText: '#ffffff',
        background: '#ffffff',
        surface: '#ecfdf5',
        text: '#0f172a',
        border: '#d1fae5',
        muted: '#6b7280'
    },
    rose: {
        primary: '#f43f5e',
        primaryHover: '#e11d48',
        primaryText: '#ffffff',
        background: '#ffffff',
        surface: '#fff1f2',
        text: '#0f172a',
        border: '#fecdd3',
        muted: '#6b7280'
    },
    amber: {
        primary: '#f59e0b',
        primaryHover: '#d97706',
        primaryText: '#ffffff',
        background: '#ffffff',
        surface: '#fffbeb',
        text: '#0f172a',
        border: '#fde68a',
        muted: '#6b7280'
    },
    slate: {
        primary: '#475569',
        primaryHover: '#334155',
        primaryText: '#ffffff',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#0f172a',
        border: '#e2e8f0',
        muted: '#94a3b8'
    }
};
export const darkOverrides = {
    background: '#1e293b',
    surface: '#0f172a',
    text: '#f1f5f9',
    border: '#334155',
    muted: '#94a3b8'
};
export function resolveTheme(theme, isDark) {
    const base = typeof theme === 'string'
        ? { ...presets[theme] }
        : { ...presets.indigo, ...(theme ?? {}) };
    if (isDark) {
        return { ...base, ...darkOverrides };
    }
    return base;
}
