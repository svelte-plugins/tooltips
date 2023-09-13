import Tooltip from './action-tooltip.svelte';

export const tooltip = (element, props) => {
  let component = null;
  let title = element.getAttribute('title');
  let action = props?.action || element.getAttribute('action') || 'hover';

  const config = {
    ...props,
    targetElement: element
  };

  if (title) {
    element.removeAttribute('title');
    config.content = title;
  }

  const onClick = () => {
    if (component) {
      onMouseLeave();
    } else {
      onMouseEnter();
    }
  };

  const onMouseEnter = () => {
    if (!component) {
      component = new Tooltip({
        target: element,
        props: config
      });
    }
  };

  const onMouseLeave = () => {
    if (component) {
      component.$destroy();
      component = null;
    }
  };

  const addListeners = () => {
    if (element !== null) {
      removeListeners();

      if (action === 'click') {
        element.addEventListener('click', onClick);
      } else {
        element.addEventListener('mouseenter', onMouseEnter);
        element.addEventListener('mouseleave', onMouseLeave);
      }
    }
  }

  const removeListeners = () => {
    if (element !== null) {
      element.removeEventListener('click', onClick);
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    }
  };

  addListeners();

  return {
    destroy() {
      removeListeners();

      if (title) {
        element.setAttribute('title', title);
      }
    }
  };
}
