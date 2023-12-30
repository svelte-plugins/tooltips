import { TooltipActionProps } from './action-tooltip';

interface ActionProps extends TooltipActionProps {
  /**
   * Whether to hide the tooltip when clicking outside.
   * Only works when action is set to 'click'.
   * @default false
   */
  hideOnClickOutside?: boolean;
}

interface TooltipActions {
  destroy(): void;
}

export function tooltip(
  element: HTMLElement,
  props: ActionProps
): TooltipActions;
