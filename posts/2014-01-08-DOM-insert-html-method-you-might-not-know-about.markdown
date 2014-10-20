---
layout: post
title: DOM insert HTML method you might not know

excerpt: Everybody knows/use "innerHTML" to insert HTML but I was looking at the MDN website jumping between Web API's I did not know and one of them got my attention it's called insertAdjacentHTML..
---

Everybody knows/use "innerHTML" to insert HTML but I was looking at the MDN website jumping between Web
API's when I saw this DOM method called insertAdjacentHTML..it's "innerHTML" brothers but cooler and
<strong>faster</strong>.
<br>
Besides the performance another difference is that "innerHTML" will overwrite the content inside the element when
"insertAdjacentHTML" will add to the specified position.

Here you can compare the performance between "innerHTML" and "insertAdjacentHTML" <a href="http://jsperf
.com/insertadjacenthtml-perf/3" target="_blank" title="innerHTML vs insertAdjacentHTMl">here</a> and gets better
its <strong>supported in all browsers</strong>.

It's been out there for a while now even John Resig has an <a href="http://ejohn.org/blog/dom-insertadjacenthtml/"
target="_blank" title="insertAdjacentHTML post John Resig">post</a> about it back in 2008.

It's very simple to use you are going to need to pass one of the positions (below) and then pass the content.

#### Position
- "beforebegin" (insert before the element)
- "afterend" (insert after the element)
- "afterbegin" (insert inside element after begin)
- "beforeend" (insert inside element before end)

<pre><code data-language="javascript">
element.insertAdjacentHTML("position", "content");
</code></pre>

Let's say we have a method that do the job for us when we pass the "position" and "content".

<pre><code data-language="javascript">
(function(window) {
	window.App = window.App || {};

	window.App = {
		insertElement: function(position, content) {
			var elDiv = document.getElementById('wrapper');
				elDiv.insertAdjacentHTML(position, content)
		}
	}
})(window);

var content1 = '<p id="ct1">this is a paragrag a "beforebegin" element</p>';
var content2 = '<p id="ct2">this is a paragrag a "afterbegin" element</p>';
var content3 = '<p id="ct3">this is a paragrag a "beforeend" element</p>';
var content4 = '<p id="ct4">this is a paragrag a "afterend" element</p>';

App.insertElement('beforebegin', content1);
App.insertElement('afterbegin', content2);
App.insertElement('beforeend', content3);
App.insertElement('afterend', content4);
</code></pre>

Here's a example how it works <a href="http://jsfiddle.net/ftZyn/2/" target="_blank" title="how insertAdjacentHTMl works">link</a>.

Enjoy the tip.