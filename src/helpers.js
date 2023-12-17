export const formatVariableKey = (str) => {
  return str
    .replace(/-_$/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
};

export const getMinWidth = (element, maxWidth) => {
  const extraCharPadding = 2;
  const elementWidth = element.getBoundingClientRect().width + extraCharPadding;
  const elementStyle = window.getComputedStyle(element);
  const elementPaddingLeft = parseInt(elementStyle.getPropertyValue('padding-left'), 10);
  const elementPaddingRight = parseInt(elementStyle.getPropertyValue('padding-right'), 10);
  const elementPadding = elementPaddingLeft + elementPaddingRight;
  const contentWidth = elementWidth - elementPadding;

  return Math.round(Math.min(maxWidth, contentWidth || maxWidth));
};

export const isElementInViewport = (element, container = null, position) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  let isInsideViewport = (
    rect.bottom > 0 &&
    rect.top < viewportHeight &&
    rect.right > 0 &&
    rect.left < viewportWidth
  );

  if (container) {
    const containerRect = container.getBoundingClientRect();

    if (position === 'top' || position === 'bottom') {
      isInsideViewport = (
        (containerRect.bottom + containerRect.height) < viewportHeight &&
        containerRect.top < viewportHeight
      );
    } else {
      isInsideViewport = (
        (containerRect.right + containerRect.width) < viewportWidth &&
        containerRect.left < viewportWidth
      );
    }

    return isInsideViewport;
  }

  return isInsideViewport;
};

export const computeTooltipPosition = (containerRef, tooltipRef, position, coords) => {
  if (!containerRef || !tooltipRef) {
    return coords;
  }

  const containerRect = containerRef.getBoundingClientRect();
  let containerTop = containerRect.top;
  let containerLeft = containerRect.left;

  if (containerRef.offsetParent) {
    // If there is an offsetParent, the containerRef could already be positioned differently than we expect. In this case, the tooltip's absolute positioning will be relative to the offsetParent, so we should ensure we don't let the offsetParent's rect positioning influence the tooltip's.
    const parentRect = containerRef.offsetParent.getBoundingClientRect();
    containerTop -= parentRect.top;
    containerLeft -= parentRect.left;
  }

  const tooltipRect = tooltipRef.getBoundingClientRect();

  switch (position) {
    case 'top':
      coords.top = containerTop;
      coords.left = containerLeft + containerRect.width / 2;
      break;
    case 'bottom':
      coords.top = containerTop - tooltipRect.height;
      coords.left = containerLeft + containerRect.width / 2;
      break;
    case 'left':
      coords.left = containerLeft;
      coords.top = containerTop + containerRect.height / 2;
      break;
    case 'right':
      coords.left = containerRect.right - tooltipRect.width;
      coords.top = containerTop + containerRect.height / 2;
      break;
  }

  coords.top += window.scrollY;
  coords.left += window.scrollX;

  return coords;
};
