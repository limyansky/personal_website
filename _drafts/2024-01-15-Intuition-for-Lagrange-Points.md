---
layout: post
author: brent
title:  "Lagrange Points: Developing an Intuition"
image: assets/images/lagrange_article/lagrangePoints.jpg
date:   2024-01-15
categories: [Physics, Mathematica]
comments: true
---

When two bodies in space orbit one-another, there exist special equilibrium points around them where small satellites will feel no net force.
These locations are called Lagrange points, and they are essentially parking spots where satellites can stay in the same location relative to the two bodies without expending any fuel (at least, in a perfect universe).
The Lagrange points for the Sun and Earth are shown in the image below, labeled L1-L5.

![Lagrange Point Diagram](/assets/images/lagrange_article/lagrangePointsSimple.png)
By Xander89-File:Lagrange_points2.svg,CC BY 3.0, [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=36697081)

Most people have some familiarity with the so-called centrifugal force. This is  the name we give to the force that pulls a string taught when we, say, hit a teather ball, and is shown below in red. 

By Svjo-File:CentrifugalForce.png,CC BY SA 3.0, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:CentrifugalForce.png)

The key to understanding Lagrange points is realizing our satellite also experiences an outward Centrifugal force as it orbits along with the two bodies.
When this outward force balances the inward force of gravity, you get a Lagrange point.
In this regard, L1-L3 are the most visibly-intuitive Lagrange Points.
At these locations, the orbiting bodies exert a gravitational force either exactly in line with the satellite's centrifugal force. When the gravitational force exactly cancels the centrifugal force, you get a Lagrange point. 

The story is very much the same for L4 and L5, although the gravitational force cancelling the centrifugal force is somewhat harder to visualize.
It was in search of this visualization that I create this notebook.

## Single-Body Gravitational Potential

![Single-Body Gravitational Potential](/assets/images/lagrange_article/singleObject.jpg)

![Centrifugal Potential](/assets/images/lagrange_article/centrifugalPotential.jpg)

![Adding Spin](/assets/images/lagrange_article/spin.gif)

![Separation of Objects](/assets/images/lagrange_article/separation.gif)

![Changing Ratio](/assets/images/lagrange_article/ratio.gif)

![Lagrange Points](/assets/images/lagrange_article/lagrangePoints.jpg)