import type { SvelteComponentTyped } from "svelte";

export interface ComponentProps {
  /**
   * @default ''
   */
  content?: string;

  /**
   * @default 'top'
   */
  position?: string;

  /**
   * @default 200
   */
  maxWidth?: number;

  /**
   * @default null
   */
  style?: undefined;

  /**
   * @default ''
   */
  theme?: string;

  /**
   * @default ''
   */
  animation?: string;

  /**
   * @default true
   */
  arrow?: boolean;

  /**
   * @default false
   */
  autoPosition?: boolean;
}

export default class Component extends SvelteComponentTyped<
  ComponentProps,
  Record<string, any>,
  { default: {} }
> {}
