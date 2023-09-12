import type { SvelteComponentTyped } from 'svelte';

export interface ComponentProps {
  /**
   * The content of the tooltip.
   * @default ''
   */
  content?: string;

  /**
   * The position of the tooltip.
   * Allowed values are 'top', 'bottom', 'left' or 'right'.
   * @default 'top'
   */
  position?: string;

  /**
   * The maximum width of the tooltip.
   * @default 200
   */
  maxWidth?: number;

  /**
   * The style of the tooltip.
   * @default null
   */
  style?: undefined;

  /**
   * The theme of the tooltip.
   * @default ''
   */
  theme?: string;

  /**
   * The animation style of the tooltip.
   * @default ''
   */
  animation?: string;

  /**
   * Whether to show the arrow of the tooltip.
   * @default true
   */
  arrow?: boolean;

  /**
   * Whether to automatically position the tooltip.
   * @default false
   */
  autoPosition?: boolean;
}

export default class Component extends SvelteComponentTyped<
  ComponentProps,
  Record<string, any>,
  { default: {} }
> {}
