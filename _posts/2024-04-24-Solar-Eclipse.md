---
layout: post
author: brent
title:  "Observing the Eclipse"
image: assets\images\eclipse_article\PinholeEclipse.jpg
date:   2024-04-24
categories: [Physics, Mathematica]
comments: true
---
"We see the same moon, you and I—you in your world and I in mine. I find that comforting."

Its a nice, unattributable sentiment that has been the focus of [movies](https://en.wikipedia.org/wiki/Under_the_Same_Moon), [songs](https://www.youtube.com/watch?v=mx-UzMiNK5A), and [facebook posts](https://duckduckgo.com/?t=h_&q=under+the+same+moon+quote&iax=images&ia=images) the world over.
So... what harm will one more blog post do? 
On April 8, 2024, when a solar eclipse swept through the United States, I had friends who chased it throughout the country, from Texas to New York.

Some more introduction

## My Eclipse Viewing
Of the four perspectives presented in this article, my personal eclipse viewing is the only one from outside the path of totality.
Dropping a pin at my location: 

{:refdef: style="text-align: center;"}
![My Eclipse Viewing Location](\assets\images\eclipse_article\MyLocation.png)
{: refdef}

we can see that I only saw about 83% coverage from my viewing location outside of Atlanta, GA.
According to [NASA](https://science.nasa.gov/eclipses/safety/), the only time it is safe to view the eclipse without some kind of protection is during complete totality.
My solution to this dilemma was a unique mix of basic and fancy: an old [Calumet CC-400](http://camera-wiki.org/wiki/Calumet_CC-400) view camera with a pinhole "lens" consisting of some aluminum foil punctured by a mechanical pencil (Note: This isn't a tutorial or endorsement of this method! If you're interested, instead follow instructions for constructing an "eclipse projector" from NASA or other reputable source.)

{:refdef: style="text-align: center;"}
![My pinhole camera setup](/assets/images/eclipse_article/PinholeCamera.jpg)
{: refdef}

The camera itself (the accordion-like object in the above image) is essentially just empty space - a place to hold the lens on the front, a place to hold film on the back, and a light-tight tube connecting the two.
When the film is removed, the lens instead projects an image on a piece of ground glass, allowing you to compose a photo (as long as you're in a dark enough space, which is why old photographers are often seen huddling under a cloth hood).
The resultant image on the ground glass is upside-down, something handheld cameras correct with a pentaprism, and backwards, due to viewing the image "from behind" as it is projected on the ground glass. 
See the image below, taken by [Cameron Shaw](https://www.flickr.com/photos/camshaw/51280977749/in/pool-camerawiki/), as an example of these effects: 

{:refdef: style="text-align: center;"}
![Camera Effects](/assets/images/eclipse_article/GroundGlass.jpg)
{: refdef}

The result wasn't the prettiest thing in the world, but it worked! At 3:10 pm, I snapped the photo of the eclipse shown to the right below. 
Unsurprisingly, it matches perfectly with Mathematica's visualization for my time and location (shown on the left)! 
It is easy to see the mirroring I mentioned earlier, and if you look closely enough, you can make out the inversion as well. 

{:refdef: style="text-align: center;"}
![My Eclipse](/assets/images/eclipse_article/Comparison.png)
{: refdef}

## My Friends' Eclipses

As I mentioned earlier, I had friends travel to Dallas, Texas; Rochester, New York; and Mt. Nebo, Arkansas to view the eclipse in totality.
I've added pins for all four locations to the map below:

{:refdef: style="text-align: center;"}
![My Friends](/assets/images/eclipse_article/FriendLocations.png)
{: refdef}

Rochester was cloudy, so the best my friend could send was a snapshot of the 360 degree sunset during totality.
Nonetheless, its still cool to look at all four locations simultaneously to "watch" the eclipse transit the US!
In the graphic below, the top row of animated images show the view of the eclipse across time from each of the four locations.
Each frame of the graphic is synced in time - the only difference is the viewing location.
The bottom row of images show a snapshot of the eclipse during maximum coverage, again from each of the four locations.

{:refdef: style="text-align: center;"}
![The Eclipse from Different Cities](/
assets/images/eclipse_article/DifferentCities.gif)
{: refdef}

There are a couple interesting things to note about this graphic.
One of these I already spoke about - my location in Atlanta didn't get full coverage, a feature which is well represented in the animation.
Otherwise, I think its just interesting to look at the relative timing of the eclipse at the different locations.
Texas gets totality first, followed by Arkansas shortly after, I get my 83% brush in Atlanta, and, finally, my friend in New York is the last to observe totality. 

## Further Reading
The eclipse diagrams I used in this article (both the map and sun/moon visualizations) were produced in Mathematica.
The creator this program, Stephen Wolfram, has written both a [book](https://www.amazon.com/Predicting-Eclipse-Multimillennium-Tale-Computation/dp/1579550878/) and a detailed [blog post](https://writings.stephenwolfram.com/2024/03/computing-the-eclipse-astronomy-in-the-wolfram-language/) about solar eclipses.
Although I haven't read his book, the aforementioned blog post served as inspiration for this article.
If you'd like further details about different eclipse-related calculations you can do in Mathematica, it is definitely worth checking out!

Every time I pick up Mathematica, I'm constantly amazed at how much you can do with so little coding, and this project was no exception.
If you want to check it out yourself, my notebook is available on [GitHub](https://github.com/limyansky/MyEclipse_2024).
If you don't have access to a copy of Mathematica, I've also saved a copy of my notebook as a [pdf you can view anywhere](https://github.com/limyansky/MyEclipse_2024/blob/main/EclipseCalculations.pdf).
The presentation isn't as polished as it is here, but its still a nice look at how everything was done. 

Thanks for reading!