---
title: Predictive diagnosis
layout: single
categories:
---

### The problem

At Ather, I was working on developing features from data being logged from all the scooter subsystems, including motors, accelerometers, batteries, etc. One application was predictive maintenance. Could we accurately diagnose the health of the scooter's subsystems from this data? 

### Drivetrain health

We decided to look at the scooter's drivetrain: the only moving part in a simple electric transmission (pictured below). Wear and tear, accidental damage and bad road conditions could cause this system to lose allignment over time leading to a loss in efficiency (and range), and eventual breakage. 

![drivetrain-schematic](http://2rapid.co.uk/wp-content/uploads/2010/06/drivetrain1.gif)

One of the variables being logged, was high-frequency samples of the current from the motor. First principles suggested that the effect of high-speed rotation of parts might be noticed in the current signals. Using an older and newer vehicle, each tested by swapping a damaged part, we tested this hypothesis. As seen below, the signals do reflect some kind of difference. How do we quantize this?

![drivetrain-currents](/assets/images/drivetrain-1.png)

We used a spectral analysis of these signals to extract features, and discovered that each component, contributed distinct 'spikes' to a frequency signature. A quick qualitative overview of the difference in spikes of each is seen on the circular plot below. 

![drivetrain-signature](/assets/images/drivetrain-sig.png)

These made it possible to build simple regression models to predict not only the overall health of the drivetrain, but even individual components due to their contribution to the signature!

