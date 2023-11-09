import Tooltip from './action-tooltip.svelte';

export const tooltip = (element, props) => {
  let component = null;
  let title = element.getAttribute('title');
  let action = props?.action || element.getAttribute('action') || 'hover';

  if (title) {
    element.removeAttribute('title');

    props = {
      content: title,
      ...props
    }
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
        props
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

      if (action === 'click') {
        element.addEventListener('click', onClick);
      }

      if (action === 'hover') {
        element.addEventListener('mouseenter', onShow);
        element.addEventListener('mouseleave', onHide);
      }
    }
  }

  const removeListeners = () => {
    if (element !== null) {
      element.removeEventListener('click', onClick);
      element.removeEventListener('mouseenter', onShow);
      element.removeEventListener('mouseleave', onHide);
    }
  };

  addListeners();

  element.style.position = 'relative';

  if (props.show) {
    onShow();
  }

  return {
    destroy() {
      removeListeners();

      if (title) {
        element.setAttribute('title', title);
      }
    }
  };
}
