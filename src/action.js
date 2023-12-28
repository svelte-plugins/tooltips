import Tooltip from './action-tooltip.svelte';

export const tooltip = (element, props) => {
  let component = null;
  let title = element.getAttribute('title');
  let action = props?.action || element.getAttribute('action') || 'hover';

  const detect = ({ target }) => {
    if (target && !target.classList.contains('tooltip')) {
      onHide();
    }
  };

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
      if (
        action !== 'click' ||
        (action === 'click' && !config.hideOnClickOutside)
      ) {
        onHide();
      }
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
          document.addEventListener('click', detect, {
            passive: true,
            capture: true
          });
        }
      }

      if (action === 'hover') {
        element.addEventListener('mouseenter', onShow);
        element.addEventListener('mouseleave', onHide);
      }
    }
  };

  const removeListeners = () => {
    if (config.hideOnClickOutside) {
      document.removeEventListener('click', detect);
    }

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
