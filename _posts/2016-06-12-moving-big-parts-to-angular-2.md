---
layout: post
title: Moving big parts to Angular 2
tags:
  - GSoC
  - Jangouts
---

In previous post I explained how I convert Jangouts to an hybrid Angular 1+2
application. This approach, instead of a full migration, has two objectives. In
first place test that the functionalities are working correctly is more easy,
because it's possible to run Jangouts and use it. And on the other hand, if I
can't finish the migration, the application will be still usable allowing others
to continue the work. But I hope this last scenario won't be real.

With the hybrid approach applied, this week I have been working on migrate some
components to Angular 2. I started migrating the Chat component, more complex
than the Footer previously migrated, but not enough to be frustrating in these
early stages.

## Migrating subcomponents

The Chat component of Jangouts has three subcomponents, a part of the main
component:

- **`chat-message`**: That handles the render the message sent by the user.
- **`log-entry`**: That handles the notifications sent by the system (like "*The user
X has joined*).
- **`chat-form`**: That handles the input of messages.

These subcomponents are really simple, each one has a component class without
much code and a template. But the key of this migration has been that the styles
was moved from the main `scss` file to independent files for each subcomponent.
This take profit of [Angular 2 View Encapsulation](https://angular.io/docs/ts/latest/guide/component-styles.html#!#view-encapsulation),
ensuring that the styles will be only applied to the component.

During the `chat-message` migration I found a trouble. A problem that comes
from the sue of [ngEmbed](https://github.com/ritz078/ng-embed) library that
provides a directive for render the user messages. This directive allows the
users to use emojis and embed links, images, videos, etc. But as expected the
library hasn't support for Angular 2, so I tried to upgrade the directive with
the [Angular 2 Upgrade Adapter](https://angular.io/docs/ts/latest/guide/upgrade.html#!#how-the-upgrade-adapter-works)
but I found an strange error.

After some investigation, I found that ngEmbed use a function as `templateUrl`
attribute (which is allowed in Angular 1), but in the version of Angular 2 that
I'm currently using with the project, the upgrade adapter don't support this
kind of `templateUrl`. I saw in the master branch of Angular 2 that the code
has been updated to support this functionality, but now neither version
incorporates the change. So after discuss with my mentors we decide to disable
this functionality in Jangouts and keep moving with the migration.

I wish have time to reenable it in the future.

## Differentiate between component and directive

Migrate the main component was more complex. The main component has the list of
all messages (user and system messages) in a view that auto scroll when a new
message arrives. In the old Jangouts, this was one directive that renders the
list of messages and control the auto scroll. But Angular 2 is a different
paradigm. In Angular 2, the correct approach, a component always have a template
and never interacts with the DOM and a directive never have a template and can
interact with the DOM.

So this evidence that the main chat component would be migrated into two
different things:

- A **component** to render the list of messages.
- A **directive** that auto scroll when it's necessary.

After the migration we have the component that renders the list of messages and
inside it the directive that handles the auto scroll.

## Putting all together

During the subcomponents migration, each one was downgraded to be Angular 1
compatible using the provided adapter by Angular 2 and manually tested with the
old version of the main component. When the main component was migrated, this
made that the code of the component was pure Angular 2 (without downgrade the
subcomponents) and the only thing to do to keep the compatibility with the rest
of the Angular 1 application was downgrade the main chat component.

## Applying the correct application structure

The changes applied this week wasn't only in the code, I also update the
application structure following the recommendations of the [style guide](https://angular.io/styleguide#!#application-structure_).
Previous to the migration the application has the following structure:

```
src
└── app
    ├── adapter.ts
    ├── variables.scss
    ├── index.scss
    ├── vendor.scss
    ├── index.ts
    ├── components
    │   ├── chat
    │   │   ├── chat-form.directive.html
    │   │   ├── chat-form.directive.js
    │   │   ├── chat.directive.html
    │   │   ├── chat.directive.js
    │   │   ├── chat-message.directive.html
    │   │   ├── chat-message.directive.js
    │   │   ├── log-entry.directive.html
    │   │   └── log-entry.directive.html
    │   ├── footer
    │   │   ├── footer.directive.html
    │   │   └── footer.directive.js
    │   └── [...]
    └── [...]
```

But after the changes this is the result:

```
src
└── app
    ├── adapter.ts
    ├── variables.scss
    ├── index.scss
    ├── vendor.scss
    ├── index.ts
    ├── chat
    │   ├── index.ts
    │   ├── chat.component.html
    │   ├── chat.component.scss
    │   ├── chat.component.spec.ts
    │   ├── chat.component.ts
    │   ├── chat-form
    │   │   ├── chat-form.component.html
    │   │   ├── chat-form.component.spec.ts
    │   │   ├── chat-form.component.ts
    │   │   └── index.ts
    │   ├── chat-message
    │   │   ├── chat-message.component.html
    │   │   ├── chat-message.component.scss
    │   │   ├── chat-message.component.spec.ts
    │   │   ├── chat-message.component.ts
    │   │   └── index.ts
    │   ├── log-entry
    │   │   ├── index.ts
    │   │   ├── log-entry.component.html
    │   │   ├── log-entry.component.spec.ts
    │   │   └── log-entry.component.ts
    │   └── message-autoscroll.directive.ts
    ├── footer
    │   ├── footer.component.html
    │   ├── footer.component.scss
    │   ├── footer.component.spec.ts
    │   ├── footer.component.ts
    │   └── index.ts
    ├── components
    │   └──  [...] // This contains the not migrated code
    └── [...]
```

## Currently working

Currently I'm working on the migration of Feed component. This is one of the
most complex components in the application because it has a lot of services that
handles the video/audio streams.

Actually I've moved all the services and factories to Angular 2 services, but I
still not enabled the support for work with the Angular 1 code. The reason? I
want to make a full testsuite that tests this services deeply before to continue
with the migration of the rest of the component and make the integration with
the rest of the application.


