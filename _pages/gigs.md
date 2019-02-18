---
title: Gigs
layout: gigs
---

{% for gig in site.gigs %}
### [{{ gig.title }}]({{gig.url}})
{{ gig.date | date: "%d %b, %Y" }}
{: style="padding-top:1em;"}
{{ gig.excerpt | strip_html | strip_newlines }} _[...read more]({{gig.url}})_
{: .kicker}
{% endfor %}
