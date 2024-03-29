<script>
  import Prism from 'svelte-prismjs';
  import { Tooltip, tooltip } from '@svelte-plugins/tooltips';
  import ComponentAsContent from './content.svelte';

  let showTooltip = false;
  let autoHideTooltip = true;

  setTimeout(() => {
    autoHideTooltip = false;
  }, 5000);
</script>

<main>
  <section>
    <h1>
      @svelte-plugins/tooltips <a href="https://github.com/dysfunc">(dysfunc)</a
      >
    </h1>
    <p>A basic tooltip component written in Svelte.</p>
  </section>

  <hr />

  <h2>Examples using action</h2>

  <div class="example relative">
    <p>
      This tooltip should appear on the <u
        title="hello world!"
        action="click"
        use:tooltip>top</u
      >
      when clicked. The content for the tooltip is provided by the
      <code>title</code> attribute.
    </p>

    <Prism
      code={'<u title="hello world!" action="click" use:tooltip>top</u>'}
    />
  </div>

  <div class="example relative">
    <p>
      This tooltip should appear on the <i
        use:tooltip={{
          content:
            '<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>',
          position: 'top',
          animation: 'slide',
          arrow: false
        }}>top</i
      >.
    </p>

    <Prism
      code={"<i use:tooltip={{ content: '<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>', position: 'top', animation: 'slide', arrow: false }}>top</i>"}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the <b
        use:tooltip={{
          content: 'Whoa! I appear to the right.',
          hideOnClickOutside: true,
          action: 'click',
          position: 'right',
          theme: 'tooltip-theme',
          show: true
        }}>right</b
      > on load and when clicked. It will also hide itself once you click outside of the tooltip.
    </p>

    <Prism
      code={"<b use:tooltip={{ content: 'Whoa! I appear to the right.', position: 'right', action: 'click', theme: 'tooltip-theme' }}>right</b>"}
    />

    <p>This is also demonstrates the use of the <code>theme</code> property:</p>

    <Prism
      showLineNumbers={true}
      code={`
:global(.tooltip.tooltip-theme) {
  --tooltip-background-color: hotpink;
  --tooltip-box-shadow: 0 1px 8px pink;
}
`}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear on the <u
        use:tooltip={{
          content: 'Look at my awesome tooltip down here.',
          position: 'bottom',
          autoPosition: true,
          align: 'center',
          animation: 'slide'
        }}>bottom</u
      > with text centered and auto-positioning turned on.
    </p>

    <Prism
      code={"<u use:tooltip={{ content: 'Look at my awesome tooltip down here.', position: 'bottom', autoPosition: true, align: 'center', animation: 'slide' }}>bottom</u>"}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the <u
        use:tooltip={{
          content: 'I can even appear to the left - tada!',
          position: 'left',
          style: { backgroundColor: 'red' },
          animation: 'puff'
        }}>left</u
      >.
    </p>
    <Prism
      code={"<u use:tooltip={{ content: 'I can even appear to the left - tada!', position: 'left', style: { backgroundColor: 'red' }, animation: 'puff' }}>left</u>"}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the <u
        use:tooltip={{
          content: {
            component: ComponentAsContent,
            props: { title: 'Title from props' }
          },
          position: 'left',
          animation: 'slide',
          style: { backgroundColor: 'blue' }
        }}>left</u
      > and render the passed component as the tooltip content.
    </p>
    <Prism
      showLineNumbers={true}
      code={`
<script>
  import ComponentAsContent from './ComponentAsContent.svelte';
</script>

<u use:tooltip={{
  content: {
    component: ComponentAsContent,
    props: {
      title: 'Title from props'
    }
  },
  position: 'left',
  style: {
    backgroundColor: 'blue'
  }
}}>left</u>`}
    />
  </div>

  <hr />

  <h2>Examples using component</h2>

  <div class="example">
    This tooltip should appear on the <Tooltip
      content="hello world!"
      action="click"
      show={autoHideTooltip}><u>top</u></Tooltip
    > and use the content in the <code>title</code> attribute. It will auto-hide
    in 5 seconds.
  </div>

  <div class="example">
    This tooltip should appear on the <Tooltip
      content="<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>"
      position="top"
      animation="slide"
      arrow={false}><i>top</i></Tooltip
    > when you hover.
  </div>

  <div class="example">
    This tooltip should appear <Tooltip
      content="<b>Tooltip Top</b><p>This is an example of using the 'show' prop.</p>"
      position="top"
      animation="slide"
      bind:show={showTooltip}
      autoPosition
      arrow={false}
      action="prop">on top</Tooltip
    > when the show button is clicked
    <button on:click={() => (showTooltip = true)}>Show</button>
    <button on:click={() => (showTooltip = false)}>Hide</button>

    <Prism
      showLineNumbers={true}
      code={`

<script>
  import { Tooltip } from '@svelte-plugins/tooltips';

  let showTooltip = false;
</script>

<Tooltip
  content="<b>Tooltip Top</b><p>This is an example of using the 'show' prop.</p>"
  position="top"
  animation="slide"
  bind:show={showTooltip}
  autoPosition
  arrow={false}
  action="prop">
  Should show here
</Tooltip>

<button on:click={() => (showTooltip = true)}>Show</button>
<button on:click={() => (showTooltip = false)}>Hide</button>
`}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the
      <Tooltip
        content="Whoa! I appear to the right."
        position="right"
        action="click"
        hideOnClickOutside
        show={true}
        theme="tooltip-theme"
      >
        <b>right</b>
      </Tooltip>
      on load and when clicked. It will also hide itself once you click outside of the tooltip.
    </p>
    <Prism
      showLineNumbers={true}
      code={`
<Tooltip
  content="Whoa! I appear to the right."
  position="right"
  action="click"
  hideOnClickOutside
  show={true}
  theme="tooltip-theme">
  <b>right</b>
</Tooltip>
`}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear on the
      <Tooltip
        content="Look at my awesome tooltip down here."
        position="bottom"
        autoPosition
        align="center"
        animation="slide"
      >
        <u>bottom</u>
      </Tooltip>
      with text centered and auto-positioning turned on.
    </p>

    <Prism
      showLineNumbers={true}
      code={`
<Tooltip
  content="Look at my awesome tooltip down here."
  position="bottom"
  autoPosition
  align="center"
  animation="slide">
  <u>bottom</u>
</Tooltip>
`}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the
      <Tooltip
        content="I can even appear to the left - tada!"
        style={{ backgroundColor: 'red' }}
        animation="puff"
        position="left"><u>left</u>.</Tooltip
      >
    </p>
    <Prism
      showLineNumbers={true}
      code={`
<Tooltip
  content="I can even appear to the left - tada!"
   style={{ backgroundColor: 'red' }}
   animation="puff"
   position="left">
   <u>left</u>
</Tooltip>
`}
    />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the
      <Tooltip
        content={{
          component: ComponentAsContent,
          props: { title: 'Title from props' }
        }}
        style={{ backgroundColor: 'blue' }}
        animation="slide"
        position="left"
        ><u>left</u>
      </Tooltip>
      and render the passed component as the tooltip content.
    </p>
    <Prism
      showLineNumbers={true}
      code={`
<Tooltip
  content={{ component: ComponentAsContent, props: { title: 'Title from props' } }}
  style={{ backgroundColor: 'blue' }}
  animation="slide"
  position="left">
  <u>left</u>
</Tooltip>
`}
    />
  </div>

  <hr />

  <h2>Animations</h2>

  <div class="example">
    <p>
      This tooltip uses the <b
        title="Just another tooltip."
        use:tooltip={{ animation: 'fade' }}>Fade</b
      > animation.
    </p>
    <Prism
      code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'fade' }}>tooltip</b>"}
    />
  </div>
  <div class="example">
    <p>
      This tooltip uses the <b
        use:tooltip={{ content: 'Just another tooltip.', animation: 'slide' }}
        >Slide</b
      > animation.
    </p>
    <Prism
      code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide' }}>tooltip</b>"}
    />
  </div>
  <div class="example">
    <p>
      This tooltip uses the <b
        use:tooltip={{ content: 'Just another tooltip.', animation: 'puff' }}
        >Puff</b
      > animation.
    </p>
    <Prism
      code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'puff' }}>tooltip</b>"}
    />
  </div>

  <div class="example">
    <p>
      This tooltip uses the <b
        use:tooltip={{ content: 'Just another tooltip.', animation: 'bounce' }}
        >Bounce</b
      > animation.
    </p>
    <Prism
      code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'bounce' }}>tooltip</b>"}
    />
  </div>

  <div class="example">
    <p>
      Animations will follow the positioning of the <b
        use:tooltip={{
          content: 'Just another tooltip.',
          animation: 'slide',
          position: 'left'
        }}>tooltip</b
      >.
    </p>

    <Prism
      code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide', position: 'left' }}>tooltip</b>"}
    />
  </div>
</main>

<hr />

<main>
  <section>
    <h2>Playground</h2>
  </section>
  <div>
    <p class="relative-with-offset">
      Mouse over <strong
        use:tooltip={{ content: 'Hello world', position: 'left' }}>me</strong
      > to see a left positioned tooltip with relative offset parent
    </p>
  </div>
  <div class="relative-with-offset">
    <p>Mouse over</p>
    <strong use:tooltip={{ content: 'Hello world', position: 'bottom' }}
      >me</strong
    >
    <p>to see a bottom positioned tooltip with relative offset parent.</p>
  </div>
  <div class="relative-with-offset">
    <p>Mouse over</p>
    <strong
      class="absolute-child"
      use:tooltip={{ content: 'Hello world', position: 'top' }}>me</strong
    >
    <p>to see a top positioned tooltip.</p>
  </div>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <div class="relative-with-offset">
    <p>
      Mouse <strong
        class="absolute-child"
        use:tooltip={{ content: 'Hello world', position: 'right' }}>over</strong>
      this relative parent with absolute child.
    </p>
  </div>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
  <p>A bunch of paragraphs.</p>
</main>
<p>Mouse over <strong use:tooltip={{ content: 'Hello world', position: 'left' }}>me</strong> static tooltip element.</p>
<div class="relative-with-offset">
	<p>Mouse over <strong class="absolute-child" use:tooltip={{ content: 'Hello world', position: 'top' }}>me</strong> with relative offset parent and absolute child.</p>
</div>
<div class="relative-with-offset">
	<p>Mouse over</p>
	<strong class="absolute-child" use:tooltip={{ content: 'Hello world', position: 'bottom' }}>this</strong>
	<p>relative parent with offset and absolute child.</p>
</div>
<div class="relative-with-offset">
	<p>Mouse over</p>
	<strong class="absolute-child" use:tooltip={{ content: 'Hello world', position: 'right' }}>me</strong>
	<p>relative parent with offset and absolute child.</p>
</div>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<div class="relative">
	<p>Mouse over <strong class="absolute-child" use:tooltip={{ content: 'Hello world', position: 'right' }}>me</strong> with relative parent (no offset) and absolute child.</p>
</div>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<div>
  <p class="transform">
   Tooltip is using a CSS transform on the tooltip element - show <u
      title="hello world!"
      action="click"
      use:tooltip>top</u
    >
    when clicked. The content for the tooltip is provided by the
    <code>title</code> attribute.
  </p>
</div>

<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>

<div class="transform">
  <p>
    Tooltip parent is using a CSS transform - show <u
      title="hello world!"
      action="click"
      use:tooltip>top</u
    >
    when clicked. The content for the tooltip is provided by the
    <code>title</code> attribute.
  </p>
</div>

<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>

<div class="relative transform">
  <p>
    Tooltip parent is relative and using a CSS transform - show <u
      title="hello world!"
      action="click"
      use:tooltip>top</u
    >
    when clicked. The content for the tooltip is provided by the
    <code>title</code> attribute.
  </p>
</div>

<p>A bunch of paragraphs.</p>

<div class="transform" style="position: absolute; left: 300px;">
  <p>
    Tooltip parent is absolute and using a CSS transform - show <u
      title="hello world!"
      action="click"
      use:tooltip>top</u
    >
    when clicked. The content for the tooltip is provided by the
    <code>title</code> attribute.
  </p>
</div>

<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>
<p>A bunch of paragraphs.</p>

<style>
  main {
    padding: 60px;
  }

  code {
    background-color: #f0f0f0;
    border-radius: 3px;
    padding: 4px;
  }
  h1 {
    margin: 0;
    padding: 0;
  }

  hr {
    border: 0;
    border-bottom: 1px solid #ddd;
    height: 1px;
  }

  h1 {
    display: inline-block;
  }

  .example {
    margin-bottom: 40px;
  }

  .example.relative {
    position: relative;
  }

  .relative {
    position: relative;
  }

  .relative-with-offset {
    left: 100px;
    position: relative;
  }

  .transform {
    transform: translate(100px, 100px);
  }

  .absolute-child {
    position: absolute;
    left: 110px;
    top: -10px;
  }

  :global(.tooltip.tooltip-theme) {
    --tooltip-background-color: hotpink;
    --tooltip-box-shadow: 0 1px 8px pink;
  }
</style>
