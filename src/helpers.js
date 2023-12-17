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

  let isInsideViewport = rect.bottom > 0 && rect.top < viewportHeight && rect.right > 0 && rect.left < viewportWidth;

  if (container) {
    const containerRect = container.getBoundingClientRect();

    if (position === 'top' || position === 'bottom') {
      isInsideViewport =
        containerRect.bottom + containerRect.height < viewportHeight && containerRect.top < viewportHeight;
    } else {
      isInsideViewport =
        containerRect.right + containerRect.width < viewportWidth && containerRect.left < viewportWidth;
    }

    return isInsideViewport;
  }

  return isInsideViewport;
};

export const computeTooltipPosition = (containerRef, tooltipRef, position, coords) => {
  if (!containerRef || !tooltipRef) {
    return coords;
  }

  let cumulativeOffsetTop = 0;
  let cumulativeOffsetLeft = 0;

  let fixedOffsetTop = 0;
  let stickyOffsetTop = 0;
  let fixedOffsetLeft = 0;

  let currentElement = containerRef;

  while (currentElement !== document.body) {
    const computedStyle = window.getComputedStyle(currentElement);
    const elementPosition = computedStyle.position;

    if (elementPosition === 'fixed') {
      fixedOffsetTop += currentElement.getBoundingClientRect().top + window.scrollY;
      fixedOffsetLeft += currentElement.getBoundingClientRect().left + window.scrollX;
    } else if (elementPosition === 'sticky') {
      stickyOffsetTop += currentElement.getBoundingClientRect().top;
      fixedOffsetLeft += currentElement.getBoundingClientRect().left + window.scrollX;
    } else if (elementPosition === 'absolute' || elementPosition === 'relative') {
      cumulativeOffsetTop -= parseFloat(computedStyle.top) || 0;
      cumulativeOffsetLeft -= parseFloat(computedStyle.left) || 0;
    }

    currentElement = currentElement.parentElement;
  }

  const containerRect = containerRef.getBoundingClientRect();
  const tooltipRect = tooltipRef.getBoundingClientRect();

  let finalTop = containerRect.top + cumulativeOffsetTop + stickyOffsetTop - fixedOffsetTop;
  let finalLeft = containerRect.left + cumulativeOffsetLeft - fixedOffsetLeft;

  switch (position) {
    case 'top':
      coords.top = finalTop;
      coords.left = finalLeft + containerRect.width / 2;
      break;
    case 'bottom':
      coords.top = finalTop - tooltipRect.height;
      coords.left = finalLeft + containerRect.width / 2;
      break;
    case 'left':
      coords.left = finalLeft;
      coords.top = finalTop + containerRect.height / 2;
      break;
    case 'right':
      coords.left = finalLeft + containerRect.width - tooltipRect.width;
      coords.top = finalTop + containerRect.height / 2;
      break;
  }

  coords.top += window.scrollY;
  coords.left += window.scrollX;

  return coords;
};
