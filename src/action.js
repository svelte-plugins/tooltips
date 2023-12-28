import Tooltip from './action-tooltip.svelte';
import { onClickOutside } from './helpers';

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
      onHide();
    } else {
      onShow();
    }
  };

  const onShow = () => {
    if (!component) {
      component = new Tooltip({
        target: element,
        props: config
      });
    }
  };

  const onHide = () => {
    if (component) {
      component.$destroy();
      component = null;
    }
  };

  const addListeners = () => {
    if (element !== null) {
      removeListeners();

      if (config.show) {
        onShow();
      }

      if (action === 'click') {
        element.addEventListener('click', onClick);

        if (config.hideOnClickOutside) {
          onClickOutside(element, onHide);
        }
      }

      if (action === 'hover') {
        element.addEventListener('mouseenter', onShow);
        element.addEventListener('mouseleave', onHide);
      }
    }
  };

  const removeListeners = () => {
    if (element !== null) {
      element.removeEventListener('click', onClick);
      element.removeEventListener('mouseenter', onShow);
      element.removeEventListener('mouseleave', onHide);
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
};
