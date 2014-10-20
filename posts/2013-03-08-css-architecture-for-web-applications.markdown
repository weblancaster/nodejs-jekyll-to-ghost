---
layout: post
title: CSS Architecture for Web Applications.

excerpt: Write CSS is more complex than some developers, software engineers and designers think and If you are a "Dogma" "best practice" person this post might hurt your feelings.
---

Write CSS is more complex than some developers, software engineers and designers think and If you are a "Dogma" "best practice" person this post might hurt your feelings.

Bad CSS architecture can make Web applications slower (500ms slower = 20% drop in traffic for Google) <br> (100ms slower = 1% drop in sales for amazon), messy and unmaintainable for the team, waste of time trying to find something to fix another thing and the list goes on.

All the bad examples showed here for good or for bad I had the pleasure to work with in some project.

##The bad examples first

<pre><code data-language="css">
#header {
	property: value;
	property: value;
}

#logo {
	property: value;
	property: value;
}

#menu {
	property: value;
	property: value;
}

#search {
	property: value;
	property: value;
}

#bt-yellow {
	property: value;
	property: value;
}
</code></pre>

Yeah! people still doing this approach specifying "ID's" for every element on the page and that kind of architecture "id's" has no problem for browser rendering or for Javascript developers concerned about performance or make his life easier.

But as a point of view of good CSS architecture that's not DRY, reusable, modular, scalable and depending on the project this can get pretty messy and heavy. So, never do that way ok?!

##More bad examples

My second experience with a different way to write CSS architecture was when I worked as a consultant on a ongoing big Web Application. <br>
At this point the initial developers started kind of in a "good" way making like a mixed code between SMACSS and their own judgments. <br>

<pre><code data-language="css">
ul.button-group-yellow {
	property: value;
	property: value;
}

ul.button-group-yellow li {
	property: value;
	property: value;
}

ul.button-group-yellow li div {
	property: value;
	property: value;
}

ul.button-group-yellow li div p {
	property: value;
	property: value;
}

ul.button-group-yellow li div p a {
	property: value;
	property: value;
}
</code></pre>

I confess we had a bunch of modular groups forcing DRY methodology but look at those terrible long descendants selectors (nesting), tag-qualify and this approach is very bad for browser rendering/performance, not scalable and gets/got pretty messy after all.

##Some good tips
- All members has to work together but this is not a job for Designers, Software engineers. This is a job Front End Engineers.
- CSS is code therefore size and rendering matters.
- Avoid specificity "ID's".
- Avoid long descendants selectors (nesting).
- Avoid tag-qualify.
- Browsers render your CSS going right to left.

<pre><code data-language="css">
#header div ul li p a {
	/* the browser render/algorithm go through all your elements starting at "a" element to find the matches */
	property: value;
	property: value;
}

#header a {
	/* better than the first example */
	/* but still not good enough */
	property: value;
	property: value;
}

header#header {
	/* yet not good. tag-qualify is very very hard to happen to actually use them */
	property: value;
	property: value;
}

#header {
	/* good for performance but not good for modular, DRY, scalable */
	property: value;
	property: value;
}

/* if you need to qualify your selector use quasi tag-qualify methodology */
/* header */ .header {
	/* always prefer/use classes they are fast, reusable, scalable, modular, easy to maintain */
	property: value;
	property: value;
}
</code></pre>

- Use DRY (don't repeat yourself methodology), modular groups, scalable, readable and maintainable.
- Make it well documented (readable for humans not machines).
- Use CSS preprocessors (It doesn't mean you are going to have a good CSS architecture).
- More developers = more problems so write a Doc & Stylesheets guide for your team.
- Comments are KING. They wont be there afterwards because you will minify so use wisely.
- Find the patterns in your design and apply OOCSS method (works great for me).
- Rule sets in specific order (example how I do it below).

<pre><code data-language="css">
/* ==========================================================================
#   SCSS/COMPASS Modular Project Based.
# 	@settings ( COMPASS, Variables, Functions, Mixins, etc... )
# 	@base ( regular elements )
# 	@helpers ( layout helpers )
# 	@layout ( layout template, grid structure )
# 	@skin ( modules, background, colors, typography.. )
# 	@media-queries ( content-driven breakpoints )
# 	@ie ( IE fixes )
========================================================================== */


/* ==========================================================================
@settings
========================================================================== */
@import "_settings";

/* ==========================================================================
@base
========================================================================== */
@import "_base";

/* ==========================================================================
@helpers
========================================================================== */
@import "_helpers";

/* ==========================================================================
@layout
========================================================================== */
@import "_layout";

/* ==========================================================================
@skin
========================================================================== */
@import "_skin";

/* ==========================================================================
@media-queries
========================================================================== */
@import "_media-queries";

/* ==========================================================================
@ie
========================================================================== */
@import "_ie";
</code></pre>

##Another great tips. From BEM methodology

- Fast-to-develop, long-lived projects. It should be possible to develop and launch the first version of a website quickly with an architecture that helps to maintain it in the long run.
- Team scalability. Adding new people to a product team should improve speed, not decrease it. We need to be able to assign new members to a team without a steep learning curve.
- Code should be well-structured for a project to remain maintainable over time and team changes.
- Code reuse. To maintain UI consistency and minimize development effort on typical interface components, those components have to be easily reusable. The source code should not have contextual dependency on the other code, it should be easy to move that code to another place.


##Our fashionable way

I always had concern about my classes notation name, how should I name semantically meaningful? how should I show this on the HTML? How I will better transfer/show by notation name my HTML structure?.. <br>
<strong>One of the most important ideas of classes notation name is try to transfer/show the HTML structure reading the classes names on the CSS file</strong>

Example, Let's say we have one module.

<pre><code data-language="css">
.promo-box {
	property: value;
}
.promo-box-inner {
	property: value;
}
.promo-box-img {
	property: value;
}
.promo-box-tit {
	property: value;
}
.promo-box-txt {
	property: value;
}
</code></pre>

I even don't need to show you the HTML markup to make you understand the HTML structure, can you see the possibilities here?!

##I'm changing to..

One week before I write this post I saw the speak of <a href="http://nicolasgallagher.com/" target="_blank" title="">Nicolas Gallagher</a> about "Questioning good practices" (I highly recommend) in his speak he also showed a <a href="http://www.yandex.com/" target="_blank" title="Russian Search engine">Russian Search engine</a> classes notation name and It's true my notation is fashionable at the moment.

All made sense. So now on I will use this non-fashionable YET classes notation name but answering the same questions I told you before.<br>
what are you talking about Michael? Here's a new example of that module above.

<pre><code data-language="css">
.promoBox {
	property: value;
}
.promoBox-inner {
	property: value;
}
.promoBox-inner-img {
	property: value;
}
.promoBox-inner-tit {
	property: value;
}
.promoBox-inner-txt {
	property: value;
}

.promoBox--round {
	property: value;
}
</code></pre>

Here we have our module "promoBox", the "promoBox-inner" with one dash means it is a child of "promoBox", the "promoBox-inner-img" means it is child of "promoBox-inner" that it is child of "promoBox" and so on. <br>
Lastly we have "promoBox--round" with two dashes that means extended/modifier. Beautiful right?!

##Final thoughts

There's no absolute way to write, give classes name notation or build "The god master CSS architecture" but there's definitely great practices to make a great Web application and it all depends on your team and the focus on your Web application goals.





