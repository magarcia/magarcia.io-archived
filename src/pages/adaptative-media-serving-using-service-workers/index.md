---
title: Adaptive Media Serving using Service Workers
date: '2019-06-17'
spoiler: Everyone has experienced how visiting a web site over a slow network connection usually takes ages to load. We are going to explore how to load different media content using the Network Information API.
tags:
  - JavaScript
  - Service Workers
  - performance
---

_Pairing with **[@Ester Martí](https://github.com/estermv)**_

Everyone has experienced how visiting a web site over a slow network connection
usually takes ages to load, making the experience very painful or completely
impossible at all.

When it comes to web development, we usually tend to forget about load
performance focusing more on adding new fancy features. But probably our users
are not using the last brand new MacBook Pro connected to a 1Gps network. Is
more likely that they are using a mid-range or low-end mobile device with a
network connection that in the best case is a 3G connection.

> [In 2018, 52.2% of all global web pages were served to mobile phones.](https://www.statista.com/statistics/241462/global-mobile-phone-website-traffic-share/)

So, taking care about performance is important and one of the most resource
consumings is media delivery. We are going to show how to adapt the media
delivery based on the network connection using the
[Network Information API](http://wicg.github.io/netinfo/). This is an improved
version of an experiment I did with my coworker [@Eduardo Aquiles](https://twitter.com/eduaquiles)
as a React component, similar to what [Max Böck](https://mxb.dev/) explains in
his article about [connection-aware components](https://mxb.dev/blog/connection-aware-components/),
but in this case using service workers.

## The Network Information API

The Network Information API is a draft specification that exposes an interface
to JavaScript with information about the device connection.

The interface consists of a different set of attributes that gives us multiple
information about the network. The most relevant for us in this article are:

- **type:** The [connection type](http://wicg.github.io/netinfo/#dfn-connection-type)
  that the user agent is using. (e.g. ‘wifi’, ‘cellular’, ‘ethernet’, etc.)
- **effectiveType** The [effective connection type](http://wicg.github.io/netinfo/#dfn-effective-connection-type)
  that is determined using a combination of recently observed [rtt](http://wicg.github.io/netinfo/#dom-networkinformation-rtt) and [downlink](http://wicg.github.io/netinfo/#dom-networkinformation-downlink) values. (_[see table](#effectivetype-values)_)
- **saveData** Indicates when the user requested a reduced data usage.

### effectiveType values

<table>
   <thead>
      <tr>
         <th>ECT</th>
         <th>Minimum RTT (ms)</th>
         <th>Maximum downlink (Kbps)</th>
         <th>Explanation</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td data-column="ECT">slow‑2g</td>
         <td data-column="RTT">2000</td>
         <td data-column="Downlink">50</td>
         <td data-column="Explanation">The network is suited for small transfers only such as text-only pages.</td>
      </tr>
      <tr>
         <td data-column="ECT">2g</td>
         <td data-column="RTT">1400</td>
         <td data-column="Downlink">70</td>
         <td data-column="Explanation">The network is suited for transfers of small images.</td>
      </tr>
      <tr>
         <td  data-column="ECT">3g</td>
         <td data-column="RTT">270</td>
         <td data-column="Downlink">700</td>
         <td data-column="Explanation">The network is suited for transfers of large assets such as high resolution images, audio, and SD video.</td>
      </tr>
      <tr>
         <td  data-column="ECT">4g</td>
         <td data-column="RTT">0</td>
         <td data-column="Downlink">∞</td>
         <td data-column="Explanation">The network is suited for HD video, real-time video, etc.</td>
      </tr>
   </tbody>
   <caption align="bottom">Table of <a href="http://wicg.github.io/netinfo/#dfn-effective-connection-type">effective connection types (ECT)</a></caption>
</table>

### Browser support

The API does not have a full browser support yet, but is [supported by the most
popular mobile browsers](https://caniuse.com/#feat=netinfo)
which are the ones where this technique will have more impact.

![Browser support for Network Information API](./caniuse.png)

In fact, 70% of mobile users have this API enabled on their device.

## Adaptive Media Serving

Our purpose will be to serve different media resources based on the information
that we get from the `effectiveType` attribute. When we talk about different
media resources it could be a complete different media, like switching between
HD video, HD image or low quality image, the approach suggested by
[Addy Osmani](https://addyosmani.com/blog/adaptive-serving/).

In this example we are going to use different compression levels for the same
image.

First we need to get the proper quality based on the network conditions. This is
easily reachable using the next snippet:

```javascript
function getMediaQuality() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) {
    return 'medium';
  }

  switch (connection.effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'low';
    case '3g':
      return 'medium';
    case '4g':
      return 'high';
    default:
      return 'low';
  }
}
```

Imagine that we have an image server where we can specify the quality of the
image that we want with a query parameter **quality** as `low`, `medium` or
`high`. Therefore we can set the quality on the `src` attribute of the images
tags as it follows:

```html
<img src="http://images.magarcia.io/cute_cat?quality=low" alt="Cute cat" />
```

```javascript
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.src = img.src.replace('low', getMediaQuality());
});
```

It is important to notice that the default quality set on the image is `low`,
which means that devices will load first the low quality image and then if it
has a high-speed connection will load the better quality one.

Then the JavaScript snippet above will get all the images in the document and
will replace the quality parameter to the appropriate one based on what the
`getMediaQuality` function returns. If the quality is `low` is not going to do
more requests, but if it changes it will do two requests: one with the `low`
quality image when the browsers parses the `img` tag and another one with
`medium` or `high` quality when the JavaScript code is executed.

This is not ideal but it will improve load times on slow networks. But for
medium/high connection networks, as we mentioned before, it will make two
requests for each image consuming more data than needed.

## Using Service Workers

The problem mentioned regarding the two request can be fixed using
[service workers](https://developers.google.com/web/fundamentals/primers/service-workers/),
intercepting the request made by the browser and replacing it with the
appropriate quality for the image.

First, we need to register our service worker:

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(
      function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      function(err) {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}
```

Next, we add a listener for the fetch event, which for all the images requested
from the site will append the right quality parameter using the `getMediaQuality`
function created in the previous section.

```javascript
self.addEventListener('fetch', function(event) {
  if (/\.jpg$|.png$|.webp$/.test(event.request.url)) {
    const url = event.request.url + `?quality=${getMediaQuality()}`;
    event.respondWith(fetch(url));
  }
});
```

And we don’t need to specify the quality parameter on the `img` tag anymore
since the service worker will be in charge of that.

```html
<img src=“http://images.magarcia.io/cute_cat” alt=“Cute cat”/>
```

## The code

You can find the code of this post (a more complete, clean and with less bugs)
on [this GitHub repo](https://github.com/estermv/adaptative-media-serving).

## Further Reading

- [Network Information API](http://wicg.github.io/netinfo/)
- [Network Information API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
