"use strict";

let expect = require('chai').expect;
let sinon = require('sinon');
let App = require('../index.js');
let mdPost = `
---
layout: post
title: Lorem ipsum dolor 01

excerpt: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

describe('Jekyll to Ghost', () => {
	let app;
	let sandbox;
	let post = '2013-01-30-mock-01-test.markdown';

	beforeEach(function () {
	    sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
	    sandbox.restore();
	});

	it('path to folder exist', () => {
		let stub = sandbox.stub(App.prototype, 'populateGhostData');
		app = new App('./test/mock');
		expect(app.folder).to.be.equal('./test/mock');
	});

	it('ghost obj contain meta key', () => {
		let stub = sandbox.stub(App.prototype, 'readPosts');
		app = new App('./test/mock');
		expect(app.ghostObj.meta).to.be.ok;
	});

	it('extract name from post', () => {
		let name = 'mock-01-test';
		expect(App.prototype.extractPostName(post)).to.be.equal(name)
	});

	it('extract date from post', () => {
		let date = '2013-01-30';
		expect(App.prototype.extractPostDate(post)).to.be.equal(date)
	});

	it('extract YAML from post', () => {
		let YAML = { 
			layout: 'post',
  			title: 'Lorem ipsum dolor 01',
  			excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' };

		expect(App.prototype.extractPostYAML(mdPost)).to.be.deep.equal(YAML)
	});

	it('extract markdown from post', () => {
		let md = `\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`;
		expect(App.prototype.extractPostMarkdown(mdPost)).to.be.deep.equal(md)
	})

})