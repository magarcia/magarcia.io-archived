---
layout: post
title: Events in Angular2
date: '2016-07-03'
spoiler: About how to migrate events from AngularJS to Angular2.
tags:
  - GSoC
  - Jangouts
---

During the migration of the feed component, I found some lines that I didn't
know how to code it on Angular 2. The following code is an extract of the code
I'm talking about:

```typescript
if (!feed.isLocalScreen) {
  // Until this timeout is reached, the "you are muted" notification
  // will not be displayed again
  var mutedWarningTimeout = now();

  scope.$on('muted.byRequest', function() {
    mutedWarningTimeout = secondsFromNow(3);
    MuteNotifier.muted();
  });

  scope.$on('muted.byUser', function() {
    // Reset the warning timeout
    mutedWarningTimeout = now();
  });

  scope.$on('muted.Join', function() {
    mutedWarningTimeout = now();
    MuteNotifier.joinedMuted();
  });

  scope.$watch('vm.feed.isVoiceDetected()', function(newVal) {
    // Display warning only if muted (check for false, undefined means
    // still connecting) and the timeout has been reached
    if (newVal && feed.getAudioEnabled() === false && now() > mutedWarningTimeout) {
      MuteNotifier.speaking();
      mutedWarningTimeout = secondsFromNow(60);
    }
  });
}
```

As you can see in the snippet, if the condition is true then the directive
listens for events of type `muted.byRequest`, `muted.byUser` and `muted.Join`.
The code that involves this events is easy, without any type of complexity (for
now we ignore the `$watch`).

But, wait a minute, I have read the documentation of Angular 2 like a hundred
times and I don't remember nothing about "events" with Angular 1.X style. That's
because it not exist. Angular 2 don't have a way to make events like in Angular 1,
so I have to find a solution. After a search for a solution, I found [this entry](http://blog.lacolaco.net/post/event-broadcasting-in-angular-2/)
in laco's blog.

## Broadcaster

Basically, the idea is to make a service that implements the `$broadcast` and
`$on` a method as we had in `$rootScope`. To do this we use Observables, very
importants in Angular 2, and for this case, we use a [Subject](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/subjects.md).

```typescript
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface BroadcastEvent {
  key: any;
  data?: any;
}

export class Broadcaster {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus
      .asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.data);
  }
}
```

So, now we can start to use events like in the example:

```typescript
// child.ts
@Component({
    selector: 'child'
})
export class ChildComponent {
  constructor(private broadcaster: Broadcaster) {
  }

  registerStringBroadcast() {
    this.broadcaster.on<string>('MyEvent')
      .subscribe(message => {
        ...
      });
  }

  emitStringBroadcast() {
    this.broadcaster.broadcast('MyEvent', 'some message');
  }
}
```

## How I solved the problem?

I didn't. These events are only to show the user information pop-ups about when
he is muted, so it's not a critical feature. By now these events are fired and
listen in different components, and some of it still implemented in Angular 1.4.

This is a solution I want to share with you, but I'm not sure if this will be
the way that I will use to solve the problem. Because these events probably won't
be necessary when I reimplement the `MuteNotifier`.
