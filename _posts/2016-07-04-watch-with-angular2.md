---
layout: post
title: $watch with Angular 2
tags:
  - GSoC
  - Jangouts
---

In my [previous post](/2016/07/03/events-in-angular2), I was talking about how to implement events from Angular 1
in Angular 2. But in the snippet of code that I use as example we can find
another thing that not exist in Angular 2: `$watch`.

I start defining the problem. We can have a directive or Angular 1 component
like that:

`gist:https://gist.github.com/magarcia/384af019aef2ef465f3e08c5b8f905ec.js?file=example.directive.js`

If we want to migrate this code to Angular 2 we find a trouble: the new Angular
don't have `scope`, so it don't have `$watch`. How we can watch a directive
attribute? The solution is the **set** syntax from ES6.

> The **set** syntax binds an object property to a function to be called when
> there is an attempt to set that property.

_From [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/set)_

So we can bind the input for a component to a function that do the same as the
`$watch` function.

`gist:https://gist.github.com/magarcia/384af019aef2ef465f3e08c5b8f905ec.js?file=example.component.ts`
