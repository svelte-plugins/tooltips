# @svelte-plugins/tooltips

A simple tooltip action and component designed for Svelte.

Try it in the [Svelte REPL](https://svelte.dev/repl/e63e262a91834400aa567b9b0d20675a?version=3.49.0).

## Install

```bash
yarn add -D @svelte-plugins/tooltips

# or with NPM

npm i -D @svelte-plugins/tooltips
```

## Using the Tooltip component
```svelte
<script>
  import { Tooltip } from "@svelte-plugins/tooltips";
</script>

<Tooltip content="Hello world!">
 Check out my tooltip
</Tooltip>
```

## Using the Tooltip action

```svelte
<script>
  import { tooltip } from "@svelte-plugins/tooltips";
</script>

Checkout out my <u title="Hello World!" use:tooltip>tooltip</u>

Checkout out my <u use:tooltip={{ content: 'Hello World!' }}>tooltip</u>
```

## API

### Props
| Prop         | Description                                                         | Value                                           |
| :----------- | :------------------------------------------------------------------ | :---------------------------------------------- |
| content      | The string or object containing componentref and props              | `string` | `object` component (default: ``)     |
| arrow        | If `false`, the tooltip arrow will not be shown.                    | `boolean` (default: `true`)                     |
| animation    | The animation to apply to the tooltip                               | `string` (default: ``)                          |
| maxWidth     | The max allowable width of the tooltip content                      | `number` (default: `200`)                       |
| position     | The position where the tooltip should appear relative to its parent | `string` (default: `top`)                       |
| autoPosition | Adjust tooltip position if viewport clipping occurs                 | `string` (default: `false`)                     |

#### Using components as content
| Prop              | Description                                                    | Value                               |
| :-----------------| :------------------------------------------------------------- | :---------------------------------- |
| content.component | Svelte component                                               | `component` (default: `null`)       |
| content.props     | Any component propeties                                        | `object` (default: `null`)          |


```svelte
<script>
  import ComponentAsTooltip from './ComponentAsTooltip';
</script>

Checkout out my <span use:tooltip={{ content: { component: ComponentAsTooltip, props: { title: 'Hello World!' } } }}>tooltip</span>
```

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
