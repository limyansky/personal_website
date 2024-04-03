---
layout: post
author: brent
title:  "Exploring My Lifetime Spotify History"
image: assets/images/spotify_article/Dashboard.png
date:   2024-02-05
categories: [Data Analysis, Tableau]
comments: true
---

I went out to dinner with some close friends the other night, when the topic of music came up. 
We spent some time reminiscing about what we saw as the defining stages of our lives, and how our music tastes changed and developed along with us.
Inspired by this conversation, I decided to see if I could take a more quantitative approach to analyzing this nostalgia.
Conveniently, Spotify has been my main source of music for the last decade, and they both maintain their users' lifetime streaming history and provide a convenient (-ish, if you're willing to wait a month and know how to work with .json files) manner of downloading it.
Thus, the stage was set, and it was off to Tableau to see what insights I could find! 

Below, you'll find a summary of the insights I gained from working on this visualization.
Afterwords, I spend some time going into the technical details of the project.
I have included some screenshots, but I encourage you to check out the interactive form on Tableau Public (embedding the dashboard on this website was a bit too slow).
I've also included a link to some helper scripts on GitHub, helped to turn the .json file I received from Spotify into a spreadsheet that was easier to work with.
There is also a helper script which makes use of the Spotify API to add genre information, something which wasn't included in the file I downloaded. 

[Tableau Public](https://public.tableau.com/app/profile/brent.limyansky/viz/MySpotifyData_17066362308130/Dashboard12)
[GitHub](https://github.com/limyansky/my_spotify)

{% comment %}
<div class='tableauPlaceholder' id='viz1707182650418' style='position: relative'>
	<noscript>
		<a href='#'>
			<img alt='Dashboard 1 (2) ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;My&#47;MySpotifyData_17066362308130&#47;Dashboard12&#47;1_rss.png' style='border: none' />
		</a>
	</noscript>
	<object class='tableauViz'  style='display:none;'>
		<param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> 
		<param name='site_root' value='' />
		<param name='name' value='MySpotifyData_17066362308130&#47;Dashboard12' />
		<param name='tabs' value='no' />
		<param name='toolbar' value='yes' />
		<param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;My&#47;MySpotifyData_17066362308130&#47;Dashboard12&#47;1.png' />
		<param name='animate_transition' value='yes' />
		<param name='display_static_image' value='yes' />
		<param name='display_spinner' value='yes' />
		<param name='display_overlay' value='yes' />
		<param name='display_count' value='yes' />
		<param name='language' value='en-US' />
	</object>
</div>
<script type='text/javascript'>                    
	var divElement = document.getElementById('viz1707182650418');
	var vizElement = divElement.getElementsByTagName('object')[0];
	if ( divElement.offsetWidth > 800 ) 
		{ vizElement.style.width='1366px';
		  vizElement.style.height='795px';} 
	else if ( divElement.offsetWidth > 500 ) 
		{ vizElement.style.width='100%';
          vizElement.style.height=(divElement.offsetWidth*0.75)+'px';} 
    else { vizElement.style.width='100%';vizElement.style.height='1927px';}
	var scriptElement = document.createElement('script');
	scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
</script>
{% endcomment %}

[Tableau Public](https://public.tableau.com/app/profile/brent.limyansky/viz/MySpotifyData_17066362308130/Dashboard12), 
[GitHub](https://github.com/limyansky/my_spotify)

# The Best Things I Learned
My single favorite takeaway from this project was seeing how steeply my listening dropped off when I was working on my Master's Degree.
This was definitely the most social part of grad school for me, where we were either TAing or working on homework problems together nearly all the time.
Apparently I wasn't selected to be DJ...

{:refdef: style="text-align: center;"}
![Actual Handout](/assets/images/spotify_article/Jackson.png)  
Part of an _actual_ handout given to us by our electromagnetism professor (original by Davon Ferrara).
{:refdef}

{:refdef: style="text-align: center;"}
![Grading](/assets/images/spotify_article/Grading.jpg)  
A selfie of the author grading tests with his classmates.
{:refdef}

I also really liked using it to explore genres that, despite listening to, I didn't know existed.
For example, neo mellow was something I'd listened to quite a bit, yet I'd never heard of it before.
Selecting it on my dashboard shows me my top neo mellow artists...  

{:refdef: style="text-align: center;"}
![Neo Mellow](/assets/images/spotify_article/NeoMellow.png)  
{:refdef}

and give me this fun moment where I thought to myself "now that you mention it, I kinda see what these guys have in common".  

Now, I'm searching neo mellow playlists on Spotify and finding new things to listen to! 

My overall listening history also reminds me of [PSR J0218+4232](https://iopscience.iop.org/article/10.3847/1538-4357/ac20d7), so that's neat too.   
![A pulsar in my thesis.](/assets/images/spotify_article/Pulsar.jpg)

There's really a lot to dig into, and I look forward to seeing other ways in which I use this dashboard in the future!

# Technical Details
[GitHub](https://github.com/limyansky/my_spotify)

## Getting the Data from Spotify
Spotify is constantly gathering data about how you interact with their services.
As a part of their data transparency policy, they will allow you to [request](https://support.spotify.com/us/article/data-rights-and-privacy-settings/) this data so that you know exactly what it is they are collecting.
The three types of user data you can download from Spotify are: account data, technical log information, and extended streaming history.
There's actually quite a lot of data they collect, which you can read about on [their website](https://support.spotify.com/us/article/understanding-my-data/).

This project utilized only the "extended streaming history" data set.
This covers the lifetime of your account, and includes:
- Date/Time of Stream
- Number of milliseconds track was played
- Track name
- Artist name
- Album name
- Track URI (Spotify's unique identifier)
- And More! 

After requesting this data, it took about two weeks for it to be delivered.
They guarantee the data within 30 days of request.

Most of the data I used in my dashboard was directly listed in the extended streaming history.
However, while I think genre of music best tells the story of my music tastes, this isn't included in your extended history!
Which leads me to...

## The Spotify API
If you aren't familiar, API stands for "application programming interface", and is a simple way for apps to talk to one another. For example, here's an "API Endpoint" that asks the "REST Countries API" to give you information about Russia:  
{:refdef: style="text-align: center;"}
[https://restcountries.com/v3.1/name/Russia](https://restcountries.com/v3.1/name/Russia)  
{:refdef}

If you instead want to know information about Germany, you can change the address to:  

{:refdef: style="text-align: center;"}
[https://restcountries.com/v3.1/name/Germany](https://restcountries.com/v3.1/name/Germany)  
{:refdef}

The idea is that your program is able to ask simple questions in this format ("Tell me about Germany"), and get an answer that is easy for the computer to understand and work with.

The [Spotify API](https://developer.spotify.com/documentation/web-api) is free, but does require you to make a developer account and generate some credentials for yourself before you can use it. 
If you want a fun example of the kind of app you can build around this, check out [statsforspotify.com](https://www.statsforspotify.com/).
After logging into your account, this website gives you details such as your top artists over a 4-week or 6-month time period, or the lifetime of your account. 
Why only these time periods?
Well, the Spotify API has a [get user's top items](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks) function, which allows you to request a user's most-streamed items over a `short_term` (4 week), `medium_term` (6 month) or `long_term` (all) time period.
In fact, after taking a minute to dig through the API documentation, we can see that Stats for Spotify is a minimalist wrapper around the larger Spotify API!

The downside to this, versus specifically downloading your data, is that your analysis is much more limited in scope.
While your extended streaming data includes a timestamp for every play of every song you've ever listened to, there's really no way to request that information through the API. 

Anyways, that's a broad overview of API's in general.
In this project, I used the Spotify API to determine the genre of each song I had listened to. 
Specifically, I used the [Spotipy](https://spotipy.readthedocs.io/en/2.22.1/) python library to interact with the API.
I first took each song's unique URI and requested the unique artist URI's associated with that song (note: although the downloaded data contains artist name, this is a plaintext "Taylor Swift", and insufficient to actually query the API).
Then, I requested the artist URI to request the genre's associated with that artist. 
Correlating this data, I wound up with a list of genres associated with each song.

There was a sneaky gottcha here - if a song was performed by, say, two "pop" artists, it gets two "pop" tags, and is counted in the genre total for "pop" twice! 
In SQL, you'd correct for this with a `GROUP BY` command, but in Tableau I used a [Level of Detail](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm) expression.
This is why you can select a genre on the dashboard, and the total will be different than the total for Hours by Artist.
While I was okay with saying "I listened to both Taylor Swift and Ed Sheeran for three minutes by listening to Everything has Changed", I didn't think it was fair to say I listened to six minutes of pop.

{:refdef: style="text-align: center;"}
![Genre and Artist hours differ](/assets/images/spotify_article/GenreHours.png)
{:refdef}