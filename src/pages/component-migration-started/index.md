---
title: Components migration started
date: '2016-06-05'
spoiler: Start the migration of components from AngularJS to Angular2 in Jangouts.
tags:
  - GSoC
  - Jangouts
---

Another week finished. This past week I could not do as much as I would have
liked. I still at exam time, so I had to spend much of the time studying. But
even so, there has been significant progress with regard to the project. We
have four important points:

1. Fixed the build process for production.
1. Added test runner.
1. Migrated the first component to Angular 2.
1. Added the first test for a migrated component.

## Fixing the build process

Last week we had the development environment ready and also, presumably, the
environment to distribute builds. But throughout the week, I noticed that with
the distributed build, Jangouts have issues with grid elements inside the video chat
room. After a while trying different configurations for Webpack, I found that
the issues were mainly related to the uglify process.

The issue was related to the grid layout system of the video room, which is
implemented using [angular-gridster](http://manifestwebdesign.github.io/angular-gridster/).
So, the problem can come form angular-gridster style or the JavaScript module.
First of all I tried to import directly the CSS of the library without load it
with Webpack. This didn't solve anything. Finally, I found that instead of including
the minified version of the library in `vendors.ts` file, I should use the source
version.

This is a little weird, source and minified version should work in the same way.
Regardless of this, using the source version fix the issue and this will not be
a problem because Webpack minify all the code, including `vendor.ts`.

## Adding test runner

This was easier than I expected. I use the awesome project
[angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)
from [@AngularClass](https://angularclass.com/) as an inspiration source for
implement the test runner in Jangouts. I get the files `webpack.test.js` and
`karma.conf.js` and, after some small changes, all worked perfectly. This is one
of the best things of open source community: Don't Repeat Yourself.

## Migrating the first component

I was waiting for this moment since I sent my proposal to GSoC. I started with
the migration of a simple component, probably the simplest component of whole
Jangouts, the footer. The footer in Jangouts only shows a link to
[SUSE](https://www.suse.com/) and the version of Jangouts.

In the old Jangouts (I will start to differentiate between pre and post-migration
process) the footer component was composed by a simple Angular 1 directive with
a template and a [`jade`](http://jade-lang.com/) template, that was rendered by
gulp adding the current version.

The new footer component is equally simple. It's a [TypeScript file](https://github.com/magarcia/jangouts/blob/5db2d9de547d6d56aaed90c633b5d98ce64f6219/src/app/components/footer/jh-footer.directive.ts)
(a component definition with an empty class) and an [Angular 2 template](https://github.com/magarcia/jangouts/blob/5db2d9de547d6d56aaed90c633b5d98ce64f6219/src/app/components/footer/jh-footer.html).
But has a difference with the previous version, neither gulp or any other thing
modifies the template for add the version. Instead, the previous solution, now
Webpack with the [DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)
add the version as a global constant during the build process, reading the
`package.json`.

This has a couple of benefits. First, the footer is now a pure Angular component
and, on the other hand, it's easier to test.

## Adding tests

One of the important things to do during the migration to Angular 2, is adding
tests to the whole platform. And the new footer component has its own tests. It's
nothing complex or really "useful", the tests just check if the `version`
variable is correctly defined. But this test has an extra purpose, it helps me
to check the test runner and the coverage reporter are working correctly.
