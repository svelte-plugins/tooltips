declare module 'tooltip' {
  import { SvelteComponent } from 'svelte';
  import { HTMLAttributes } from 'svelte/elements';

  export interface TooltipActionProps extends HTMLAttributes<HTMLDivElement> {
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
    targetElement?: HTMLElement | null;
    theme?: string;
  }

  export interface TooltipActionEvents {}

  export interface TooltipActionSlots {}

  export default class TooltipAction extends SvelteComponent<
    TooltipActionProps,
    TooltipActionEvents,
    TooltipActionSlots
  > {}
}
