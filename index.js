#!/usr/bin/env node

'use strict';

var path = require('path')
    , fs = require('fs')
    , yaml = require('js-yaml')
    , uuid = require('node-uuid')
    , clc = require('cli-color')
    , moment = require('cli-color')
    , markdown = require( "markdown" ).markdown
    , readline = require('readline');
    // , lowdb = require('lowdb')
    // , db = lowdb('ghost-generated.json');

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
 * Responsible to read each post and split between YAML and Markdown content
 * @method readPosts
 */
JekyllToGhost.prototype.readPosts = function() {
    var post, postName, postDate, postPath, 
        postContent, postYAML, postMarkdown
        , folder = this.folder
        , re = /(\.md|\.markdown)$/i;

    if ( ! fs.existsSync(folder) ) {
        console.log( logWarn('Folder > ' + folder + ' < does not exists.') );
        console.log( logWarn('Make sure to include a folder with Jekyll markdown files inside.') );

        return false;
    }

    fs.readdir(folder, function(error, files) {
        if ( error || files.length < 1 ) {
            console.log( logWarn('Can not read files at ' + folder) );
            return false;
        }

        for ( var i = 0; i < files.length; i++ ) {
            post = files[i];
            postPath = folder + post;

            if ( re.exec(post) ) {
                postName = post.substring(0, post.indexOf('.'));
                postDate = post.substring(0, 10);

                fs.readFile(folder + post, function(error, data) {
                    if ( error ) {
                        console.log( logWarn('Something went wrong at ' + post) );
                        return false;
                    }

                    postContent = data.toString();
                    postYAML = postContent.substring(0, postContent.lastIndexOf('---') );
                    postMarkdown = postContent.substring(postContent.lastIndexOf('---') + 3, postContent.length);
                });
            }
        }
     })
}

/**
 * Receive YAML and Markdown content to create
 * to Ghost JSON format and save
 * @param  {[type]} postYAML     [description]
 * @param  {[type]} postMarkdown [description]
 * @return {[type]}              [description]
 */
JekyllToGhost.prototype.createGhostJSON = function(postYAML, postMarkdown) {

}

/**
 * Get the user input (folder name) and instantiate JekyllToGhost
 * passing the path of the folder
 */
function startUp() {
    console.log( logSuccess('Running...') )

    rl.question('Type the name of the folder where Jekyll posts are hosted: ', function(pathPosts) {
        var app = new JekyllToGhost(pathPosts);
        rl.close();
    });
}

/**
 * Initialize script
 */
startUp()