---
layout: post
title: Basic overview of client - side templating

excerpt: Template rendering is very common on the web applications when we talk about back end development where technologies like Java, Ruby, PHP.. are using to render templates and show content/html, but lately about two or three years ago we could noticed that developers and companies are changing this using client side templating.
---

Template rendering is very common on the web applications when we talk about back end development where technologies like Java, Ruby, PHP.. are using to render templates and show content/html, but lately about two or three years ago we could noticed that developers and companies are changing this using client side templating.

## Server - Side templating (the common way)

So as I mentioned before back end technologies like Java, Ruby, PHP.. has being using templates to render content/HTML from the back to the the client side and this approach consists in literally render on the server using one of those technologies and through it into the client - side.

Two things are very clear to me. First we have to consume the server (imagine if you have to render lots of time), Second is the bandwidth request so the template and the data has to be downloaded into the client side (slow and request bandwidth).

## Client - Side templating (the new kid in the block?!)

The client side consists in removing the job of rendering on the back and adding the job to the client using Javascript that runs on each user's browser making faster web apps and adding more control for you at your end.

It has being very helpful for Single Page Applications where you can just update an section on your website without refresh the page or download assets all over again.

At start the client side template will use placeholders as content using it's own tags and after your JS download the JSON data another very known technology (fast and simple to read) the template will be rendered/compiled, the placeholders will be replaced to data from the JSON and lastly the HTML markup you be appended into the HTML element.

## Simple JSON data example

<pre><code data-language="json">
{
  "client": {
    "name": "Michael lancaster",
    "name": "John Due"
  },
  "occupation": {
    "description": "Front End Engineer",
    "description": "Jornalist"
  }
}
</code></pre>

This is very human readable right?!

## Simple Web app example

Here I'm using the Yahoo YQL API requesting the JSON data and rendering on the page using Handlebars.js with a little of logic.
You can check out and download the Web app here <a href="http://git.io/tUfHyA" title="Handlebars.js app" target="_blank">http://git.io/tUfHyA</a>

## Handlebars.js template markup example

<div class="fluidImg">
<img src="/assets/images/post-images/client-side.png" alt="Brazilian developers and Christian Heilmann">
</div>

<br/>

## App JS file

On my app.js file I requested the JSON data, replaced the template placeholders, rendered/compiled the template and appended into the HTML element.

<pre><code data-language="javascript">
function showNewsFromYahooAPI() {
  $.ajax({
        url: 'http://query.yahooapis.com/v1/public/yql?q=select%20title%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22&format=json&callback=',
        dataType: 'json'
    }).done(function(data){
      var
        query = data.query.results,
        source = $('#myTemplate').html(),
        compiledTemplate = Handlebars.compile(source),
        result = compiledTemplate(query);

      $('#content').html(result);
    });
}

$(function() {
    showNewsFromYahooAPI();
});
</code></pre>

## Who uses client side templating?!

- Linkedin (Dust.js)
- USAToday (Underscore.js)
- Walmart Mobile (Underscore.js)
- Hulu (Handlebars.js)
- Groupon (Mustache.js)
- And many, many others.

## Be aware of..

- Heavy rendering on the users side (devices are not that good as you think they are).
- Organization is king.
- There's logic-less and logic templates (ask yourself how complex is my template?).

## Some links to client side template

<a href="http://handlebarsjs.com/" title="Handlebarsjs" target="_blank">http://handlebarsjs.com/</a>
  <br>
<a href="http://mustache.github.io/" title="Mustachejs" target="_blank">http://mustache.github.io/</a>
  <br>
<a href="http://akdubya.github.io/dustjs/" title="Dustjs" target="_blank">http://akdubya.github.io/dustjs/</a>
  <br>
<a href="http://documentcloud.github.io/underscore/#template" title="Underscorejs" target="_blank">http://documentcloud.github.io/underscore/#template</a>
  <br>
<a href="https://github.com/jquery/jquery-tmpl" title="jQuery tmpl" target="_blank">https://github.com/jquery/jquery-tmpl</a>
  <br>
and many others like Jade, Haml-js, Eco, etc.

## I suggest you read..

<p>
Smashing Magazine - Client-Side Templating <a href="http://coding.smashingmagazine.com/2012/12/05/client-side-templating/" title="Smashing magazine: client side templating" target="_blank">click here.</a>
    <br>
Leaving JSPs in the dust: moving LinkedIn to dust.js client-side templates <a href="http://engineering.linkedin.com/frontend/leaving-jsps-dust-moving-linkedin-dustjs-client-side-templates" title="Leaving JSPs in the dust: moving LinkedIn to dust.js client-side templates" target="_blank">click here.</a>
    <br>
The client-side templating throwdown: mustache, handlebars, dust.js, and more <a href="http://engineering.linkedin.com/frontend/client-side-templating-throwdown-mustache-handlebars-dustjs-and-more" title="The client-side templating throwdown: mustache, handlebars, dust.js, and more" target="_blank">click here.</a>

</p>

Cheers!






