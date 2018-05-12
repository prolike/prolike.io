---
title: Blue Prints
layout: blueprint
---

{% for blueprint in site.blueprints %}
### [{{ blueprint.title }}]({{blueprint.url}})
{: style="padding-top:1em;"}
{{ blueprint.excerpt }}
{% endfor %}
