export declare function formatVariableKey(str: string): string;

export declare function getMinWidth(
  element: HTMLElement,
  maxWidth: number
): number;

export declare function isElementInViewport(
  element: HTMLElement,
  container?: HTMLElement | null,
  position?: string
): boolean;

interface TooltipCoords {
  top: number;
  left: number;
}

export declare function computeTooltipPosition(
  containerRef: HTMLElement | null,
  tooltipRef: HTMLElement | null,
  position: string,
  coords: TooltipCoords
): TooltipCoords;

export declare function onClickOutside(
  node: HTMLElement,
  callback: () => void
): { destroy: () => void };
