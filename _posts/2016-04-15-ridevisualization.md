---
layout: single
title: Riffing on Riding Styles in Processing
categories: sideprojects
excerpt: A data visualization of different riders at racetrack tests
tags: []
header:
  feature: 
  teaser: /assets/images/Ride-visual-teaser.png
  thumb:
---

#### Riding Styles

At [Ather](https://www.atherenergy.com/), while examining data from the bunch of sensors on the vehicle I figured that this data could potentially capture a person's 'unique' style of riding. I had accompanied the folks for several tests at a racetrack myself, and noticed that this made a pretty fun and engaging narrative. How did one person ride, how did he/she do compared to the others? 

#### Visualization

Bringing out such nuanced information from a multitude of variables - throttle, acceleration, deceleration, speed, gryos, etc. - was inherently complex, and a cool data visualization seemed like a nice way to tackle this. A few weekends and a lot of pretty pictures later, I built one up in [Processing](https://processing.org/) (A Java-based sketching library) that gave a neat, almost game-like replay of the ride as it was logged. This was unexpectedly complex as I had to write a pre-processing layer, along with some basic sensor fusion to make sure the visual looked nice and was informative. I also had to create custom classes for polygons that would tile up along track path (rounded edges!). 

*Visualization guide - width of chunks: speed, color: acceleration / deceleration intensity, tiny grey bars next to throttle: histogram of throttle positions (rotated vertically)*

The result? A pretty seasoned, agressive rider:

![ride-visualization](/assets/images/Ride-visual.png)

A more ordinary, death-fearing guy:

![ride-visualization2](/assets/images/Ride-visual-2.png)

(NOTE: The above images are screenshots from an interactive applet that would allow for scrubbing and pausing. I'm working on integrating a cool interactive bit using [Processing.js](http://processingjs.org/) soon ). 

#### Geeky comparisons

Naturally, this led to reasonably geeky comparisons within the team. However, was interesting to see the effect of style on range performance: efficient needn't mean much slower. Also might have safety potential: making people more aware of their style relative to driving norms. 

![visualization-comparison](/assets/images/Profiling-2.png)

#### Marketing Event Spin-off

What started as an interesting exercise ended up getting incorporated into a couple of events that were run with early-adopters. Look out for yours truly, and the blobby snakes from above.  

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">A few enthusiasts got to be part of the internal testing day with a beta S340. Few glimpses from the day <a href="https://twitter.com/hashtag/AtherS340?src=hash">#AtherS340</a> <a href="https://t.co/b0C4CLlwFw">pic.twitter.com/b0C4CLlwFw</a></p>&mdash; Ather Energy (@atherenergy) <a href="https://twitter.com/atherenergy/status/750227047914565632">July 5, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

