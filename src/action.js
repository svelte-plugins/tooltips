import Tooltip from './action-tooltip.svelte';

export const tooltip = (element, props) => {

	let component = null;
	let title = element.getAttribute('title');

	if (title) {
		element.removeAttribute('title');

		props = {
			content: title,
			...props
		}
	}

	const onMouseEnter = () => {
		if (!component) {
			component = new Tooltip({
				target: element,
				props
			});
		}
	};

	const onMouseLeave = () => {
		if (component) {
			component.$destroy();
			component = null;
		}
	};

	element.addEventListener('mouseenter', onMouseEnter);
	element.addEventListener('mouseleave', onMouseLeave);
	element.style.position = 'relative';

	return {
		destroy() {
			element.removeEventListener('mouseenter', onMouseEnter);
			element.removeEventListener('mouseleave', onMouseLeave);

			if (title) {
				element.setAttribute('title', title);
			}
		}
	};
}
