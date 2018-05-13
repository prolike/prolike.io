---
title: Web development - we're Jammin'
---

Web development using a pure JAM stack; JavaScript, APIs and Markdown. It's static, secure, fast,
programmable, immutable, serverless.
{: .kicker}

## Problem

Is web development even to be considered as software development? Quite a few problems arise if you _don't_ acknowledge it as software. Hacking your way through a traditional CMS like Wordpress or Drupal often leaves you with a monolithic server setup, a relational database dependency and no version control. It's slow and potentially also makes you vulnerable; subject to hacker attacks.

## Features

We're developing a handful of webs for customers, in collaboration with a professional branding an design bureau, [www.phable.io](https:www.phable.io){: target="_blank"}.
All our web development is done using a [JAM stack](https://www.jamstack.org){: target="_blank"} essentially it allows us to consider everything we do as software, working through a Kanban-like approach we continiously deliver every small change, all the way to production. Developers, designers, customers all have easy access to a production-like environment, that can spin up in seconds and make any of the version controlled commits live - right where you want it.

## Solution

We use [Jekyll](https://jekyllrb.com/){: target="_blank"},
which is the engine that GitHub developd to build and deploy [GitHub Pages](https://pages.github.com/){: target="_blank"}.
It's essentially a multi-compiler which implies MarkDown ([KramDown flavour](https://kramdown.gettalong.org/){: target="_blank"}),
[SASS](https://sass-lang.com/){: target="_blank"},
[Liquid](https://help.shopify.com/themes/liquid){: target="_blank"}
and a plugin technology using [Ruby](https://www.ruby-lang.org/en/){: target="_blank"}.

On top of that we're utilizing [Bootstrap](https://getbootstrap.com/){: target="_blank"} and various JavaScript framworks, everything is stored in Git and the only dependency installed is Docker - everything runs inside Docker containers.

On every commit Circle CI kicks in and builds and verifies everything and if it's flawless it's automatically deployed to production.

## Value

Working in a JAM stack is so much more rewarding as a developer, specifically we get to treat web development _as code_. It's just software!

## Technology stack
Jekyll, Liquid, SASS, MarkDown, JavaScript, Bootstrap, REST APIs, Gulp, Docker, Circle CI, Git/GitHub.
