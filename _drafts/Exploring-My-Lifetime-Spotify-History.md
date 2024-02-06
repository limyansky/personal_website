---
layout: post
author: brent
title:  "Exploring My Lifetime Spotify History"
image: assets/images/spotify_artice/Dashboard.png
date:   2024-02-05
categories: [Data Analysis, Tableau]
comments: true
---

I went out to dinner with some close friends the other night, when the topic of music came up. 
We spent some time reminiscing about what we saw as the defining stages of our lives, and how our music tastes changed and developed along with us. 

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

[Tableau Public](https://public.tableau.com/app/profile/brent.limyansky/viz/MySpotifyData_17066362308130/Dashboard12)
[GitHub](https://github.com/limyansky/my_spotify)

# Technical Details
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
[https://restcountries.com/v3.1/name/Russia][https://restcountries.com/v3.1/name/Russia]  
If you instead want to know information about Germany, you can change the address to:  
[https://restcountries.com/v3.1/name/Germany][https://restcountries.com/v3.1/name/Germany]  
The idea is that your program is able to ask simple questions in this format ("Tell me about Germany"), and get an answer that is easy for the computer to understand and work with.

The [Spotify API](https://developer.spotify.com/documentation/web-api) is free, but does require you to make a developer account and generate some credentials for yourself before you can use it. 
If you want a fun example of the kind of app you can build around this, check out [statsforspotify.com](https://www.statsforspotify.com/).
After logging into your account, this website gives you details such as your top artists over a 4-week or 6-month time period, or the lifetime of your account. 
Why only these time periods?
Well, the Spotify API has a [get user's top items](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks) function, which allows you to request a user's most-streamed items over a `short_term`(4 week), `medium_term`(6 month) or `long_term` (all) time period.
In fact, after taking a minute to dig through the API documentation, we can see that Stats for Spotify is a minimalist wrapper around the larger Spotify API!

The downside to this, versus specifically downloading your data, is that your analysis is much more limited in scope.
While your extended streaming data includes a timestamp for every play of every song you've ever listened to, there's really no way to request that information through the API. 