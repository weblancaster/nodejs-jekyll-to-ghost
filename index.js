#!/usr/bin/env node

'use strict';

var path = require('path')
    , fs = require('fs')
    , yaml = require('js-yaml')
    , uuid = require('node-uuid')
    , clc = require('cli-color')
    , moment = require('cli-color')
    , markdown = require( "markdown" ).markdown
    , readline = require('readline')
    , _ = require('lodash');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// default color messages
var logError = clc.red.bold;
var logWarn = clc.yellow;
var logNotice = clc.blue;
var logSuccess = clc.green;


/**
 * Class/Constructor JekyllToGhost responsible to boostrap the conversion to Ghost format (json)
 * @param {[string]} posts [contain path to Jekyll posts]
 * @class JekyllToGhost
 */
function JekyllToGhost(pathPosts) {
    this.folder = './' + pathPosts + '/';
    this.readPosts();
}

/**
 * Read each post to fill the json format
 * @method readPosts
 */
JekyllToGhost.prototype.readPosts = function() {
    var post, postName, postDate, postPath, 
        postContent, postYAML, postMarkdown
        , self = this
        , folder = this.folder
        , re = /(\.md|\.markdown)$/i;

    if ( ! fs.existsSync(folder) ) {
        console.log( logWarn('Folder > ' + folder + ' < does not exists.') );
        console.log( logWarn('Make sure to include a folder with Jekyll markdown files inside.') );

        return;
    }

    fs.readdir(folder, function(error, files) {
        if ( error || files.length < 1 ) {
            console.log( logWarn('Can not read files at ' + folder) );
            return;
        }

        for ( var i = 0; i < files.length; i++ ) {
            post = files[i];
            postPath = folder + post;

            if ( re.exec(post) ) {
                postName = self.extractPostName(post);
                postDate = self.extractDate(post);

                fs.readFile(folder + post, function(error, data) {
                    if ( error ) {
                        console.log( logWarn('Something went wrong at ' + post) );
                        return;
                    }

                    postContent = data.toString();
                    postYAML = self.extractYAML(postContent);
                    postMarkdown = self.extractMarkdown(postContent);
                });
            }
        }
     })
}

/**
 * Extract post date
 * @param  {[string]} content [post]
 * @return {[string]}         [date]
 */
JekyllToGhost.prototype.extractDate = function(content) {
    return content.substring(0, 10)
}

/**
 * Extract post name
 * @param  {[string]} content [post]
 * @return {[string]}         [name]
 */
JekyllToGhost.prototype.extractPostName = function(content) {
    return content.substring(11, content.indexOf('.'));
}

/**
 * Extract post YAML
 * @param  {[string]} content [post]
 * @return {[string]}      [YAML]
 * @method extractYAML
 */
JekyllToGhost.prototype.extractYAML = function(content) {
    return content.substring(0, content.lastIndexOf('---') );
}

/**
 * Extract post Markdown
 * @param  {[string]} content [post]
 * @return {[string]}      [Markdown]
 * @method extractMarkdown
 */
JekyllToGhost.prototype.extractMarkdown = function(content) {
    return content.substring(content.lastIndexOf('---') + 3, content.length);
}

/**
 * Get the user input (folder name) and instantiate JekyllToGhost
 * passing the path of the folder
 */
function startUp() {
    console.log( logSuccess('Running...') )

    rl.question('Type the folder name where Jekyll posts are: ', function(pathPosts) {
        var app = new JekyllToGhost(pathPosts);
        rl.close();
    });
}

/**
 * Initialize script
 */
startUp()