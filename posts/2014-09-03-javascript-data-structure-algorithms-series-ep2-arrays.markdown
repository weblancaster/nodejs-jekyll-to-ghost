---
layout: post
title: Ep.2 Data Structures and Algorithms with JS - Arrays

excerpt: This is the second post on the series of Data Structure and Algorithms with JS - focused on Array. Notice that this is a overview/start point for those that need to brush up your knowledge on Arrays where we are going to be using on the future with more complex posts.
---

<div class="intro-series">
    This post is part of the series: Data Structures and Algorithms with JS therefore before continue to read I suggest you <a href="/blog/javascript-data-structure-algorithms-series-ep1/" title="Data Structures and Algorithms Ep.1">the introduction</a> to this series of posts if you haven't read yet. thanks.
</div>

### Brushing up on Arrays

This is the second post on the series of Data Structure and Algorithms with JS - focused on Array. <br>
Notice that this is a overview/start point for those that need to brush up your knowledge on Arrays where we are going to be using in the future on more complex topics.

Every programming language has sort of a built-in Array where you can access data via index and most of these languages has a strict type of Array which would be integer BUT not in Javascript, where Array is also an object which when integers used for index they are converted to strings. <br>
And Array being an object means that it contain properties and functions you can use out of the box.

In Javascript we don't need to define the length of our Array as in C++ and we can have different types of values therefore making Arrays in Javascript flexible and easier to manipulate than other classic languages.

### Creating Arrays

Let's create an Array with length zero:

<pre><code data-language="javascript">
var arr = []; // arr.length = 0
</code></pre>

Now let's create an Array with some elements defined and length equal 5:

<pre><code data-language="javascript">
var arr = ['a', 'b', 'c', 'd', 'e']; // arr.length = 5
</code></pre>

Array with different types would look like:

<pre><code data-language="javascript">
var arr = ['michael', 'lancaster', 23, true, null];
</code></pre>

If you want to verify if an object is an Array you can use the method `Arrays.isArray()`

<pre><code data-language="javascript">
var arr = ['a', 'b', 'c', 'd', 'e'];
Array.isArray(arr); // true

var str = 'Michael Lancaster';
Array.isArray(str); // false
</code></pre>

### Accessing

Use the operator `[]` passing the index to access the value/element.

<pre><code data-language="javascript">
var arr = ['a', 'b', 'c', 'd', 'e'];
console.log( arr[2] ) // c
console.log( arr[4] ) // e
</code></pre>

Also iterating through an Array sequentially

<pre><code data-language="javascript">
var arr = [1, 2, 3, 4, 5];
for ( var i = 0; i < arr.length; i++ ) {
    console.log('Index: ' + i, 'Value: ' + arr[i])
}

// outputs
// Index: 0 Value: 1
// Index: 1 Value: 2
// Index: 2 Value: 3
// Index: 3 Value: 4
// Index: 4 Value: 5 
</code></pre>

Notice on the sample above that the loop is controlled by the length of the Array `arr.length` since in Javascript Array is an object and it can be modified so we guarantee that we have gone through all indexes.

### Array from String

We can also create Arrays from strings defining a delimiter (`space` in my case).

<pre><code data-language="javascript">
var str = 'Michael lancaster 23 and developer';
var arr = str.split(' '); // ["Michael", "lancaster", "23", "and", "developer"]
</code></pre>

### Object Copy

There's several ways of Object copy `Shallow Copy`, `Deep Copy` and `Lazy Copy`.

The `Shallow Copy` is when you assign "A = B" which has the disadvantage of when modifying Array B the Array A will also be modified with same values/elements as B no matter what. Here's an example of `Shallow Copy`.

<pre><code data-language="javascript">
var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var arr2 = arr1;
console.log(arr2) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr1.push('michael');
console.log(arr1) // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "michael"]
console.log(arr2) // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "michael"]
</code></pre>

When we pushed a new value to the end of `arr1` this change is reflected into `arr2`.

A better way to do a copy would be the `Deep Copy` which one don't depend on another but it's a slower operation. <br>
Here's an example of `Deep Copy`

<pre><code data-language="javascript">
var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var arr2 = [];

function deepCopy(arr1, arr2) {
    for ( var i = 0; i < arr1.length; i++ ) {
        arr2[i] = arr1[i];
    }
}

deepCopy(arr1, arr2);

console.log(arr1) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arr2) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr1.push('michael')
console.log(arr1) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "michael"] 
console.log(arr2) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
</code></pre>

In the example above you can notice that the value pushed to `arr1` do not reflected into `arr2`.
Now. `Lazy Copy` is the combination of both operations.

### Array traversal and mutation operations

Array is list-like and also a constructor that contains prototype methods to perform traversal and mutation operations such as:

**Searching a value**

Searching a value can be done with the method `Array.prototype.indexOf()` which perform an operation of comparing with `===` the value passed to the function is found and return it's index position otherwise will return -1.

<pre><code data-language="javascript">
var languages = ['Javascript', 'Java', 'C++', 'Go'];
languages.indexOf('C++') // 2
</code></pre>

Notice that this search operation using the `indexOf` will return the just the position of the `first` value encountered in the Array.
You can also the 'lastIndexOf' which will do the same but return the position of the last value encountered.

<pre><code data-language="javascript">
var languages = ['Javascript', 'Java', 'C++', 'Go', 'Lua', 'C++'];
languages.lastIndexOf('C++') // 5
</code></pre>

**String from Arrays**

There's two methods to return a string representation from an Array `Array.prototype.join()` and `Array.prototype.toString()`. <br>
It's automatically delimited by commas but you can pass your delimiter on the method. Here's an example using `join` and `toString`.

<pre><code data-language="javascript">
var languages = ['Javascript', 'Java', 'C++', 'Go', 'Lua'];
languages.join(); // "Javascript,Java,C++,Go,Lua"
languages.toString(); // "Javascript,Java,C++,Go,Lua"
</code></pre>

**New Array from Array**

There's also multiple methods to create an Array from another Array `Array.prototype.concat()` and `Array.prototype.splice()`.
The `Array.prototype.concat()` method allow you to pass one or more Arrays/Values as argument to create a new Array.

<pre><code data-language="javascript">
var cats = ['Abyssinian', 'Persian', 'Peterbald'];
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
var birds = ['Malleefowl', 'Maleo'];

var petAnimals = cats.concat(dogs, birds);
console.log(petAnimals); // ["Abyssinian", "Persian", "Peterbald", "Alaskan Klee Kai", "American Bulldog", "Pitbull", "Malleefowl", "Maleo"];
</code></pre>

The `Array.prototype.splice()` takes two arguments (minimum) or more. You can also use to add new elements to the middle of an Array. <br>
They are going to be used to mutate the Array therefore it can add new elements and/or remove old elements.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
var removedDogs = dogs.splice(2, 0, "Bull Terrier");
console.log(dogs); // ["Alaskan Klee Kai", "American Bulldog", "Bull Terrier", "Pitbull"]
console.log(removedDogs); // [] empty since no values/elements were removed
</code></pre>

Above the order of my arguments are `.splice(from index, remove, enter new element)` so looking at my arguments we have inserted a new value `Bull terrier` removed `0` and started at index `2`.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
var removedDogs = dogs.splice(1, 1, "Bull Terrier");
console.log(dogs); // ["Alaskan Klee Kai", "Bull Terrier", "Pitbull"]
console.log(removedDogs); // ["American Bulldog"]
</code></pre>

The code above I said .splice `from index 1, remove index 1, insert 'Bull Terrier'` so now the variable `removedDogs` contain the item removed from the index defined which in this case is `1`.

### Adding elements/values to an Array

So instead of use the length of an Array to add an element to the end or even harder to add an element to the beginning of an Array which you would have to iterate through the Array and shift the index from the end towards start.
Anyway. Let's keep it simple with these two methods to add new elements to an Array `Array.prototype.push()` add to the end of an Array and `Array.prototype.unshift()` add to the beginning of an Array (Both methods accept multiple values/elements passed as arguments). <br>

The `push()` function/method add a value/element to the end of an Array.<br>
Here's an example.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
console.log(dogs); // ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];

dogs.push('Bull Terrier');
console.log(dogs); // ["Alaskan Klee Kai", "American Bulldog", "Pitbull", "Bull Terrier"]
</code></pre>

The `unshift()` function/method add a value/element to the beginning of an Array. <br>
Here's an example.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
console.log(dogs); // ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];

dogs.unshift('American Bulldog');
console.log(dogs); // ["American Bulldog", "Alaskan Klee Kai", "American Bulldog", "Pitbull"]
</code></pre>

### Removing elements/values from an Array

There's also two methods to remove values/elements from an Array where you can remove the beginning using `Array.prototype.shift()` or if you want to remove from the end you can use `Array.prototype.pop()`.

Here's an example to remove the first element using the `Array.prototype.shift()` method.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
console.log(dogs); // ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];

dogs.shift();
console.log(dogs); // [ 'American Bulldog', 'Pitbull'];
</code></pre>

And here's an example to remove the last element using the `Array.prototype.pop()` method.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
console.log(dogs); // ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];

dogs.pop();
console.log(dogs); // ['Alaskan Klee Kai', 'American Bulldog'];
</code></pre>

### Ordering/Sorting elements

There's also two ways to order/sort an Array `Array.prototype.reverse()` which are going to do what says and `Array.prototype.sort()` to put elements in order but in this case the method `Array.prototype.sort()` turns every value in strings so if you have numbers you are going to need to pass a function and order the numbers.

Here's an example of `Array.prototype.reverse()`.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];
console.log(dogs); // ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];

dogs.reverse();
console.log(dogs); // ["Pitbull", "American Bulldog", "Alaskan Klee Kai"];
</code></pre>

Here's an example of `Array.prototype.sort()` with strings.

<pre><code data-language="javascript">
var alphabet = ['a', 'b', 'e', 'z', 'f', 'c'];
console.log(alphabet); // ['a', 'b', 'e', 'z', 'f', 'c']

alphabet.sort();
console.log(alphabet); // ["a", "b", "c", "e", "f", "z"]
</code></pre>

And here's an example of how to pass a function to `Array.prototype.sort()` to order numbers.

<pre><code data-language="javascript">
var nums = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
console.log(nums) // [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

nums.sort(function(n1, n2) {
  return n1 - n2;
});

console.log(nums) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
</code></pre>

### Iterator methods

The iterator methods/functions are going to be applied for each value/element and may or may not return a new array, groups of values or just a value as result of the operation.

First let's talk about the `Array.prototype.forEach()` which receive a callback as argument and this callback has three arguments respectively `element`, `index`, `array being traversed` going to iterate on ascending order. <br>
Here's an example using `Array.prototype.forEach()`.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];

dogs.forEach(function(value, index, array) {
    console.log('Dog breed: ' + value + ', position: ' + index);
});

// outputs
// Dog breed: Alaskan Klee Kai, position: 0
// Dog breed: American Bulldog, position: 1
// Dog breed: Pitbull, position: 2 
</code></pre>

Now it's time to show the `Array.prototype.every()` which test a condition against each element and return true in case all elements meet the condition or false. <br>
Also receives a callback as argument and this callback has three arguments respectively `element`, `index`, `array being traversed`.

<pre><code data-language="javascript">
var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var meetCondition = nums.every(function(element, index, array) {
    return (element < 11);
});

console.log(meetCondition) // true
</code></pre>

In the code above all elements are tested against the condition to check if they are less than 11 in our case all elements are less than 11 so the result returned is true.

The method/function `Array.prototype.some()` works almost the same way as `Array.prototype.every()` but in this case if at least one element meet the condition would return true.

<pre><code data-language="javascript">
var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

var meetCondition = nums.some(function(element, index, array) {
    return (element === 11);
});

console.log(meetCondition) // true
</code></pre>

The `Array.prototype.reduce()` method run a function against an accumulator for each element until reduce to one single value.

<pre><code data-language="javascript">
var nums = [100, 200, 300, 400];

nums.reduce(function(a, b) {
	console.log('a', a);
   	console.log('b', b);
   	console.log('result accumulated is: ', a + b);
    return a + b;
});

// output

// a 100
// b 200
// result accumulated is: 300
// a 300
// b 300
// result accumulated is: 600
// a 600
// b 400
// result accumulated is: 1000
</code></pre>

As you can see our method `Array.prototype.reduce()` receive a function with two arguments `previous value` and `current value` a + b which the result turns into the `accumulator` a and then calculate this result against the next in line which is b and so on so forth. <br>
You can also pass `initial value` where it's going to turn into the `previous value` and the original `previous value` turn into `current value`.

<pre><code data-language="javascript">
var nums = [100, 200, 300, 400];

nums.reduce(function(a, b) {
	console.log('a', a);
   	console.log('b', b);
   	console.log('result accumulated is: ', a + b);
    return a + b;
}, 200);

// output

// a 200
// b 100
// result accumulated is: 300
// a 300
// b 200
// result accumulated is: 500
// a 500
// b 300
// result accumulated is: 800
// a 800
// b 400
// result accumulated is: 1200
// 1200
</code></pre>

There's also the possibility to use `Array.prototype.reduceRight()` which is going to perform the function on each element of the array from the end to start.

the `Array.prototype.map()` method works the same way `Array.prototype.forEach()` method works but return a new Array as the difference between the two methods.

<pre><code data-language="javascript">
var dogs = ['Alaskan Klee Kai', 'American Bulldog', 'Pitbull'];

var newArr = dogs.map(function(value, index, array) {
    console.log('Dog breed: ' + value + ', position: ' + index);
    return value;
});

console.log(newArr);

// outputs
// Dog breed: Alaskan Klee Kai, position: 0
// Dog breed: American Bulldog, position: 1
// Dog breed: Pitbull, position: 2 

// ["Alaskan Klee Kai", "American Bulldog", "Pitbull"]
</code></pre>

The `Array.prototype.filter()` method works almost the same way as `Array.prototype.every()` but instead return an Array with the elements that met the condition `true`.

<pre><code data-language="javascript">
var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var numsLessThan5 = nums.filter(function(element, index, array) {
    return (element < 5);
});

console.log(numsLessThan5) // [0, 1, 2, 3, 4] 
</code></pre>

### That's it

I hope you have brush up on your Array knowledge being aware of we can use and will use more complex approaches applying some of the topics I covered on this post. <br>

Cheers!

<small>* Don't be shy. I will appreciate any improvement and/or fix.</small>




