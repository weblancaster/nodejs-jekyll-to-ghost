Node.js Jekyll to Ghost
======================

[![Build Status](https://travis-ci.org/weblancaster/nodejs-jekyll-to-ghost.svg?branch=master)](https://travis-ci.org/weblancaster/nodejs-jekyll-to-ghost) [![Coverage Status](https://coveralls.io/repos/weblancaster/nodejs-jekyll-to-ghost/badge.svg?branch=master&service=github)](https://coveralls.io/github/weblancaster/nodejs-jekyll-to-ghost?branch=master)

This NodeJS module will help you to export [Jekyll](http://jekyllrb.com) markdown posts to a format that can be easily imported to [Ghost Blog Platform](http://ghost.org). <br>
It doesn't handle static pages, and it doesn't do anything with images. You'll have to copy those over yourself and manually adjust any URL differences.

This was built by reverse-engineering the version of [Wordpress plugin](https://wordpress.org/plugins/ghost/) and  [Ghost schema](https://github.com/TryGhost/Ghost/blob/master/core/server/data/schema.js) to match the JSON file it outputs.


### Prerequisite

- Node.js v4.0

### How to use

Clone/download the repository then place your Jekyll posts into `posts` folder or create a folder in the root level with your Jekyll posts.
Your post should be on YAML format (which is Jekyll default format).

To install dependencies

```ruby
sudo npm install
```

To start to export

```ruby
node index.js ./path/to/jekyll/posts
```

Type the name of the folder.. wait for the magic happen.
If everything went fine you should get this message

`Ghost JSON generated successfully!`

And a file called `ghost-generated.json` was created on your folder.

After do the steps above boot up your Ghost platform.

```ruby
npm start
```

Go to the url `http://localhost:2368/ghost/debug/` import the file generated nodejs-jekyll-to-ghost called `ghost-generated.json`
That's it.. Now you should have migrated your posts to Ghost format and ready to begin blog on your new Ghost blog platform.

ps: I removed all test posts on Ghost blog before migrate my Ghost generated format.

### Contributing

1. Fork it!
2. Create your branch: `git checkout -b my-new-branch`
3. Commit your changes: `git commit -am 'fix stuff'`
4. Push to the branch: `git push origin my-new-branch`
5. Submit a pull request


### License

The MIT License (MIT)

Copyright (c) 2014 Michael Lancaster

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
