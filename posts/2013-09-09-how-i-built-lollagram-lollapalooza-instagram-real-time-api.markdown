---
layout: post
title: How I built Lollagram with Instagram real time API

excerpt: A month ago was the event Lollapalooza in Chicago and some co-workers from my former company had an idea two years ago (if I'm not wrong) to develop a web Application showing latest pictures people were sharing from the event..and this year I wanted to take it to the next level.
---

## What is Lollagram?

[from the Application] <a href="http://www.lollagram.com" target="_blank" title="Lollagram - real time lollapalooza">Lollagram</a>  is a labor of love that’s designed to help you keep track of the Lollapalooza experience, through the eyes (or, more accurately, snapshots) of music lovers on the ground at Grant Park. Lollagram takes advantage of the Instagram Real Time API and aggregates the moments at Lollapalooza, creating a visual record of the bands, food, people, and city that make up this great musical tradition. With 45 million photos being uploaded to Instagram each day, we're excited to present snapshots from Lollapalooza 2013.

## The new version

Check out the source code on <a href="https://github.com/weblancaster/instagram-real-time" target="_blank" title="github Lollagram - real time lollagram cosuming Instagram real time API">Lollagram source code.</a>

The old version of Lollagram was a simple website built in PHP where you needed to click on the refresh button to pull the latest pictures shared on Instagram with the hashtags #lollapalooza #lollapalooza2012 or #lolla2012

While I was working for Golinharris I was also working on my side projects/experiments using NodeJS so I think two weeks before the event I started to talk with my co-worker and designer Daniel Branca that I was thinking to use cutting edge technologies to do a real time Application therefore much more engaging.

I was also about to leave the company to another company and I had one more week at Golinharris but I really wanted to work on it for fun and learning to use technologies like NodeJs, Socket.io, Client Side template (HandlebarsJs) and responsive web design where the user can follow on their smartphone, tablet, desktop or even on TV (and Yes I did for "free").

I never had work with real time Application so I started to read and do some experiments with Socket.io coding a real time chat (as most developers do).
After understand the basic concept of Socket.io "Real Time" and discuss all the most important details of the Application with Dan (the designer) I started code the Application.

As I said before at that time I was leaving the company to work for another company and I was also preparing my slides/speak for the biggest conference in Brazil for Front End Developers/Engineers which I was invited to speak (topic for another post) and it would be in the same day I had to release the Application.

So in one week I had to start at the new company understand the new workflow, finish Lollagram Application and finish my slides/speak for the conference in Brazil.


## The Application

I'm not going to describe in a lot of details it will be more a overview how I did it.

After understand how the Instagram real time API work I started to code the Back-end utilizing NodeJS (<a href="http://expressjs.com/" target="_blank" title="ExpressJS Framework">ExpressJS</a>) and hosted on <a href="http://www.heroku.com" target="Heroku cloud" title="Heroku cloud">Heroku</a> which is awesome and I could added monitoring to the server to debug and make sure everything on the server was/is running alright. <br>
I tried to find code examples to gain some time but I found anything good enough. Or the code were too old or was developed PHP or RoR so I ended up utilizing the library called <a href="https://github.com/mckelvey/instagram-node-lib" targte="_blank" title="Instagram node lib">instagram-node-lib</a> which helped me a lot and I gained some time.

After register my Application on Instagram and get my "client id" and "client secret" the most important things I needed to get it working was the steps below.

Remember I'm using the <a href="https://github.com/mckelvey/instagram-node-lib" targte="_blank" title="Instagram node lib">instagram-node-lib</a> so we don't need to do from scratch since time is/was very precious and we don't want to reinvent the wheel.

### Basic setup

<pre><code data-language="javascript">
Instagram.set('client_id', clientID);
Instagram.set('client_secret', clientSecret);
Instagram.set('callback_url', 'http://YOUR_URL.COM/callback');
Instagram.set('redirect_uri', 'http://YOUR_URL.com');
</code></pre>

### The Handshake

The <a href="http://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="" title="Handshake">Handshake</a> is the confirmation connection between the servers.

<pre><code data-language="javascript">
app.get('/callback', function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
});
</code></pre>

### First load

When you access the Application for the first time you can noticed thirteen pictures are loaded.
Here I request the latest shared pictures on Instagram with hashtag #lollapalooza and utilizing Socket.io I transmit it to the client side as json.

Server sends the data to the client side.

<pre><code data-language="javascript">
io.sockets.on('connection', function (socket) {
  Instagram.tags.recent({ 
      name: 'lollapalooza',
      complete: function(data) {
        socket.emit('firstShow', { firstShow: data });
      }
  });
});
</code></pre>

On my method "mostRecent" the Socket.io on the client receives the data and parse/process using client side templating (HandlebarsJs) and append to the Application showing the latest pictures shared on Instagram.

<pre><code data-language="javascript">
mostRecent: function() {
    socket.on('firstShow', function (data) {
        var
            query = data,
            source = $('#firstShow-tpl').html(),
            compiledTemplate = Handlebars.compile(source),
            result = compiledTemplate(query),
            imgWrap = $('#imgContent');

        imgWrap.html(result);
    });
},
</code></pre>

### Subscribing to hashtags

To receive the last updates from Instagram as real time first I needed to subscribe to the hashtags.

<pre><code data-language="javascript">
Instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'lollapalooza',
  aspect: 'media',
  callback_url: 'http://YOUR_URL.com/callback',
  type: 'subscription',
  id: '#'
});
</code></pre>

### Real time "time"

After subscribe to the hashtags I started to receive "notifications" from Instagram when someone shared pictures with the hashtags subscribed which is pretty cool specially when lots of people share and makes even more engaging.

One thing that I noticed is that Instagram real time API is unstable and if you go to the google groups where developers post problems and discuss solutions you can see there's a lot to get better.
Another thing is that you can receive 5000 "notifications" per hour and if you pass the limit the Instagram block your Application.

Here I send the url to the client side to make the Ajax request but theres another way to do it which is access the json response from Instagram "notification" on the server and get the last image to send to the client.

<pre><code data-language="javascript">
app.post('/callback', function(req, res) {
    var data = req.body;

    data.forEach(function(tag) {
      var url = 'https://api.instagram.com/v1/tags/' + tag.object_id + '/media/recent?client_id=479edbf0004c42758987cf0244afd3ef';
      sendMessage(url);

    });
    res.end();
});

function sendMessage(url) {
  io.sockets.emit('show', { show: url });
}
</code></pre>

On the client side I receive the data "url" and do Ajax request then I call my method to render the client side template.

<pre><code data-language="javascript">
getData: function() {
    var self = this;
    socket.on('show', function(data) {
        var url = data.show;
        $.ajax({
            url: url,
            type: 'POST',
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function (data) {
            self.renderTemplate(data);
        }); 
    });
}
</code></pre>

### How to unsubscribe

To unsubscribe is easy it just need the tag "ID" and done.

<pre><code data-language="javascript">
Instagram.subscriptions.unsubscribe({ id: '#######' });
</code></pre>

### Final thoughts

- Work with Real Time is pretty cool and fun.
- Instagram real time API isn't great but does the job.
- Work in three different important things in one week is possible with one pack with ten monster energetic drink and less than four hours of sleep per night.
- People love to share pictures. People love to see pictures.

Check out the source code on <a href="https://github.com/weblancaster/instagram-real-time" target="_blank" title="github Lollagram - real time lollagram cosuming Instagram real time API">Lollagram source code.</a>











