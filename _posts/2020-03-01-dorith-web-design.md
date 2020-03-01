---
title: Dorith's Web Design Rule-og-thumbs
author: Lars Kruse
author-github: https://github.com/lakruzz
image: /images/anything/code-cafe.jpg
tags:
  - web design
description: A neat collection of dos and donts when you design web pages and apps
published: false
---


# Fonts
The fonts you use should tell who you are. Letters are some of the strongest symbols we use, text simply steels the attention. Fonts have built-in sentiments, they have different readability, weight, color, proportions etc.

You wanna get this right!

#### Tip: define you fonts once and for all

In your `SASS/SCSS you should define the fonts you want to use in general terms:

* `serif-font`
* `sans-serif-font`
* `stencil-font`
* `mono-space-font`

Or an alternative approach could be to use more semantically meaningful names like:

* `body-text-font`
* `header-font`
* `caption-font`
* `code-font`

But regardless what approach you use, you should put all af these definitions in _the same_`sass|scss` file.

It could be as a `@mixin` in a `_font_mixins.scss` file

```scss
@mixin sans-serif-font() {
  font-family: 'Montserrat', Arial, sans-serif;
}
```

Which you will then use in your `_global.scss` or `_typography.scss` file

```scss
h1, h2, h3, h4 {
    @include sans-serif-font;
    font-weight: bold;
}
```

#### Tip: You fonts should be proportional

Pay attention to the fact that `h1` is supposed to be bigger than `h2` etc.

Also make sure, that the fonts are proportional in the media queries you use. A general word of caution is that you should keep the font layout true to it's original definition - probably you HD media query - and then only make small, necessary adjustments between the media queries, if you can get aways with nothin else than scaling the size, that is desireable.

Keep it simple!
