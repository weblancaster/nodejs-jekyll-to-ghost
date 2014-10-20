---
layout: post
title: Javascript Object Oriented simple form validation

excerpt: Today I want to show you how to build a simple form validation with Object Oriented programming in Javascript.
---

Today I want to show you how to build a simple form validation with Object Oriented programming in Javascript.

### Why Object Oriented

Object Oriented programming aim to provide a model of programming based on Objects where an Object has both behaviors state (data) and behavior (code). <br>
Therefore focus on Objects rather than actions and data rather than logic with that our advantages are a more clear modular structure, easier to maintain and modify since we can create more objects with small differences from the exiting ones.

**The core concepts**

- Objects
- Classes
- Data Abstraction and Encapsulation
- Inheritance
- Polymorphism


## OO form validation

Here's our simple form validation in javascript based on Object Oriented programming. <br>
Our scenario: validate fields when form is submitted.

First things first... Let's create our class called `Validator` and also create our constructor called as method `constructor` which is responsible to setup our basic data.

<pre><code data-language="Javascript">
;(function(window, undefined) {
  
  var Validator = {
    
    constructor: function(form, config) {
      this._elForm = form;
      this._els = config.fields || {};
    }
  
  }
  
})(window, undefined);
</code></pre>

Now let's create our initializer called `init` and initialize the program adding a listener to the form using the info/data was passed to our constructor. <br>

<pre><code data-language="Javascript">
;(function(window, undefined) {
  
  var Validator = {
    
    constructor: function(form, config) {
      this._elForm = form;
      this._els = config.fields || {};
      
      this.init();
    },
    
    init: function() {
      this.addFormListener();
    },
    
    addFormListener: function() {
        var formSelector = this._elForm
          , elForm = document.querySelector(formSelector);
          
          elForm.addEventListener('submit', this.validate.bind(this), false);
    }
  
  }
  
})(window, undefined);
</code></pre>

The method called `addFormListener` does what it's named.. we add a listener to the form to when submitted trigger a method and also chain a method called `bind` which call the method `this.validate` with the context of the class instead of send the object clicked `form`.

The example below we are going add the method to `validate` which is responsible to test against the field requirement `required`, `empty` or `maxlength` and then add a CSS class to the input field.

<pre><code data-language="Javascript">
;(function(window, undefined) {
  
  var Validator = {
    
    constructor: function(form, config) {
      this._elForm = form;
      this._els = config.fields || {};
      
      this.init();
    },
    
    init: function() {
      this.addFormListener();
    },
    
    addFormListener: function() {
        var formSelector = this._elForm
          , elForm = document.querySelector(formSelector);
          
          elForm.addEventListener('submit', this.validate.bind(this), false);
    },
    
    validate: function(e) {
      var elFields = this._els;
      
      for ( var field in elFields ) {
        var el = document.querySelector(field)
          , elVal = el.value;
          
        if ( elFields[field].require || elVal === '' || elVal.length > elFields[field].maxlength ) {
          el.classList.add('invalid');
        }
      }
      
      e.preventDefault();
    }
  
  }
  
})(window, undefined);
</code></pre>

We simply create a new object which are going to inherit directly from our class/object and call the constructor passing the `form ID` and an Object containing an Object called `fields` which contain all fields that need to be validate with our requirements `required` and `maxlength`.

<pre><code data-language="Javascript">
var form1 = Object.create(Validator);
form1.constructor('#form1', {
  fields: {
    '#fname': {
      required: true,
      maxlength: 20
    },
    '#lname': {
      maxlength: 10
    }
  }
});
</code></pre>

As a reference the HTML markup looks like this.

<pre><code data-language="html">
<form id="form1">
    <fieldset>
        <legend>Person</legend>
        <p>
            <label for="fname">First name:</label>
            <input type="text" name="fname" id="fname" />
        </p>
        <p>
            <label for="lname">Last name:</label>
            <input type="text" name="fname" id="lname" />
        </p>
        <input type="submit" name="submit" class="submit" value="Submit" />
    </fieldset>
</form>
</code></pre>

Note that we can use a different design pattern to just the `constructor` method be accessible, but let's keep it simple. <br>
Also note that in ES6 this OO Approach are going to very clear on how to use the API.

Cheers!