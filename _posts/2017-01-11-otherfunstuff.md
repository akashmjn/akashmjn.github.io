---
layout: archive
title: Other fun stuff
categories: 
tags: []
header:
  feature:
  teaser:
  thumb:
---

I like doing these things when I'm not working. Also, I'm passionate about music. 

<div class="grid__wrapper">
{% for post in site.posts %}
    {% if post.categories contains 'otherfunstuff' %}
        {% include archive-single.html type="grid" %}
    {% endif %}
{% endfor %}
</div>
