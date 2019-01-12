---
layout: post
title: First coding week
tags:
  - GSoC
  - Jangouts
---

First week of coding period at GSoC 2016, so I started the upgrading process of
Jangouts from Angular 1.x to Angular 2. This week, the tasks have been
fulfilled within the deadline, I hope to remain so for the next week.

I'm following the [upgrade guide](https://angular.io/docs/ts/latest/guide/upgrade.html)
from official Angular docs, which has two main blocks:

- Preparation
- Upgrading with The Upgrade Adapter

I just finished the preparation block. I was lucky because the code of Jangouts
is really clear and it follow two important points of the preparation block:
Follow the Angular style guide and use component directives. So this left me
only two things to do. First of all, switch from load files with `<script>`
tags to a module loader and then migrate the code from JavaScript to TypeScript.
But I've done it in reverse order, first migrate to TypeScript and then switch to
a module loader. Why? I think this way is more "natural", at least for this project.

## Migrating to TypeScript
Jangouts has a gulp build system working, so I didn't have to worry about how
the scripts are loaded. First I worry about migrating the files to TypeScript
and when all was ready, then I try to take profit from the `import` syntax of
TypeScript/ES6.

Migrate code from JavaScript to TypeScript is really easy, only need to change
the extension form `.js` to `.ts`. Obviously the existing gulp system not works
with this changes, so in parallel of running gulp you should run
`tsc --watch src/**/*.ts`. This command shows a lot of errors but don't worry
about that, if the JavaScript code is correct all this errors are related to the
type checking process of TypeScript compiler.

During this migration process, I also perform some changes in the code for make
it more modular. Jangouts have all the components registered in the same Angular
module `janusHangouts` and in other projects I worked before I learnt that this
can make some troubles when you have to done unit testing, so I define a
different module for each component (`janusHangouts.componentName`)
and then make it a dependency of the main module. This have to advantages: make
tests is more easy and in a future we can load components on demand with a
module loader (but I'm not sure about the last one).

Back to some I said earlier, when compile the JavaScript code with `tsc` this
shows a lot of errors. One that could appear a lot is something like this:

> `error TS7006: Parameter '$state' implicitly has an 'any' type.`

This is because TypeScript compiler wants a type defined for all variables, but
we can make that `tsc` set the implicit type any for variables without type.
Only thing to do is disable the option `noImplicitAny` in the `tsconfig.json`
file.

Another error we can find when working with HTML elements is:

> `error TS2339: Property 'muted' does not exist on type 'HTMLElement'.`

This error is produced from a code like that:

```javascript
var video = $('video', element)[0];
video.muted = true;
```

The error is produced because TypeScript is type save. So the
`$('video', element)[0]` returns the type `HTMLElement` which does not contain
a `muted` property. The subtype `HTMLVideoElement` does however contain the
`muted` property. So the solution is to cast the result to `HTMLVideoElement`
like this:

```javascript
var video = <HTMLVideoElement>$('video', element)[0];
video.muted = true;
```

Finally, another common error is:

> `error TS2339: Property 'id' does not exist on type '{}'.`

This is another "problem" produced by the type validations of TypeScript. We can
found errors like that in fragments of code similar to:

```javascript
var room = {};

// Some code here...

function isRoom (room) {
	return room.id == roomId;
}

```

To solve this and make the code less error prone, we should define an interface
for the room object.

```javascript
interface Room {
	id?: number  // ? makes the attribute optional
}

// Some code here ...

var room: Room = {};

// Some code here...

function isRoom (room: Room) {
	return room.id == roomId;
}
```


## Using a Module Loader

Why we should use a module loader? We can find the response in Angular site:

> Using a module loader such as [SystemJS](https://github.com/systemjs/systemjs),
> [Webpack](http://webpack.github.io/), or [Browserify](http://browserify.org/)
> allows us to use the built-in module systems of the TypeScript or ES2015
> languages in our apps. We can use the import and export features that explicitly
> specify what code can and will be shared between different parts of the
> application. [...]
>
> When we then take our applications into production, module loaders also make
> it easier to package them all up into production bundles with batteries
> included.

I discard Browserify because I had bad experiences in the past. So I have only
tried with SystemJS and Webpack.

### SystemJS
SystemJS looks really clean, really simple. The only thing I was to do is define
an entry point (normally the main file of the application) and the `import`
syntax do the rest. So, if we have the `import` statements correctly placed, all
works without problem.

But with this solution, we need to conserve gulp, because SystemJS only cares
about the imports. So this implies add the TypesScript compiler to gulp and
disable the auto inject of script ins html.

Sincerely I didn't try that, before try to rewrite the gulp configuration I
wanted to have a look at Webpack first.

### Webpack
The configuration of Webpack is more complex than SystemJS, but it gives a
substitution of gulp. As SystemJS does, we need to define an entry point for the
application and also tell him where is the `index.html` to include the
JavaScript files.

Initially I had some troubles, but after looking some examples, I had a
functional version. Exploring more depth in Webpack I found something that make
me choose it before others: we can `import` or `require` non JavaScript files.
So we can do things like require the template of an Angular directive, and in
the building process this template will be included as a string variable inside
the component, and with styles we have the same feature. This functionality
improves the final build of the application, because all the files needed by a
component will be placed inside the JavaScript file of the component, improving
the performance but without make difficult program it.


## One more thing

This summer looks exciting with all the things I have to learn with GSoC. If
you want to follow the progress of what I'm doing keep update of this blog or
follow my contributions on GitHub. Also I published a
[Trello board](https://trello.com/b/vtQJBxbf/jangouts) with the planning and
things to do with this project (not fully update yet but in progress).

