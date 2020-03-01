---
title: Dorith's Web Design Rule-og-thumbs
author: Lars Kruse
author-github: https://github.com/lakruzz
image: /images/anything/code-cafe.jpg
tags:
  - web design
description: A neat collection of dos and don'ts when you design web pages and apps using Jekyll
published: false
---

**Table of Contents**
* this unordered seed list will be replaced by toc as unordered list
{:toc}


# Fonts
The fonts you use should tell who you are. Letters are some of the strongest symbols we use, text simply steels the attention. Fonts have built-in sentiments, thats why artists creates thousands of them. They have different readability, weight, color, proportions etc.

Do not underestimate the importance of getting your fonts rights - if need be, hire a graphical designer to create a professional style guide.

## Tip: Define you fonts once and for all

In your `SASS/SCSS` you should define the fonts you want to use in general terms:

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

**Test: search for `font-family`**

A search in your entire `sass|scss` directory should be limited to just one file!


## Tip: Your fonts should be proportional

Pay attention to the fact that `h1` is supposed to be bigger than `h2` etc.

Also make sure, that the fonts are proportional in the media queries you use. A general word of caution is that you should keep the font layout true to it's original definition - probably you HD media query - and then only make small, necessary adjustments between the media queries, if you can get aways with nothin else than scaling the size, that is desirable.

Keep it simple! You should restrain yourself from redefining something you've already defined once - if possible.

**Test: Check the number of redefinitions**
If your IDE supports searchthroughout the `sass|scss` directory using this regular expression:
`^\s*h\d\s*\{` If will fined (`scss` syntax) all the definitions - and redefinitions of headers all headers  Consider do you really need all of them?

## Tip: Support the code syntax highlighter

Especially for code centric blog posts it's important to support the syntax highlighter in your `<code>` blocks.

If your jekyll is up-to-date the `rouge` module should come pre installed (if nor install it with `gem install rouge`) and in your `_config.yml` file make sure to include:

```yaml
highlighter:rouge
```

 Next use the `rougify` CLI to generate the `syntax.css` file you wan to use.  Rouge has several styles built-in can generate.

 To list them all run `rougify help style`

 I generated them all in one go like this:

 ```bash
 for THEME in base16 base16.dark base16.light base16.monokai base16.monokai.dark base16.monokai.light base16.solarized base16.solarized.dark base16.solarized.light colorful github gruvbox gruvbox.dark gruvbox.light igorpro molokai monokai monokai.sublime thankful_eyes tulip
 do
   rougify style $THEME > css/rouge/syntax.$THEME.css
 done
 ```

Now simply add the link to the stylesheets - like this.

```html
<link href="/css/rouge/syntax.monokai.css" rel="stylesheet" >
```
