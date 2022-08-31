<script>
  import { onMount, onDestroy } from 'svelte';
  import { formatVariableKey, isInViewport } from './helpers';
  import { inverse } from './constants';

  export let content = '';
  export let align = 'left';
  export let position = 'top';
  export let maxWidth = 200;
  export let style = null;
  export let theme = '';
  export let animation = '';
  export let arrow = true;
  export let autoPosition = false;

  let ref = null;
  let minWidth = 0;
  let component = null;

  onMount(() => {
    let delay = 0;

    if (ref !== null) {
      if (isComponent && !component) {
        component = new content.component({ target: ref, props: content.props });
      }

      const elementWidth = ref.getBoundingClientRect().width;
      const elementStyle = window.getComputedStyle(ref);
      const elementPaddingLeft = parseInt(elementStyle.getPropertyValue('padding-left'), 10);
      const elementPaddingRight = parseInt(elementStyle.getPropertyValue('padding-right'), 10);
      const elementPadding = elementPaddingLeft + elementPaddingRight;
      const contentWidth = elementWidth - elementPadding;

      minWidth = Math.round(Math.min(maxWidth, contentWidth));

      if (style && typeof style === 'object') {
        for (let prop in style) {
          const key = formatVariableKey(prop);
          const value = style[prop];

          ref.style.setProperty(`--tooltip-${key}`, value);
        }
      }
    }

    if (autoPosition && !isInViewport(ref)) {
      position = inverse[position];
      delay = 200;
    }

    setTimeout(() => ref.classList.add('show'), delay);
  });

  onDestroy(() => {
    if (component) {
      component.$destroy();
      component = null;
    }
  });

  $: isComponent = typeof content === 'object';
</script>

<div
  bind:this={ref}
  class="tooltip animation-{animation} {position} {theme}"
  class:arrowless={!arrow}
  style="min-width: {minWidth}px; max-width: {maxWidth}px; text-align: {align};"
>
  {#if !isComponent}
    {@html content}
  {/if}
</div>

<style>
  /*--------------------------*
   * Theme Variables
   *--------------------------*/

  :root {
    --tooltip-background-color: rgba(0, 0, 0, 0.9);
    --tooltip-border-radius: 4px;
    --tooltip-box-shadow: 0 1px 20px rgba(0, 0, 0, 0.25);
    --tooltip-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
      'Helvetica Neue', sans-serif;
    --tooltip-font-size: 14px;
    --tooltip-font-weight: 500;
    --tooltip-line-height: 1.25rem;
    --tooltip-color: #fff;
    --tooltip-offset-x: 12px;
    --tooltip-offset-y: 12px;
    --tooltip-padding: 12px;
    --tooltip-z-index: 100;
    --tooltip-arrow-size: 10px;
  }

  /*--------------------------*
   * Tooltip Styling
   *--------------------------*/

  .tooltip-container {
    position: relative;
  }

  .tooltip {
    background-color: var(--tooltip-background-color);
    box-shadow: var(--tooltip-box-shadow);
    border-radius: var(--tooltip-border-radius);
    color: var(--tooltip-color);
    opacity: 0;
    font-family: var(--tooltip-font-family);
    font-size: var(--tooltip-font-size);
    font-style: normal;
    font-weight: var(--tooltip-font-weight);
    line-height: var(--tooltip-line-height);
    padding: var(--tooltip-padding);
    position: absolute;
    text-align: left;
    visibility: hidden;
    white-space: nowrap;
    z-index: var(--tooltip-z-index);
  }

  .tooltip.show {
    opacity: 1;
    visibility: visible;
    white-space: normal;
  }

  .tooltip.bottom:after,
  .tooltip.left:after,
  .tooltip.right:after,
  .tooltip.top:after {
    border: var(--tooltip-arrow-size) solid var(--tooltip-background-color);
    content: ' ';
    position: absolute;
  }

  .tooltip.arrowless:after {
    border: 0 !important;
  }

  .tooltip.bottom {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(100% + var(--tooltip-offset-y)));
  }

  .tooltip.bottom:after {
    border-color: transparent transparent var(--tooltip-background-color);
    left: 50%;
    top: 0;
    transform: translate(-50%, -99%);
  }

  .tooltip.top {
    left: 50%;
    top: 0;
    transform: translate(-50%, calc(-100% - var(--tooltip-offset-y)));
  }

  .tooltip.top:after {
    border-color: var(--tooltip-background-color) transparent transparent transparent;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 99%);
  }

  .tooltip.left {
    left: 0;
    top: 50%;
    transform: translate(calc(-100% - var(--tooltip-offset-x)), -50%);
  }

  .tooltip.left:after {
    border-color: transparent transparent transparent var(--tooltip-background-color);
    right: 0;
    top: 50%;
    transform: translate(99%, -50%);
  }

  .tooltip.right {
    right: 0;
    top: 50%;
    transform: translate(calc(100% + var(--tooltip-offset-x)), -50%);
  }

  .tooltip.right:after {
    border-color: transparent var(--tooltip-background-color) transparent transparent;
    left: 0;
    top: 50%;
    transform: translate(-99%, -50%);
  }

  /*--------------------------*
   * CSS Animations
   *--------------------------*/

  /* Fade */

  .tooltip.animation-fade {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .tooltip.animation-fade.show {
    opacity: 1;
  }

  /* Slide */

  .tooltip.top.animation-slide {
    margin-top: 10px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, margin 0.3s ease-in-out;
  }

  .tooltip.top.animation-slide.show {
    margin-top: 0;
    opacity: 1;
  }

  .tooltip.bottom.animation-slide {
    margin-bottom: 20px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, margin 0.3s ease-in-out;
  }

  .tooltip.bottom.animation-slide.show {
    margin-bottom: 0;
    opacity: 1;
  }

  .tooltip.right.animation-slide {
    margin-right: 20px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, margin 0.3s ease-in-out;
  }

  .tooltip.right.animation-slide.show {
    margin-right: 0;
    opacity: 1;
  }

  .tooltip.left.animation-slide {
    margin-left: 20px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, margin 0.3s ease-in-out;
  }

  .tooltip.left.animation-slide.show {
    margin-left: 0;
    opacity: 1;
  }

  /* Puff */

  .tooltip.left.animation-puff {
    filter: blur(2px);
    opacity: 0;
    transform: translate(calc(-100% - var(--tooltip-offset-x)), -50%) scale(2, 2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .tooltip.left.animation-puff.show {
    filter: blur(0);
    opacity: 1;
    transform: translate(calc(-100% - var(--tooltip-offset-x)), -50%) scale(1, 1);
  }

  .tooltip.right.animation-puff {
    filter: blur(2px);
    opacity: 0;
    transform: translate(calc(100% + var(--tooltip-offset-x)), -50%) scale(2, 2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .tooltip.right.animation-puff.show {
    filter: blur(0);
    opacity: 1;
    transform: translate(calc(100% + var(--tooltip-offset-x)), -50%) scale(1, 1);
  }

  .tooltip.top.animation-puff {
    filter: blur(2px);
    opacity: 0;
    transform: translate(-50%, calc(-100% - var(--tooltip-offset-y))) scale(2, 2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .tooltip.top.animation-puff.show {
    filter: blur(0);
    opacity: 1;
    transform: translate(-50%, calc(-100% - var(--tooltip-offset-y))) scale(1, 1);
  }

  .tooltip.bottom.animation-puff {
    filter: blur(2px);
    opacity: 0;
    transform: translate(-50%, calc(100% + var(--tooltip-offset-y))) scale(2, 2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .tooltip.bottom.animation-puff.show {
    filter: blur(0);
    opacity: 1;
    transform: translate(-50%, calc(100% + var(--tooltip-offset-y))) scale(1, 1);
  }

  /* Bounce */

  .tooltip.left.animation-bounce {
    opacity: 0;
    transform: translate(calc(-100% - var(--tooltip-offset-x)), -50%) scale(1.2, 1.2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, transform 0.3s cubic-bezier(0.5, -1, 0.5, 3);
  }

  .tooltip.left.animation-bounce.show {
    opacity: 1;
    transform: translate(calc(-100% - var(--tooltip-offset-x)), -50%) scale(1, 1);
  }

  .tooltip.right.animation-bounce {
    opacity: 0;
    transform: translate(calc(100% + var(--tooltip-offset-x)), -50%) scale(1.2, 1.2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, transform 0.3s cubic-bezier(0.5, -1, 0.5, 3);
  }

  .tooltip.right.animation-bounce.show {
    opacity: 1;
    transform: translate(calc(100% + var(--tooltip-offset-x)), -50%) scale(1, 1);
  }

  .tooltip.top.animation-bounce {
    opacity: 0;
    transform: translate(-50%, calc(-100% - var(--tooltip-offset-y))) scale(1.2, 1.2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, transform 0.3s cubic-bezier(0.5, -1, 0.5, 3);
  }

  .tooltip.top.animation-bounce.show {
    opacity: 1;
    transform: translate(-50%, calc(-100% - var(--tooltip-offset-y))) scale(1, 1);
  }

  .tooltip.bottom.animation-bounce {
    opacity: 0;
    transform: translate(-50%, calc(100% + var(--tooltip-offset-y))) scale(1.2, 1.2);
    transform-origin: 50% 50%;
    transition: opacity 0.3s ease-in-out, transform 0.3s cubic-bezier(0.5, -1, 0.5, 3);
  }

  .tooltip.bottom.animation-bounce.show {
    opacity: 1;
    transform: translate(-50%, calc(100% + var(--tooltip-offset-y))) scale(1, 1);
  }
</style>
