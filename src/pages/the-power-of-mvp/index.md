---
layout: post
title: The power of MVP
date: '2020-01-29'
spoiler: A minimum viable product (MVP) is often linked to the startup world
  but is a very useful tool in large corporations too. And to succeed with it
  is important to have engineering teams be completely engaged.
draft: false
tags:
  - MVP
---

There is a lot of literacy about minimum viable products (MVP) everywhere. I don’t think I could bring to the field more information or value that the one that already exists but I’ll give my point of view on it based on an experience I had working with one client.

![MVP - A skate first, then a bike and finally a car](./mvp.png)

> A minimum viable product (MVP) is a version of a product with just enough features to satisfy early customers and provide feedback for future product development.
>
> [Wikipedia](https://en.wikipedia.org/wiki/Minimum_viable_product)

Let’s start putting this article into context. The client was a leading European company in the real estate field, although I don’t think the domain matters in this case, and the product team had an idea of a quite complex product they want to sell to his customers. In order to know the acceptance by the website users, we run multiple A/B tests to see which was the most successful approach. The product itself was no that complex to implement but the decision of which users should see what, that was another story. We had to take into account the location of the user, in which location was searching, the last visit to the page, etc. The number of values that we had to play with was big, so in order to have enough valuable data to make the proper decision, we ran the tests for almost half a year.

This kind of experiment doesn’t make sense without proper metrics, so we measured everything. Once the test finished, the data analysis team did his job and turns out the values were not the expected ones, neither close to it. Turns out not everything was that bad. One small part of the product had a really good acceptance between users, and one month later the product team came up with a different product based on this small part.

After this, not that small introduction, is where this story begins. This new product did not have the complex rules of the previous one: no location related, neither user visits or search history. The customers will have a special section on the page to show their products and they could share how they prefer with their clients. Now that we had the product (the user-facing part was already implemented for the previous test) was time to make it real and start selling it.

One day we had the meeting to define the architecture and how we were going to do it. The two engineering teams involved, the head of technology and the product owner. Around 14 people in the room (actually virtual rooms since teams were distributed in different countries) discussing what was going to be the best way to implement it and trying to guess when was going to be ready. Someone said because the product needs to be bought by customers we should talk soon or later with the engineering team in charge of this area. The team in charge of the products will have to create a new microservice to handle the new product and the one in charge of the website will have to consume and process this data in order to enable or not the product for a given customer.

All together start to look complex again, first guesses of when it would be done were at least three months, but probably more since it would involve coordination with multiple engineering teams, marketing, design, etc. Listening to all the discussions happening the lazy part of my brain got activated and I asked a key question to the product owner: “_How is this product going to be addressed to the customers in order to sell it in the short term?_”. The answer was the key to find a more easy way to solve this problem. Only a small group of people in the sales team will contact the most important customers to sell the product, at least initially; and after that, they will evaluate which other customers would be interested.

With this new information, I proposed an unorthodox approach for the implementation. Instead of building the complex system, coordinate multiple teams and block the launch until everything is done; why not hardcode the customer id’s on the code and have just a couple of lines to handle the logic. Every time the product sold to a customer, someone just has to send an email to the team and we could add the id in minutes. This, obviously, is not a solution that scales but is not the intention. Since the sales were going to be “manually” at the beginning we can expect the pace of which customers will acquire the product will be controlled.

The proposal I made was actually well received by everyone, this will allow us to start selling earlier and will relieve the pressure on the engineering teams to build the final solution. In just one week we were having the product in place and sold to the first customer. The next months the teams were more relaxed working on the final implementation that will not involve manual interactions anymore.

So, this was the story I want to share. I don’t know if it would be useful for you but at least I learned some important points:

- Keep the implementation as simple as possible, you not only will reach the marked earlier probably you could remove or relax some deadlines.
- Engineering teams should be involved as early as possible on the product definition because different points of view can find a better solution.
- The whole vision of the project should be shared with engineers, not only the part they have to work on since it helps to decide the architecture.

In conclusion, I'm going to keep doing one of the things I consider most important in a developer: being lazy. Because this attitude will help me to find the most easier and fastest way to solve a problem.
