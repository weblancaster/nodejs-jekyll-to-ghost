#!/usr/bin/env node

'use strict';

let path = require('path');
let fs = require('fs');
let yaml = require('js-yaml');
let uuid = require('node-uuid');
let clc = require('cli-color');
let markdown = require( "markdown" ).markdown;

// default color messages
let logError = clc.red.bold;
let logWarn = clc.yellow;
let logNotice = clc.blue;
let logSuccess = clc.green;


class JekyllToGhost {

    /**
     * Responsible to startup the class
     * @param pathPosts [path where jekyll posts are stored]
     * @method constructor
     */
    constructor (pathPosts) {
        this.folder = pathPosts;
        this.ghostFileOutput = './ghost-generated.json';
        this.ghostObj = {
            data: {
                posts: []
            }
        };

        this.populateGhostData();
    }

    /**
     * Call methods to populate data format
     * @method populateGhostData
     */
    populateGhostData () {
        this.populateMeta();
        this.readPosts();
    }

    /**
     * Extract content from markdown post
     * create post json object
     * @method readPosts
     */
    readPosts () {
        let post;
        let postName; 
        let postDate; 
        let postPath;
        let postContent;
        let postYAML; 
        let postMarkdown;
        let data;
        let folder = this.folder;
        let re = /(\.md|\.markdown)$/i;

        if ( ! fs.existsSync(folder) ) {
            console.log( logWarn(`Folder > ${folder} < does not exists.`) );
            console.log( logWarn('Make sure to enter the right path to jekyll folder containing the markdown files.') );

            return false;
        }

        fs.readdir(folder, (error, files) => {
            if ( error || files.length < 1 ) {
                console.log( logWarn(`Cant read files at ${folder}`) );
                return;
            }

            for ( let i = 0; i < files.length; i++ ) {
                let postObj = {};
                post = files[i];
                postPath = path.join(folder, post);

                if ( ! re.exec(post) ) {
                    console.log( logWarn(`Something went wrong reading post ${post}`) );
                    continue;
                }

                postName = this.extractPostName(post);
                postDate = this.extractPostDate(post);

                data = fs.readFileSync(postPath);

                if ( ! data ) {
                    console.log( logWarn(`Something went wrong reading post ${post}`) );
                    return;
                }

                postContent = data.toString();
                postYAML = this.extractPostYAML(postContent);
                postMarkdown = this.extractPostMarkdown(postContent);

                postObj['id'] = i;
                postObj['uuid'] = uuid.v4();
                postObj['title'] = postYAML.title;
                postObj['slug'] = postName;
                postObj['markdown'] = postMarkdown;
                postObj['html'] = markdown.toHTML(postMarkdown);
                postObj['image'] = null;
                postObj['featured'] = 0;
                postObj['page'] = 0;
                postObj['status'] = 'published';
                postObj['language'] = 'en_US';
                postObj['meta_title'] = postYAML.title;
                postObj['meta_description'] = null;
                postObj['author_id'] = 1;
                postObj['created_at'] = Date.parse(postDate);
                postObj['created_by'] = 1;
                postObj['updated_at'] = Date.parse(postDate);
                postObj['updated_by'] = 1;
                postObj['published_at'] = Date.parse(postDate);
                postObj['published_by'] = 1;

                this.populatePosts(postObj);

                if ( (this.ghostObj.data.posts.length + 1) === files.length ) {
                    this.writeToFile();
                }

            }
        });
    }

    /**
     * Extract date from post
     * @param content [post content]
     * @returns {string}
     * @method extractPostDate
     */
    extractPostDate (content) {
        return content.substring(0, 10)
    }

    /**
     * Extract name post
     * @param content [post content]
     * @returns {string}
     * @method extractPostName
     */
    extractPostName (content) {
        return content.substring(11, content.indexOf('.'));
    }

    /**
     * Extract post YAML header information
     * @param content [post content]
     * @returns {yaml}
     * @method extractPostYAML
     */
    extractPostYAML (content) {
        return yaml.safeLoad( content.substring(0, content.indexOf('---', content.indexOf('---') + 1) ));
    }

    /**
     * Extract post markdown content
     * @param content [post content]
     * @returns {string}
     * @method extractPostMarkdown
     */
    extractPostMarkdown (content) {
        return content.substring(content.lastIndexOf('---') + 3, content.length);
    }

    /**
     * Populate meta obj
     * @method populateMeta
     */
    populateMeta () {
        this.ghostObj['meta'] = {
            'exported_on': Date.now(),
            'version': '000'
        }
    }

    /**
     * Populate posts Array with post obj
     * @param  postObj [post obj formatted]
     * @method populatePosts
     */
    populatePosts (postObj) {
        this.ghostObj['data']['posts'].push(postObj);
    }

    /**
     * Parse js obj to json string format
     * @method ghostToJson
     */
    ghostToJson () {
        return JSON.stringify(this.ghostObj)
    }

    /**
     * Write json data to file
     * @method writeToFile
     */
    writeToFile () {
        let data = this.ghostToJson();

        fs.writeFileSync(this.ghostFileOutput, data, 'utf8');
        console.log( logSuccess('Ghost JSON generated successfully!') );
    }

}


/**
 * Get the user input (folder name) and instantiate JekyllToGhost
 * passing the path of the folder
 */
console.log( logSuccess('Running...') );

if ( process.argv[2] ) {
  let app = new JekyllToGhost(process.argv[2]);
} else if ( process.argv.length === 1 ) {
    console.log( logWarn('You need to specify a path to Jekyll posts.') );
}

module.exports = JekyllToGhost;
