declare module 'tooltip' {
  import { SvelteComponent } from 'svelte';
  import { HTMLAttributes } from 'svelte/elements';

  export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    action: 'hover' | 'click' | 'prop';
    align?: 'left' | 'right' | 'center';
    animation?: string;
    delay?: number;
    arrow?: boolean;
    autoPosition?: boolean;
    content?: string;
    maxWidth?: number;
    position?: 'bottom' | 'left' | 'right' | 'top';
    show?: boolean;
    style?: undefined;
    theme?: string;
  }

  export interface TooltipEvents {}

  export interface TooltipSlots {
    default: {};
  }

  export default class Tooltip extends SvelteComponent<
    TooltipProps,
    TooltipEvents,
    TooltipSlots
  > {}
}
