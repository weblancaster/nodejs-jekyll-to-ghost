---
layout: post
title: Introduction to GruntJS

excerpt: Which developer never wasted time doing repetitive and boring tasks instead of being focused on what we do best "Code".
---

Which developer never wasted time doing repetitive and boring tasks instead of being focused on what we do best "Code".

Developers should be worry about write code but very often we got ourself doing a lot of repetitive and boring tasks like cleaning the code, minifying, combining, generating and so on so forth.

How many time would you save not doing those tasks? today I will show you the introduction use to help you on your daily bases development work flow.

There's a answer and it's called GruntJS I have been using a while and I got say "It's true love" I can watch for changes on my files, run tests, minify, pre-process SASS, minify images and the list goes on take at look on the plugins at <a href="http://gruntjs.com/plugins" title="GruntJS plugins" target="_blank">GruntJS plugins</a> and for more information and further reference you MUST go to <a href="http://gruntjs.com" title="GruntJS" target="_blank">GruntJS website</a>.

Let's say we want to watch for changes on the js files and HTML markup minify both and concatenate all js files in one single file.

## Let's get start

Create a folder on your desktop (or whatever you want to) and let's call it GruntJS-app.
<br>
Add this follow simple architecture to your project.
<br><br>
- GruntJS-app
<br>
-- dist // html destination
<br>
-- src // html source
<br>
--- index.html
<br>
--- internal.html
<br>
-- assets
<br>
--- js
<br>
---- main.js
<br>
---- app.js
<br>
---- module.js
<br>
--- css
<br>
--- images

Then you will need NodeJS if you don't have go to the <a href="http://nodejs.org/" title="NodeJS website" target="_blank">NodeJS website</a> for installation information.

To make GruntJS work properly you will need some two specific files "package.json" used by <a href="https://npmjs.org/" title="npm website" target="_blank">npm</a> contain the information for the project where you list grunt and plugins used by your project as "devDependencies" and the "Gruntfile.js" where you set your tasks to run.

So let's add to the project GruntJS-app
<br><br>
- GruntJS-app
<br>
-- dist // html destination
<br>
-- src // html source
<br>
--- index.html
<br>
--- internal.html
<br>
-- assets
<br>
--- js
<br>
---- main.js
<br>
---- app.js
<br>
---- module.js
<br>
--- css
<br>
--- images
<br>
-- package.json // added new file
<br>
-- Gruntfile.js // added new file

## Installing GruntJS

On your root project folder run the command line

<pre><code data-language="ruby">
sudo npm install -g grunt-cli
</code></pre>

Now you have the grunt command line installed globally to your project

## Configuring GruntJS (Gruntfile.js)

the basic structure to configure your Gruntfile.js file is simple.

<pre><code data-language="javascript">
module.exports = function(grunt) {

	grunt.initConfig({
		
	});

}
</code></pre>

## Configuring the package.json

You can add tons of information on you package json and you can check all information <a href="http://package.json.nodejitsu.com/" title="package json reference information" target="blank">here</a> but in this case let's keep it as simple as possible.

<pre><code data-language="json">
{
	"name": "GruntJS-app",
	"title": "GruntJS-app",
	"description": "Simple introduction to GruntJS set up",
	"author": "your name",
	"homepage": "your project website",
	"version": "0.0.1",
	"devDependencies": {
		"grunt": "~0.4.1"
	}
}
</code></pre>

## Adding plugins to use as task

Remember that we want to "watch" for changes minify both HTML, js files and concatenate all js files in one single file

Now on you wont need to go manually to package.json to add the plugins as devDependencies because you are going to run the command on your terminal to add it automatically.

First let's install Uglify

<pre><code data-language="ruby">
npm install grunt-contrib-uglify --save-dev
</code></pre>

And enable the plugin inside of Gruntfile.js

<pre><code data-language="javascript">
grunt.loadNpmTasks('grunt-contrib-uglify');
</code></pre>

Now Gruntfile.js looks like this

<pre><code data-language="javascript">
module.exports = function(grunt) {

	grunt.initConfig({

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

}
</code></pre>

Install htmlmin

<pre><code data-language="ruby">
npm install grunt-contrib-htmlmin --save-dev
</code></pre>

Enable the plugin

<pre><code data-language="javascript">
grunt.loadNpmTasks('grunt-contrib-htmlmin');
</code></pre>

Now Gruntfile.js looks like this

<pre><code data-language="javascript">
module.exports = function(grunt) {

	grunt.initConfig({

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

}
</code></pre>

## Setting the tasks

On your Gruntfile.js you will define the configuration for your tasks (check out the plugins documentation for configuration) as should be and the task register.

<pre><code data-language="javascript">
module.exports = function(grunt) {

	grunt.initConfig({

		uglify: {
			my_target: {
		      files: {
		        'assets/js/app.min.js': // destination
		        ['assets/js/app.js', 'assets/js/main.js', 'assets/js/module.js'] // source
		      }
		    }
		},

		htmlmin: {
			dist: {
		  		options: {
		    	removeComments: true,
		    	collapseWhitespace: true
		  	},
		  	files: {
		    		'dist/index.html': 'src/index.html', // destination
					'dist/internal.html': 'src/internal.html' // source
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('build', ['htmlmin', 'uglify']);

}
</code></pre>

## Running the tasks

Make sure you have all the npm installed

<pre><code data-language="ruby">
npm install
</code></pre>

Run the task

<pre><code data-language="ruby">
grunt build
</code></pre>

Done! This is what you should have as a response.

<pre><code data-language="ruby">
Running "htmlmin:dist" (htmlmin) task
File dist/index.html created.
File dist/internal.html created.

Running "uglify:my_target" (uglify) task
File "assets/js/app.min.js" created.

Done, without errors.
</code></pre>

## Adding and configuring watch

Remember "no waste of time" with repetitive tasks right? so to not need run "grunt build" every time after changes let's add the plugin watch.

Install watch

<pre><code data-language="ruby">
npm install grunt-contrib-watch --save-dev
</code></pre>

Enable the plugin and configure the watch task

<pre><code data-language="javascript">
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.event.on('watch', function(action, filepath) {
  grunt.log.writeln(filepath + ' has ' + action);
});
</code></pre>

Now Gruntfile.js looks like this (check out the plugin documentation for configuration).

<pre><code data-language="javascript">
module.exports = function(grunt) {

	grunt.initConfig({

		uglify: {
			my_target: {
		      files: {
		        'assets/js/app.min.js': // destination
		        ['assets/js/app.js', 'assets/js/main.js', 'assets/js/module.js'] // source
		      }
		    }
		},

		htmlmin: {
			dist: {
		  		options: {
		    	removeComments: true,
		    	collapseWhitespace: true
		  	},
		  	files: {
		    		'dist/index.html': 'src/index.html', // destination
					'dist/internal.html': 'src/internal.html' // source
				}
			}
		},

		watch: {
		    src: {
		      files: ['src/*.html', 'assets/js/*.js', 'assets/css/*.css', '!assets/js/app.min.js'], // ! means not
		      tasks: ['build'],
		    },
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['htmlmin', 'uglify']);

	grunt.event.on('watch', function(action, filepath) {
	  grunt.log.writeln(filepath + ' has ' + action);
	});

}
</code></pre>

Now on you will just need to run "grunt watch" so every time you change something in the files set up to watch will run the task "build"

<pre><code data-language="ruby">
grunt watch
</code></pre>

and this is what you should see after run the command

<pre><code data-language="ruby">
Running "watch" task
Waiting...
</code></pre>

To stop watch press "control + c" 

## Conclusion

GruntJS is AWESOME and you can do much more complex things with it.
<br>
Check out the example on <a href="https://github.com/weblancaster/blog-examples/tree/master/GruntJS-app" title="example on github" target="blank">Github</a>.

Now you have more time to play with new experiments.
<br>
Cheers!




