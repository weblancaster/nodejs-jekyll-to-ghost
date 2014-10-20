---
layout: post
title: What technologies I'm using to blog?!

excerpt: I needed a new look and like I said in my last (first) post I love to learn and experiment new things and at the same time I'm not very fan of Wordpress as a developer point of view.
---

I needed a new look and as I said in my last (first) post I love to learn and experiment new things and at the same time I'm not very fan of Wordpress as a developer point of view either. <br>
I agree it is a good CMS/Blog Tool that helps us delivery great products in short time for clients therefore it's good for business but Wordpress "themes" has a bunch of ugly, messy code and sometimes happens to be infected by other plugins/scripts causing headaches or even worst.

## Long story short

<p>
I started looking for something more elegant that I could use git to deploy
So I tried Github Pages and Jekyll a "blog-aware, static site generator in Ruby" that uses Liquid template to process the templates.
But I would do experiments with Node.js and Ruby someday so I choose <a href="http://www.heroku.com" title="Heroku" target="_blank">Heroku</a> (cloud application platform for build, deploy, and run cloud apps using Ruby, Node.js, Clojure, Java, Python and Scala).
</p>

I Can run and test locally, pretty simple.
<pre><code data-language="ruby">
foreman start
</code></pre>

And After see my changes I want to deploy directly to my cloud.

<pre><code data-language="ruby">
git add .
git commit -m "my message"
git push origin master
</code></pre>
Done! Beautiful! Everything up and running.

### In the Back-End
- Heroku Server (AWESOME cloud application platform).
- Ruby (Jekyll, liquid template).
- Git to deploy to my Heroku Cloud.

### In the Front-End
- HTML5 (Markup).
- CSS3 (SASS/COMPASS) Modular Development Based.
- Responsive Design.
- JS (jQuery).
- Markdown (Blogging).
- Disqus (comments).

I may do a better explanation how it works further on but for now I need some posts.