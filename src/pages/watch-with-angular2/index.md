---
title: $watch with Angular 2
date: '2016-07-04'
spoiler:
tags:
  - GSoC
  - Jangouts
---

In my [previous post](/2016/07/03/events-in-angular2/), I was talking about how
to implement events from Angular 1 in Angular 2. But in the snippet of code that
I use as an example we can find another thing that not exists in Angular 2:
`$watch`.

I start defining the problem. We can have a directive or Angular 1 component
like that:

```js
var module = angular.module("myApp");

module.directive('exampleDirective', function () {
  return {
    template: '<div>{{internalVar}}</div>',
    scope: {
      externalVar: "="
    },
    controller: function(scope, element) {
      scope.$watch('externalVar', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          scope.internalVar = newVal;
        }
      });
    }
});
```

If we want to migrate this code to Angular 2 we find a trouble: the new Angular
don't have `scope`, so it don't have `$watch`. How we can watch a directive
attribute? The solution is the **set** syntax from ES6.

> The **set** syntax binds an object property to a function to be called when
> there is an attempt to set that property.

_From [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/set)_

So we can bind the input for a component to a function that does the same as the
`$watch` function.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'example-component'
})
export class ExampleComponent {
  public internalVal = null;

  constructor() {}

  @Input('externalVal')
  set updateInternalVal(externalVal) {
    this.internalVal = externalVal;
  }
}
```
