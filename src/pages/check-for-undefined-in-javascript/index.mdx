---
title: Check for undefined in JavaScript
date: '2020-05-03'
spoiler: Something that everyone that has been working with JavaScript for a while has done is checking if a variable is undefined. In this article, I explain which are the different ways that you can use for it and the differences between them.
tags:
  - javascript
  - beginners
---

If you’re writing JavaScript more or less regularly, at some point you’re probably faced with a situation where there was a need to check if a variable is `undefined`.

But, what is the best way to do it?

## The intuitive way

Any programer with experience in other language will use the intuition to figure out:

```js
if (x === undefined) { ... }
```

And this will work without any problem, or almost.

Comparing directly with `undefined` will work on all modern browsers. But old browsers allowed its value to be re-assigned like this:

```js
undefined = 'new value';
```

With this re-assignment, a direct computation will not work as expected.

This behavior was fixed in 2009 with [ECMAScript 5](https://es5.github.io/#x15.1.1.3) :

> **15.1.1.3 undefined**  
> The value of `undefined` is **undefined** (see 8.1). This property has the attributes { [[Writable]]: **false**, [[Enumerable]]: **false**, [[Configurable]]: **false** }.

## The “safe” way

If you have to support old browsers and you’re concerned about someone re-assigning the value of `undefined` there are other ways to do the check.

### Reading the type

You can use the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), that will return the string `"undefined"` so you can check for it.

```js
if (typeof x === "undefined") { ... }
```

**Note:** The `typeof` operator does not throw an error if the variable has not been declared.

### Using `void`

Alternatively, you can use the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) to check for `undefined`. For example:

```js
if (x === void(0)) { ... }
```

In this example, the zero doesn’t have any special meaning. As stated on MDN:

> The **void operator** evaluates the given _expression_ and then returns [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

## Which way is better

In my time as a consultant I learned what’s the best answer for this kind of question: it depends. I would depend on the concrete use case you have but I can give you some tips.

In general, I tend to use the convention that is already present on the codebase. But if you’re writing a new code that will run only on modern browsers I’ll suggest to go for the direct comparison (it’s clear and easy to understand also for people that don’t know JavaScript). For old browsers support, I strongly recommend to create a function `isUndefined` and use the option of your choice inside. Then the code will express their purpose clearly to everyone.
