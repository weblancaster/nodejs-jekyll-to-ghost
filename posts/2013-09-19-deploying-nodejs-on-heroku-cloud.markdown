---
layout: post
title: Deploying Node.js server on Heroku Cloud

excerpt: As a developer I have been always curious to learn and try new technologies that can improve my skill and help me build better Web Applications..So today I'm going to try help you set up a simple Node.js server on Heroku Cloud using my small open source project aims deploy even faster Node.js applications.
---

[post under improvements]

As a developer I have been always curious to learn and try new technologies that can improve my skill and help me build better Web Applications..So today I'm going to try help you set up a simple Node.js server on Heroku Cloud using my small open source project aims deploy even faster Node.js applications.

## Why Heroku

<a href="http://www.heroku.com" target=""_blank title="">Heroku</a> is a cloud application platform where you can build and deploy web apps
with the technologies you know as Java, Ruby, Closure, Node.js, Python and Scala..Heroku uses integration with Git so you can deploy your Application
simply pushing to master. Oh and It's FREE!

I have four web apps hosted on heroku but two are for public access this blog/portfolio running on Ruby and Lollagram running on Node.js.

## Why Node.js

It's Javascript...on the Server!

<iframe src="http://giphy.com/embed/13k1e8OMVO2a3K" frameBorder="0" allowFullScreen="allowFullScreen"></iframe>

<br>

No, But seriously. Javascript is well known by us Front End Developers/Engineers and even designers. <br>
That's already one good reason but the main "real" reasons are Node.js is all about making event-driven (Ajax can be done on the server side), low-latency, non-blocking I/O...perfect for real time. <br>
Node.js makes a much smaller footprint on your web server It allocates web server resources on an as-needed basis, not pre-allocating a large chunk of resources for each user. For example, Apache might assign 8MB to a user, while Node assigns 8KB.

## Heroku set up

I'm going to assume you have account on Heroku (it's free) and the <a href="https://toolbelt.heroku.com/" title="toolbelt kit" target="_blank">toolbelt kit</a> installed and you also have <a href="http://Nodejs.org/" title="Node.js" target="_blank">Node.js</a> installed.

## Let's get it start

First of all (after everything installed) create a new folder (whatever-name-you-want) then open your terminal go to your folder and type..

<pre><code data-language="ruby">
git init
</code></pre>

then

<pre><code data-language="ruby">
git add .
</code></pre>

then

<pre><code data-language="ruby">
git commit -m "first commit"
</code></pre>

Now you have git initialized..time to create a Heroku app. <br>
First thing you need to login to Heroku (remember that we are doing everything from the command line on terminal)

<pre><code data-language="ruby">
heroku login
</code></pre>

<pre><code data-language="ruby">
heroku create name-of-your-app
</code></pre>

Done! You just need to push your code.

<pre><code data-language="ruby">
git push
</code></pre>

You can access your Web App url on www.your-app-name.heroku.com

Oh wait! What is this?

<div class="fluidImg">
<img src="/assets/images/post-images/heroku-404.png" alt="Heroku 404">
</div>

<br>

To make your Web App run on Heroku you need to run your Web App in one of those languages I said right on the beginning of this post.

Today we are going to run and deploy a simple Node.js/Express.js Application..since I have been using Heroku and Node.js for all my personal/aside projects I created a Express.js boilerplate to run and deploy fast and easy with <a href="/blog/introduction-to-task-runner-gruntjs/" target="_blank" title="introduction to Grunt.js">Grunt.js</a> included so you can watch for changes on your files to minify CSS and uglify JS. I also included static assets and NO Jade (jade is native on Express.js) so you can code your normal HTML instead of Jade.

Go to my Github repository <a href="https://github.com/weblancaster/expressjs-static-boilerplate" target="_blank" title="Express.js static boilerplate">Express.js static boilerplate</a> and download the zip file then extract and copy everything has inside of "expressjs-static-boilerplate" folder to your Web App folder.

## Running Node.js

After download my boilerplate let's install the dependencies and run our Node.js server

<pre><code data-language="ruby">
sudo npm install -g
</code></pre>

Enter your password.
You should see something like the image below.. notice that not every log is showed on the image..

<div class="fluidImg">
<img src="/assets/images/post-images/success-image.png" alt="success image">
</div>

<br>

All Node dependencies are installed and now you can start run your server.

<pre><code data-language="ruby">
node server.js
</code></pre>

Or to not need to quit the server "control + c" every time you do any change I also added a monitor to the boilerplate so every time you do your changes and save the monitor you automatically re-run the server.

<pre><code data-language="ruby">
nodemon server.js
</code></pre>

## Running Grunt.js

After install all the Node.js dependencies you can start run your tasks to minify CSS and uglify JS. <br>
Open a new tab on your terminal and run the command.

<pre><code data-language="ruby">
grunt build
</code></pre>

This is the message you should get.

<div class="fluidImg">
<img src="/assets/images/post-images/grunt-build.png" alt="grunt build">
</div>

<br>

But still not quite good enough because we would need to build every time we did any change.
So let's start to watch for changes on the files.

<pre><code data-language="ruby">
grunt watch
</code></pre>

Now every time you do any change and save the file grunt you build automatically.

<div class="fluidImg">
<img src="/assets/images/post-images/grunt-watch.png" alt="grunt watch">
</div>

<br>

Ok. That's pretty cool right?!.

## Deploying and Running on Heroku

Now let's push to Heroku and see if it works.

<pre><code data-language="ruby">
git add .
</code></pre>

<pre><code data-language="ruby">
git commit -m "added express boilerplate"
</code></pre>

<pre><code data-language="ruby">
git push origin master
</code></pre>

and this is what happened..

<div class="fluidImg">
<img src="/assets/images/post-images/no-support.png" alt="no support">
</div>

<br>

If you read the message you will see "Push rejected, no Cedar-supported app detected" so let's add support to make this baby work..
Every Web App on Heroku needs a file to tell Heroku what are we deploying..

In this case we need a "Procfile". So create a new file named "Procfile" and type "web: node server.js" save inside your app folder. <br>

Then you need to activate your server and tell Heroku to run 1 "Cedar" (one cedar is free hosting).

<pre><code data-language="ruby">
heroku ps:scale web=1
</code></pre>

<div class="fluidImg">
<img src="/assets/images/post-images/cedar.png" alt="no support">
</div>

<br>

Repeat the push process.. after do the push process again "git add ." "git commit" and "git push origin master" a bunch of message will log and the final logs would be like this image below.. now you can access your Web App URL in my case is <a href="http://deployed-nodejs-app.herokuapp.com/" title="my how to deploy node.js to Heroku post" target="_blank">deployed-nodejs-app</a>.

<div class="fluidImg">
<img src="/assets/images/post-images/pushed.png" alt="Web app deployed">
</div>

<br>

And this is how we deploy Node.js to Heroku.. fast and easy.

Cheers!


