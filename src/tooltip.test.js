import { render } from '@testing-library/svelte';
import Tooltip from './tooltip.svelte';

describe('Components: Tooltip', () => {
  let TestHarness;

  beforeEach(() => {
    TestHarness = () =>
      render(Tooltip, {
        content: 'Hello World!'
      });
  });

  it('should render the component', () => {
    const { container } = TestHarness();
    expect(container).toMatchSnapshot();
  });
});
