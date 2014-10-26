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
 * Class/Constructor JekyllToGhost responsible to bootstrap the conversion to Ghost format (json)
 * @param {[string]} posts [contain path to Jekyll posts]
 * @class JekyllToGhost
 */
function JekyllToGhost(pathPosts) {
    this.folder = './' + pathPosts + '/';
    this.ghostObj = {};
    this.ghostObj['data']['posts'] = [];

    this.populateGhostData();
}

JekyllToGhost.prototype.populateGhostData = function(content) {
    this.readPosts();
    this.populateMeta();

    console.log('Data formatted:', this.ghostToJson())
}

/**
 * Extract post date
 * @param  {[string]} content [post]
 * @return {[string]}         [date]
 * @method extractPostDate
 */
JekyllToGhost.prototype.extractPostDate = function(content) {
    return content.substring(0, 10)
}

/**
 * Extract post name
 * @param  {[string]} content [post]
 * @return {[string]}         [name]
 * @method extractPostName
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
JekyllToGhost.prototype.extractPostYAML = function(content) {
    return yaml.safeLoad( content.substring(0, content.lastIndexOf('---')) );
}

/**
 * Extract post Markdown
 * @param  {[string]} content [post]
 * @return {[string]}      [Markdown]
 * @method extractMarkdown
 */
JekyllToGhost.prototype.extractPostMarkdown = function(content) {
    return content.substring(content.lastIndexOf('---') + 3, content.length);
}

/**
 * Read each post to fill the json format
 * @method readPosts
 */
JekyllToGhost.prototype.readPosts = function() {
    var post, postName, postDate, postPath, 
        postContent, postYAML, postMarkdown
        , postObjt = {}
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
                postDate = self.extractPostDate(post);

                fs.readFile(folder + post, function(error, data) {
                    if ( error ) {
                        console.log( logWarn('Something went wrong at ' + post) );
                        return;
                    }

                    postContent = data.toString();
                    postYAML = self.extractPostYAML(postContent);
                    postMarkdown = self.extractPostMarkdown(postContent);

                    // postObjt['id'] = ;
                    // postObjt['uuid'] = ;
                    // postObjt['title'] = ;
                    // postObjt['slug'] = ;
                    // postObjt['markdown'] = ;
                    // postObjt['html'] = ;
                    // postObjt['image'] = null;
                    // postObjt['featured'] = 0;
                    // postObjt['page'] = 0;
                    // postObjt['status'] = 'published';
                    // postObjt['language'] = 'en_US';
                    // postObjt['meta_title'] = ;
                    // postObjt['meta_description'] = ;
                    // postObjt['author_id'] = ;
                    // postObjt['created_at'] = ;
                    // postObjt['created_by'] = 1;
                    // postObjt['updated_at'] = ;
                    // postObjt['updated_by'] = 1;
                    // postObjt['published_at'] = ;
                    // postObjt['published_by'] = 1;

                    // self.populatePosts(postObjt);

                });
            }
        }
     })
}

JekyllToGhost.prototype.populateMeta = function() {
    this.ghostObj['meta'] = {
        'exported_on': Date.now(),
        'version': '000'
    }
}

JekyllToGhost.prototype.populatePosts = function(postObjt) {
    this.ghostObj['data']['posts'].push(postObjt)
}


JekyllToGhost.prototype.ghostToJson = function() {
    return JSON.stringify(this.ghostObj)
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