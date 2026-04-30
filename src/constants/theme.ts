/**
 * Design System Theme
 *
 * All color tokens are defined here for both light and dark modes.
 * Components should reference these tokens via `useTheme()` instead
 * of hardcoding hex values.
 *
 * Color palette inspired by the Stitch "Professional Expense Interface"
 * design system — Deep Indigo primary, Teal accent, and cool-toned neutrals.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // ─── Text ────────────────────────────────────────────
    text: '#0b1c30',
    textSecondary: '#47464f',
    textMuted: '#787680',
    textInverse: '#ffffff',

    // ─── Backgrounds ─────────────────────────────────────
    background: '#f8f9ff',
    backgroundElement: '#eaf1ff',
    backgroundSelected: '#dce9ff',
    backgroundCard: '#ffffff',

    // ─── Primary (Deep Indigo) ───────────────────────────
    primary: '#070235',
    primaryContainer: '#1e1b4b',
    primaryLight: '#c4c1fb',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#8683ba',

    // ─── Secondary (Teal) ────────────────────────────────
    secondary: '#006a61',
    secondaryContainer: '#86f2e4',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#006f66',

    // ─── Accent / Tertiary ───────────────────────────────
    accent: '#006a61',
    accentLight: '#86f2e4',

    // ─── Surface ─────────────────────────────────────────
    surface: '#f8f9ff',
    surfaceContainer: '#e5eeff',
    surfaceContainerHigh: '#dce9ff',
    surfaceContainerHighest: '#d3e4fe',
    surfaceTint: '#5b598c',
    onSurface: '#0b1c30',
    onSurfaceVariant: '#47464f',
    inverseSurface: '#213145',
    inverseOnSurface: '#eaf1ff',

    // ─── Semantic ────────────────────────────────────────
    error: '#ba1a1a',
    errorContainer: '#ffdad6',
    onError: '#ffffff',
    onErrorContainer: '#93000a',
    success: '#006a61',
    successContainer: '#86f2e4',

    // ─── Borders & Outlines ──────────────────────────────
    border: '#c8c5d0',
    outline: '#787680',
    outlineVariant: '#c8c5d0',

    // ─── Icons ───────────────────────────────────────────
    iconDefault: '#0b1c30',
    iconAccent: '#006a61',

    // ─── Progress / Charts ───────────────────────────────
    progressBackground: 'rgba(255, 255, 255, 0.2)',
    progressFill: '#86f2e4',
    progressFillGroup: '#006a61',
    progressBackgroundGroup: '#eaf1ff',

    // ─── Card overlays (for the balance card) ────────────
    cardOverlay: 'rgba(255, 255, 255, 0.1)',

    // ─── Shadows ─────────────────────────────────────────
    shadow: '#1e1b4b',
  },

  dark: {
    // ─── Text ────────────────────────────────────────────
    text: '#eaf1ff',
    textSecondary: '#c8c5d0',
    textMuted: '#787680',
    textInverse: '#0b1c30',

    // ─── Backgrounds ─────────────────────────────────────
    background: '#0f1218',
    backgroundElement: '#1c2030',
    backgroundSelected: '#2a2e40',
    backgroundCard: '#1c2030',

    // ─── Primary (Deep Indigo) ───────────────────────────
    primary: '#c4c1fb',
    primaryContainer: '#444173',
    primaryLight: '#e3dfff',
    onPrimary: '#181445',
    onPrimaryContainer: '#e3dfff',

    // ─── Secondary (Teal) ────────────────────────────────
    secondary: '#6bd8cb',
    secondaryContainer: '#005049',
    onSecondary: '#003733',
    onSecondaryContainer: '#89f5e7',

    // ─── Accent / Tertiary ───────────────────────────────
    accent: '#6bd8cb',
    accentLight: '#005049',

    // ─── Surface ─────────────────────────────────────────
    surface: '#0f1218',
    surfaceContainer: '#1c2030',
    surfaceContainerHigh: '#252940',
    surfaceContainerHighest: '#2e3250',
    surfaceTint: '#c4c1fb',
    onSurface: '#eaf1ff',
    onSurfaceVariant: '#c8c5d0',
    inverseSurface: '#eaf1ff',
    inverseOnSurface: '#213145',

    // ─── Semantic ────────────────────────────────────────
    error: '#ffb4ab',
    errorContainer: '#93000a',
    onError: '#690005',
    onErrorContainer: '#ffdad6',
    success: '#6bd8cb',
    successContainer: '#005049',

    // ─── Borders & Outlines ──────────────────────────────
    border: '#47464f',
    outline: '#787680',
    outlineVariant: '#47464f',

    // ─── Icons ───────────────────────────────────────────
    iconDefault: '#eaf1ff',
    iconAccent: '#6bd8cb',

    // ─── Progress / Charts ───────────────────────────────
    progressBackground: 'rgba(255, 255, 255, 0.15)',
    progressFill: '#6bd8cb',
    progressFillGroup: '#6bd8cb',
    progressBackgroundGroup: '#252940',

    // ─── Card overlays (for the balance card) ────────────
    cardOverlay: 'rgba(255, 255, 255, 0.08)',

    // ─── Shadows ─────────────────────────────────────────
    shadow: '#000000',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
