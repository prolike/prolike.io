---
title: Gigs
layout: gigs
---

{% assign sorted = site.gigs | sort: gig.date | reverse %}
    {% for gig in sorted %}

### [{{ gig.title }}]({{gig.url}})
Date: {{ gig.date | date: "%d %b, %Y" }}
{: style="padding-top:1em;"}
{{ gig.excerpt | strip_html | strip_newlines }} _[...read more]({{gig.url}})_
{: .kicker}

{% endfor %}
