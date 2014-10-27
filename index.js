#!/usr/bin/env node

'use strict';

var path = require('path')
    , fs = require('fs')
    , async = require('async')
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
    this.ghostFileOutput = './ghost-generated.json';
    this.ghostObj = {
        data: {
            posts: []
        }
    };

    this.populateGhostData();
}

JekyllToGhost.prototype.populateGhostData = function(content) {
    var self = this;

    this.populateMeta();
    this.readPosts();
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
    return yaml.safeLoad( content.substring(0, content.indexOf('---', content.indexOf('---') + 1) ));
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
        , data
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
            var postObj = {};
            post = files[i];
            postPath = folder + post;

            if ( re.exec(post) ) {
                postName = self.extractPostName(post);
                postDate = self.extractPostDate(post);

                data = fs.readFileSync(postPath);

                if ( ! data ) {
                    console.log( logWarn('Something went wrong at ' + post) );
                    return;
                }

                postContent = data.toString();
                postYAML = self.extractPostYAML(postContent);
                postMarkdown = self.extractPostMarkdown(postContent);

                postObj['id'] = i;
                postObj['uuid'] = uuid.v4();
                postObj['title'] = postYAML.title;
                postObj['slug'] = postName;
                postObj['markdown'] = postMarkdown;
                // postObj['html'] = markdown.toHTML(postMarkdown);
                postObj['image'] = null;
                postObj['featured'] = 0;
                postObj['page'] = 0;
                postObj['status'] = 'published';
                postObj['language'] = 'en_US';
                postObj['meta_title'] = postYAML.title;
                postObj['meta_description'] = postYAML.excerpt;
                postObj['author_id'] = 1;
                // postObj['created_at'] = ;
                // postObj['created_by'] = 1;
                // postObj['updated_at'] = ;
                // postObj['updated_by'] = 1;
                // postObj['published_at'] = ;
                // postObj['published_by'] = 1;

                self.populatePosts(postObj);

                if ( (self.ghostObj.data.posts.length + 1) === files.length ) {
                    self.writeToFile();
                }
            }

        }

     })
}

JekyllToGhost.prototype.writeToFile = function() {
    var data = this.ghostToJson();

    fs.writeFileSync(this.ghostFileOutput, data, 'utf8');
}

JekyllToGhost.prototype.populateMeta = function() {
    this.ghostObj['meta'] = {
        'exported_on': Date.now(),
        'version': '000'
    }
}

JekyllToGhost.prototype.populatePosts = function(postObj) {
    this.ghostObj['data']['posts'].push(postObj);
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