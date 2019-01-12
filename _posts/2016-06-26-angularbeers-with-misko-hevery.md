---
layout: post
title: AngularBeers with Miško Hevery
tags:
  - Angular
---

Last Tuesday I enjoyed a talk of [Miško Hevery](http://misko.hevery.com/about/)
about Angular2 thanks to guys of [AngularBeers](http://www.meetup.com/AngularJS-Beers/).
It was a talk about what is coming with Angular 2 and the key point with which
we have to stay is that Angluar leave the concept of frontend framework to
become a full a platform.

![miskohevery](https://magarcia.github.io/img/angularbeers-with-misko-hevery.jpg)
_Sara (a good coworker and better friend), Miško and me_

But, a part from this, I would like to remark a couple of things that will make
Angular 2 a powerful option in a near future.

## Offline compile

What this means? Templates have been one of the places where mistakes are made
since Angular 1. Even if we introduce TypeScript or lint tools, we couldn't be
able to detect mistakes in templates until they are evaluated at the runtime.
Until now Angular 1.X compiles the templates each time they should be rendered.

With Angular 2 (without offline compile) the templates are compiled only once.
But with offline compiling the templates are compiled on build time to
JavaScript so it will be never compiled in the browser.The benefits we obtain
here is that it enables us to statically type-check our templates with
TypeScript, which is awesome, in addition to skipping the runtime compilation
and smaller library size.

## Angular Universal

> Universal (isomorphic) JavaScript support for Angular 2.

With Angular Universal we can run Angular 2 in the server side and this give us
some advantages:

1. **Better Perceived Performance:** The users will instantly see a server rendered
   view which greatly improves perceived performance and the overall user
   experience.
1. **Optimized for Search Engines:** Server-side pre-rendering is a reliable way to
   ensure that all search engines can access your content.
1. **Site Preview:** Ensure that Facebook, Twitter and all other social media apps
   correctly display a preview image of your app. (I deal with this problem before
   and is a pain in the ass)

## Extra: the slides

`iframe:https://docs.google.com/presentation/d/1pIS0dhazArjoDHO1FLK1sEC8iO6rnGLw-WXFIiqafzc/embed?start=false&loop=false&delayms=3000`
