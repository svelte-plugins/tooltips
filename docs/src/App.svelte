<script>
	import { Tooltip, tooltip } from '@svelte-plugins/tooltip';
	import ComponentAsContent from './ComponentAsContent.svelte';
</script>

<main>
	<section>
		<h1>@svelte-plugins/tooltips <a href="https://github.com/dysfunc">(dysfunc)</a></h1>
		<p>A basic tooltip component written in Svelte.</p>
	</section>

	<hr />

	<h2>Examples using action</h2>

	<div class="example">
		This tooltip should appear on the <u title="hello world!" use:tooltip>top</u> and use the content in the <code>title</code> attribute.
	</div>

	<div class="example">
		This tooltip should appear on the <i use:tooltip={{ content: '<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>', position: 'top', animation: 'slide', arrow: false }}>top</i>.
	</div>

	<div class="example">
		This tooltip should appear to the <b use:tooltip={{ content: 'Whoa! I appear to the right.', position: 'right', theme: 'tooltip-theme' }}>right</b>.
	</div>

	<div class="example">
		This tooltip should appear on the <u use:tooltip={{ content: 'Look at my awesome tooltip down here.', position: 'bottom', autoPosition: true, align: 'center', animation: 'slide' }}>bottom</u> with text centered and auto-positioning turned on.
	</div>

	<div class="example">
		This tooltip should appear to the <u use:tooltip={{ content: 'I can even appear to the left - tada!', position: 'left', style: { backgroundColor: 'red' }, animation: 'puff' }}>left</u>.
	</div>

	<div class="example">
		This tooltip should appear to the <u use:tooltip={{ content: { component: ComponentAsContent, props: { title: 'Title from props' }}, position: 'left', style: { backgroundColor: 'blue' } }}>left</u> and render the passed component as the tooltip content.
	</div>

	<hr />

	<h2>Examples using component</h2>

	<div class="example">
		This tooltip should appear on the <Tooltip content="hello world!"><u>top</u></Tooltip> and use the content in the <code>title</code> attribute.
	</div>

	<div class="example">
		This tooltip should appear on the <Tooltip content="<b>Tooltip Top</b><p>This is an example of using HTML and content wrapping.</p>" position="top" animation="slide" arrow={false}><i>top</i>.</Tooltip>
	</div>

	<div class="example">
		This tooltip should appear to the
		<Tooltip
		  content="Whoa! I appear to the right."
      position="right"
			theme="tooltip-theme">
			<b>right</b>.
		</Tooltip>
	</div>

	<div class="example">
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
	</div>

	<div class="example">
		This tooltip should appear to the
		<Tooltip content="I can even appear to the left - tada!" style={{ backgroundColor: 'red' }} animation="puff" position="left"><u>left</u>.
		</Tooltip>
	</div>

	<div class="example">
		This tooltip should appear to the
		<Tooltip
			content={{ component: ComponentAsContent, props: { title: 'Title from props' } }}
			style={{ backgroundColor: 'blue' }}
			animation="slide"
			position="left"><u>left</u>
		</Tooltip>
			and render the passed component as the tooltip content.
	</div>

	<hr />

	<h2>Animations</h2>

	<div class="example">
		This tooltip uses the <b title="Just another tooltip." use:tooltip={{ animation: 'fade' }}>Fade</b> animation. <code>animation: 'fade'</code>
	</div>
	<div class="example">
		This tooltip uses the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide' }}>Slide</b> animation. <code>animation: 'slide'</code>
	</div>
	<div class="example">
		This tooltip uses the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'puff', maxWidth: 140 }}>Puff</b> animation. <code>animation: 'puff'</code>
	</div>

	<div class="example">
		This tooltip uses the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'bounce', maxWidth: 140 }}>Bounce</b> animation.	<code>animation: 'bounce'</code>
	</div>

	<div class="example">
		Animations will follow the positioning <code>(left, right, top, bottom)</code> of the <b use:tooltip={{ content: 'Just another tooltip.', animation: 'slide', position: 'left' }}>tooltip</b>.
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
