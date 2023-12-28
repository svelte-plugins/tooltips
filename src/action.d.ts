import Tooltip from './action/action-tooltip.svelte';

interface TooltipProps {
  [key: string]: any;
}

interface TooltipActions {
  destroy(): void;
}

export function tooltip(
  element: HTMLElement,
  props: TooltipProps
): TooltipActions;
