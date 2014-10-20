---
layout: post
title: My Micro-Library called Jet.js

excerpt: My love for Javascript just get bigger and also my knowledge but that's not what I'm going to blog about today.. at this time I'm going to post about the Micro-Library I created Jet.js
---

My love for Javascript just get bigger and also my knowledge but that's not what I'm going to blog about today.. at this time I'm going to post about the Micro-Library I created Jet.js

## Jet.js

One of the senior developers at my former company was having some performance issues on a particular Web Application..
After see the code at my perspective one of the problems were all the plugins (was more than 15) being download on the entire Application.

I decided create a very lightweight library (called modular-script-loader) to solve that problem downloading scripts asynchronously (non-block) and on demand (not for all the pages).

So last night I decided re-write entirely using better Design pattern and cleaner code I also gave a better name "Jet.js".

### Code

Check out on Github <a href="http://www.github.com/weblancaster/jet" target=""_blank title="Jet js">Jet.js</a>

My goal here is to make the Web Application faster therefore <strong> download scripts asynchronously (non-block), better organized script dependency and very very lightweight</strong>.

Below is the code to make the "magic" happen..just a few lines of code.

<pre><code data-language="javascript">
/*!
 * Jet.js (Micro-library)
 * Version: 0.3
 * http://git.io/LwFXlg
 * Released under the MIT license
 *
 * Author's name: Michael Lancaster
 * website: www.bymichaellancaster.com
 * Twitter: @weblancaster
 * Date: 24-09-2013
 */
;(function(window, undefined) {

    window.Jet = window.Jet || {};

    Jet.App = (function() {
        // PRIVATE

        /**
         * Responsible to inject widgets/scripts
         * on the page
         * @method inject
         */
         function inject(url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";

            if (script.readyState){  //IE
                script.onreadystatechange = function(){
                    if ( script.readyState == "loaded" || script.readyState == "complete" ) {
                        script.onreadystatechange = null;
                        if ( callback !== undefined ) {
                            callback();
                        }
                    }
                };
            } else {  //Others
                script.onload = function(){
                    if ( callback !== undefined ) {
                        callback();
                    }
                };
            }

            script.src = url;
            document.getElementsByTagName('body')[0].appendChild(script);
        }

        // PUBLIC
        return {
            /**
             * Responsible to store all widgets
             * as an array
             * @property WIDGETS_COLLECTION
             */
            WIDGETS_COLLECTION: null,

            /**
             * Responsible to get widgets
             * and transform in array
             * and assign to the property
             * @method widgets
             */
            widgets: function() {
                var widgets = document.body.getAttribute('data-ui-widget'),
                    widgetsArr = widgets.split(' ');

                this.WIDGETS_COLLECTION = widgetsArr;
            },

            /**
             * Responsible for receive arguments and initialize widget
             * @method init
             */
            init: function(name, url, callback) {
                this.widgets();

                if ( arguments.length < 2 ) {
                    return false
                }

                var widget = name,
                    widgetCollection = this.WIDGETS_COLLECTION,
                    widgetCollectionLength = widgetCollection.length,
                    i = 0;

                for ( ; i < widgetCollectionLength; i++ ) {
                    if ( widgetCollection[i].indexOf(widget) === 0 ) {
                        inject(url, callback);
                    }
                }
            }
        }

    });

})(window);
</code></pre>

### how to use

Define what are the widgets you want to use on that page (on body element).

<pre><code data-language="html">
< body data-ui-widget="widget-jquery widget-cycle" >
</code></pre>

include Jet.js on your page

<pre><code data-language="html">
<script src="js/jet.min.js"></script>
</code></pre>

I would suggest you create a JS file which has all your widgets been called.

<pre><code data-language="javascript">
// Cycle
var dependency1 = new Jet.App;
    dependency1.init('widget-cycle', 'http://malsup.github.io/jquery.cycle.all.js', function() {
        console.log('cycle loaded');
        $('#outdoor-context-content').cycle({
            fx: 'fade'
        });
    });
</code></pre>

Done!

### Example of use

- Relatively small to medium Web Applications
- Wordpress, Drupal, CMS's Web Applications in general

### (Intended) browser support

- Google Chrome
- Mozilla Firefox 3+
- Apple Safari 4+
- Opera 10+
- Internet Explorer 7+

If you found any bug or want to contribute or want to give me any opinion feel free to do that.