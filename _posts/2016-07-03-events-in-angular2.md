---
layout: post
title: Events in Angular2
tags:
  - GSoC
  - Jangouts
---

During the migration of the feed component, I found a some lines that I didn't
know how to code it on Angular 2. The following gist is an extract of the code
I'm talking about:

`gist:https://gist.github.com/magarcia/0a299cc1d352ad7e42a46d72817bc035.js?file=jh-feed.directive.js`

As you can see in the snippet, if the condition is true then the directive
listens for events of type `muted.byRequest`, `muted.byUser` and `muted.Join`.
The code that involves this events is easy, without any type of complexity (for
now we ignore the `$watch`).

But, wait a minute, I have read the documentation of Angular 2 like hundred
times and I do not remember nothing about "events" with Angular 1.X style. Thats
because it not exist. Angular 2 don't have a way to make events like in Angular 1,
so I have to find a solution. After search for a solution I found [this entry](http://blog.lacolaco.net/post/event-broadcasting-in-angular-2/)
in laco's blog.

## Broadcaster

Basicaly the idea is to make a service that implements the `$broadcast` and
`$on` method like we had in `$rootScope`. For do this we use Observables, very
important in Angular 2, and in this case we use a [Subject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/subjects.md).

`gist:https://gist.github.com/magarcia/0a299cc1d352ad7e42a46d72817bc035.js?file=broadcaster.ts`

So, now we can start to use events like in the example:

`gist:https://gist.github.com/magarcia/0a299cc1d352ad7e42a46d72817bc035.js?file=example.component.ts`

## How I solved the problem?

I didn't. This events are only to show the user information pop ups about when
he is muted, so it's not a critical feature. By now this events are fired and
listen in different components, and some of it still implemented in Angular 1.4.

This is a solution I want to share with you, but I'm not sure if this will be
the way that I will use to solve the problem. Because this events probably won't
be necessary when I reimplement the `MuteNotifier`.
