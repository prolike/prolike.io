---
title: Gigs
layout: gig
---

{% for gig in site.gigs %}
### [{{ gig.title }}]({{gig.url}})
{: style="padding-top:1em;"}
{{ gig.excerpt | strip_html | strip_newlines }} _[...read more]({{gig.url}})_
{: .kicker}
{% endfor %}
