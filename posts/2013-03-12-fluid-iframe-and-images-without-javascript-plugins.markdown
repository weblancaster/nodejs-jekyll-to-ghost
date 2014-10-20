---
layout: post
title: Fluid iframe without use of javascript.

excerpt: Simple technique to make fluid iframes without use of javascript or plugins.
---

Simple technique to make fluid iframes without use of javascript or plugins. Using this technique we have more gains in performance and simplicity.

This is a technique of positioning a element inside of another using "position: absolute;" for the "child" and "position: relative;" for the "wrap".

(ps: Depending on your case I suggest you set height for images).

##HTML

<pre><code data-language="html">
<div class="fluidMedia">
	<iframe src="" frameborder="0"> </iframe>
</div>
</code></pre>

##CSS

<pre><code data-language="css">
.fluidMedia {
	position: relative;
	padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
	padding-top: 30px;
	height: 0;
	overflow: hidden;
}

.fluidMedia iframe {
	position: absolute;
	top: 0; 
	left: 0;
	width: 100%;
	height: 100%;
}
</code></pre>

Example <a href="/blog/secrets-of-lea-verou-css/" title="fluid iframe example">here</a>.

##Browser support

- IE 7+
- Firefox 3.6+
- Chrome 6+
- Safari 5+

You can know more about it on <a href="http://alistapart.com/article/creating-intrinsic-ratios-for-video" target="_blank" title="A List Apart">A List Apart</a> great article.

Cheers!