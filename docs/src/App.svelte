<script>
  import Prism from 'svelte-prismjs';
  import { Tooltip, tooltip } from '@svelte-plugins/tooltips';
  import ComponentAsContent from './content.svelte';

  let showTooltip = false;
</script>

<main>
  <section>
    <h1>@svelte-plugins/tooltips <a href="https://github.com/dysfunc">(dysfunc)</a></h1>
    <p>A basic tooltip component written in Svelte.</p>
  </section>

  <hr />

   <h2>Examples using action</h2>

  <div class="example">
    <p>This tooltip should appear on the <u title="hello world!" action="click"  use:tooltip>top</u> when clicked. The content for the tooltip is provided by the <code>title</code> attribute.</p>

    <Prism code={'<u title="hello world!" action="click" use:tooltip>top</u>'} />
  </div>

  <div class="example">
    <p>This tooltip should appear on the <i use:tooltip={{ content: '<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>', position: 'top', animation: 'slide', arrow: false }}>top</i>.</p>

    <Prism code={"<i use:tooltip={{ content: '<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>', position: 'top', animation: 'slide', arrow: false }}>top</i>"} />
  </div>

  <div class="example">
    <p>This tooltip should appear to the <b use:tooltip={{ content: 'Whoa! I appear to the right.', action: 'click', position: 'right', theme: 'tooltip-theme' }}>right</b> when clicked.</p>

    <Prism code={"<b use:tooltip={{ content: 'Whoa! I appear to the right.', position: 'right', action: 'click', theme: 'tooltip-theme' }}>right</b>"} />

    <p>This is also demonstrates the use of the <code>theme</code> property:</p>

     <Prism showLineNumbers={true} code={
     `
:global(.tooltip.tooltip-theme) {
  --tooltip-background-color: hotpink;
  --tooltip-box-shadow: 0 1px 8px pink;
}
`} />
  </div>

  <div class="example">
    <p>This tooltip should appear on the <u use:tooltip={{ content: 'Look at my awesome tooltip down here.', position: 'bottom', autoPosition: true, align: 'center', animation: 'slide' }}>bottom</u> with text centered and auto-positioning turned on.</p>

    <Prism code={"<u use:tooltip={{ content: 'Look at my awesome tooltip down here.', position: 'bottom', autoPosition: true, align: 'center', animation: 'slide' }}>bottom</u>"} />
  </div>

  <div class="example">
    <p>This tooltip should appear to the <u use:tooltip={{ content: 'I can even appear to the left - tada!', position: 'left', style: { backgroundColor: 'red' }, animation: 'puff' }}>left</u>.</p>
    <Prism code={"<u use:tooltip={{ content: 'I can even appear to the left - tada!', position: 'left', style: { backgroundColor: 'red' }, animation: 'puff' }}>left</u>"} />
  </div>

  <div class="example">
    <p>This tooltip should appear to the <u use:tooltip={{ content: { component: ComponentAsContent, props: { title: 'Title from props' }}, position: 'left', animation: 'slide', style: { backgroundColor: 'blue' } }}>left</u> and render the passed component as the tooltip content.</p>
    <Prism showLineNumbers={true} code={`
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
}}>left</u>`} />
  </div>

  <hr />

  <h2>Examples using component</h2>

  <div class="example">
    This tooltip should appear on the <Tooltip content="hello world!"><u>top</u></Tooltip> and use the content in the <code>title</code> attribute.
  </div>

  <div class="example">
    This tooltip should appear on the <Tooltip content="<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>" position="top" animation="slide" arrow={false}><i>top</i></Tooltip> when you hover.
  </div>

  <div class="example">
    This tooltip should appear <Tooltip content="<b>Tooltip Top</b><p>This is an example of using the 'show' prop.</p>" position="top" animation="slide" bind:show={showTooltip} autoPosition arrow={false} action="prop">on top</Tooltip> when the show button is clicked
      <button on:click={() => (showTooltip = true)}>Show</button>
      <button on:click={() => (showTooltip = false)}>Hide</button>

  <Prism showLineNumbers={true} code={`

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
`} />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the
      <Tooltip
        content="Whoa! I appear to the right."
        position="right"
        action="click"
        theme="tooltip-theme">
        <b>right</b>
      </Tooltip>
      when clicked.
    </p>
    <Prism showLineNumbers={true} code={`
<Tooltip
  content="Whoa! I appear to the right."
  position="right"
  action="click"
  theme="tooltip-theme">
  <b>right</b>
</Tooltip>
`} />
  </div>

  <div class="example">
    <p>
      This tooltip should appear on the
      <Tooltip
        content="Look at my awesome tooltip down here."
        position="bottom"
        autoPosition
        align="center"
        animation="slide">
        <u>bottom</u>
      </Tooltip>
      with text centered and auto-positioning turned on.
    </p>

    <Prism showLineNumbers={true} code={`
<Tooltip
  content="Look at my awesome tooltip down here."
  position="bottom"
  autoPosition
  align="center"
  animation="slide">
  <u>bottom</u>
</Tooltip>
`} />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the
      <Tooltip content="I can even appear to the left - tada!" style={{ backgroundColor: 'red' }} animation="puff" position="left"><u>left</u>.</Tooltip>
    </p>
    <Prism showLineNumbers={true} code={`
<Tooltip
  content="I can even appear to the left - tada!"
   style={{ backgroundColor: 'red' }}
   animation="puff"
   position="left">
   <u>left</u>
</Tooltip>
`} />
  </div>

  <div class="example">
    <p>
      This tooltip should appear to the
      <Tooltip
        content={{ component: ComponentAsContent, props: { title: 'Title from props' } }}
        style={{ backgroundColor: 'blue' }}
        animation="slide"
        position="left"><u>left</u>
      </Tooltip>
      and render the passed component as the tooltip content.
    </p>
    <Prism showLineNumbers={true} code={`
<Tooltip
  content={{ component: ComponentAsContent, props: { title: 'Title from props' } }}
  style={{ backgroundColor: 'blue' }}
  animation="slide"
  position="left">
  <u>left</u>
</Tooltip>
`} />
  </div>

  <hr />

  <h2>Animations</h2>

  <div class="example">
    <p>This tooltip uses the <b title="Just another tooltip." use:tooltip={{ animation: 'fade' }}>Fade</b> animation.</p>
    <Prism code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'fade' }}>tooltip</b>"} />
  </div>
  <div class="example">
    <p>This tooltip uses the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide' }}>Slide</b> animation.</p>
    <Prism code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide' }}>tooltip</b>"} />
  </div>
  <div class="example">
    <p>This tooltip uses the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'puff' }}>Puff</b> animation.</p>
    <Prism code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'puff' }}>tooltip</b>"} />
  </div>

  <div class="example">
    <p>This tooltip uses the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'bounce' }}>Bounce</b> animation.</p>
    <Prism code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'bounce' }}>tooltip</b>"} />
  </div>

  <div class="example">
    <p>Animations will follow the positioning of the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide', position: 'left' }}>tooltip</b>.</p>

    <Prism code={"<b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide', position: 'left' }}>tooltip</b>"} />
  </div>
</main>

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

  :global(.tooltip.tooltip-theme) {
    --tooltip-background-color: hotpink;
    --tooltip-box-shadow: 0 1px 8px pink;
  }
</style>
