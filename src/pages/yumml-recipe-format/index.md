---
title: YumML - Yet Another Recipe Metadata
date: '2020-01-06'
spoiler: There are some recipe formats over the internet but they are old, not
  specified or have license restrictions. YumML is an effort to make cooking
  recipes human and machine-readable.
draft: false
tags:
  - Spec
  - Recipe
  - Cooking
  - YumML
---

Some time ago, talking with a friend we realized that there is not a "standard" format to save cooking recipes. At that time I was learning React and one of the first projects I tried to do was a recipe management app. I didn't succeed on that project (as many others I started and never finished) but on the way, I found a draft spec of a recipe format: **YumML**.

This format published at that time on [vikingco.de][vikingcode] but the site is not available anymore. The only references available are from the [Internet Archive][vikingcode internet archive] and the [repository of the page][vikingcode repository] that stills available.

## History

The first draft of the YumML format is from September 21 of 2011, made by Paul Jenkins. You can check the [original specification here][original spec] that I rescued from the old archives I found.

From my point of view, this draft it’s promising as a format for cooking recipes. I want to recover it from the forgiven archives of the Internet and bring it to live again. Also, I would try to add some extra functionalities/specifications.

## Motivation

As the original author of YumML mentioned in his original blog post, I've been investigating a bit about recipe formats for cooking and been clear, most of them suck. The landscape of recipe interchange formats is quite fragmented, but most of them have one thing in common: they are not human-friendly.

A lot of cooking-related software come with a format that usually only that software can work with an understanding. Although some of them can be imported by other programs. [Meal-Master][meal-master] is one of these widely supported formats and due to that, there is a [huge collection of recipes][recipes-collection] available online.

But looking to an example, it doesn't look like something well specified:

```
MMMMM----- Now You're Cooking! v5.65 [Meal-Master Export Format]

      Title: Agua De Valencia
 Categories: beverages, spanish
      Yield: 4 servings

      1    bottle of spanish cava
           -(sparkling wine or; champag
           plenty fresh orange juice
           cointreau
           ice cubes

Put some ice cubes into a large jug and pour over lots of orange juice. Now
add the bottle of cava. Once the fizz subsides, stir in a good dash of the
cointreau and it?s ready to serve.

  Contributor:  Esther P�rez Solsona

  NYC Nutrilink: N0^00000,N0^00000,N0^00000,N0^00000
```

There are some other "famous" formats like:

- [RecipeML][recipeml]
- [Recipe Exchange Markup Language][reml]
- [CookML][cookml]

But they are mainly XML based formats and a real human can’t be able to read and understand a recipe written on that format. If you're interested in finding other recipe formats there is a [list of software related cooking formats][recipe-formats].

It's worth to mention some formats that came with the age of the Internet. The HTML microdata like [Google rich snippets][google-rich-snippets] and the [schema.org microdata][schema.org] are widely used by commercial recipe sites. Although the main objective of microdata is to make content machine-readable (especially for SEO purposes), recipes nowadays are thought to be read and executed by a human.

Finally, I found [pesto][pesto] that aims to make a simpler human-readable format, but I find difficult to understand for someone that is not used to the syntax.

## Original design considerations

The original author of YumML had some considerations in mind during the design of the format:

- It does not need a long reference guide.
- It can be easily read by non-technical people in the "raw" format.
- It can be translatable between imperial and metric.
- Want something like the _markdown_ of recipes (but still easy to parse with software).

YumML is based on YAML to create a human _and_ system readable format.

**From [yaml.org](https://yaml.org/)**

> What It Is: YAML is a human-friendly data serialization standard for all programming languages.

## Goals

From my side, I want to define more formal goals for the spec.

> The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119][rfc-2119].

- **MUST** be human **and** system readable.
- **MUST** be self-contained, so it **MUST NOT** require additional resources to be interpreted.
- **MUST** have support for different metric systems _(metric, imperial)_.
- **MUST** be easy to process using already existing tools.
- **SHOULD** be easy to translate into different languages _(recipes have a strong cultural influence and language should not be a barrier to someone that wants to understand)_.
- **SHOULD** be easy to extend in the future.

## Spec

There are three main sections that every recipe must include: the header (that is not formally defined), the ingredients list and the instructions.

### Header

The header is an implicit section where all the attributes are placed at the root level of the file. All the attributes should be placed at the top of the file.

````yaml live=true
- name: name
description: 'Name of the recipe.'
type: string
required: true - name: date
description: 'Date of the recipe.'
type: date
required: false - name: time
description: 'How long the recipe would take.'
type: string
required: false - name: author
description: 'Author of the recipe.'
type: string
required: false - name: servings
description: 'How many servings the recipe is sized for (eg: tomato soup with 4 servings means is for 4 people, but chocolate cookies with 20 servings means is going to make 20 cookies).'
type: number
required: false - name: description
description: 'A more detailed description of the recipe.'
type: string
required: false - name: rating
description: 'Rating of the recipe.'
type: float
required: false - name: tags
description: 'Tags of the recipe.'
type: list
<string>

- **name**:
  - description: `Name of the recipe.`
  - type: <span style="color:blue">string</span>
  - required: `true`
- `date`:
  - description: Date of the recipe.
  - type: `string` (full-date notation as defined by [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6), for example, _2017-07-21_)
  - required: false
- `time`: (_optional_) How long the recipe would take.
- `author`: (_optional_) Author of the recipe.
- `servings`: (_optional_) How many servings the recipe is sized for (eg: tomato soup with 4 servings means is for 4 people, but chocolate cookies with 20 servings means is going to make 20 cookies).
- `description`: (_optional_) A more detailed description of the recipe.
- `rating`: (_optional_) Rating of the recipe.

#### Example

​```yumml
name: Mrs. Fields Choc-Chip Cookies
date: 2011-09-21
time: 25 minutes
serves: 1
makes: 25
tags:
  - cookies
  - chocolate
````

[vikingcode]: http://vikingco.de/
[vikingcode internet archive]: https://web.archive.org/web/20160730232450/http://vikingco.de/
[vikingcode repository]: https://github.com/vikingcode/vikingcode.github.io
[original spec]: https://gist.github.com/magarcia/5897a8078a0e816df04eb7b56f026b02#file-yumml-spec-md
[rfc-2119]: https://tools.ietf.org/html/rfc2119
[meal-master]: http://web.archive.org/web/20151029032924/http://episoft.home.comcast.net:80/~episoft/
[recipes-collection]: http://www.ffts.com/recipes.htm
[recipe-formats]: http://microformats.org/wiki/recipe-formats
[recipeml]: http://www.formatdata.com/recipeml/index.html
[reml]: http://reml.sourceforge.net/
[cookml]: http://www.kalorio.de/index.php?Mod=Ac&Cap=CE&SCa=../cml/CookML_EN
[google-rich-snippets]: https://developers.google.com/search/docs/data-types/recipe
[schema.org]: http://schema.org/Recipe
[pesto]: https://6xq.net/pesto/
