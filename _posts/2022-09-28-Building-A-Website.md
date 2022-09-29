---
layout: post
author: brent
title:  "Building a Website: A Physicist's Perspective"
image: assets/images/building_website.png
date:   2022-09-27
categories: [project, github]
comments: false
---

A common piece of advice for those transitioning from academia to industry is to build a personal portfolio of projects to show off your skills and talents.
One of the first elements to building such a portfolio is deciding how to display it.
In creating my own website, I sought something cheap and easy to write, but also over which I had a large degree of creative control.
I also thought it would be fun if I could use my own domain name.
These requirements pushed me towards [Google Domains](https://domains.google.com) to manage my domain name, [GitHub Pages](https://pages.github.com) to host my website, and [jekyll](https://www.jekyllrb.com) for formatting.

In this blog post, I will discuss how I came to this final setup, as well as various prior attempts at website generation.
I consider this "A Physicist's Perspective" because my ultimate decision makes use of skills I've acquired during my time in academia, specifically GitHub, Linux (optional, but command line is a must), and Markdown, as well as an existing Google account.
I have opted not to make this post a specific tutorial, and will mostly focus on providing an overview of my setup.
If you are interested in a tutorial, I recommend looking at GitHubs [official documentation](https://docs.github.com/en/pages).
This will walk you through everything I discuss below, including using jekyll to build web content and write blog posts. 

## Building and Hosting a Website
For amateur setups, the choice of tools used to build and host your website are intimately intertwined.
Some hosting providers will require you to use a specific piece software to build your website, while others have certain technical requirements that won't work with particular development software.
If you have a strong preference in regards to software or web host, I recommend starting there and finding a complimentary service that will work well your choice.

### Hosting
I knew almost immediately that I wanted to host my website on GitHub Pages.
This is a free service provided by GitHub that will host any of your public repositories as websites.
It even gives you the option of connecting a domain name that you already own!

For someone already familiar with GitHub, selecting a repository branch to be served as a website involves changing only a single setting.
Managing the website is done through exactly the same procedures as managing any other repository.

However, in my personal experience, GitHub has a steep enough learning curve that getting it set up exclusively to host a website may not be the best option for everyone.
My limited experience with [WordPress.com](https://wordpress.com) showed it to be a more user-friendly experience, although this comes at the cost of, well, money.

### Building
GitHub Pages limits you to hosting _static_ websites.
These are websites that provide identical content for all users, such as what one typically expects of a personal blog.
Static websites are contrasted with _dynamic_ websites, where content is generated via an app on a user-by-user basis.
Most online retailers will use dynamic websites, which build their webpages by querying databases for the products most likely to appeal to each specific user.

The WordPress software suite, although free and open source, natively generates dynamic websites that won't work with GitHub Pages.
There are some workarounds, such as the SimplyStatic plugin, but I had trouble getting these tools to work properly.

I also considered the bare-bones option of writing the website in raw HTML and CSS.
I found this to be the simplest path forward, as it doesn't involve tinkering with any software other than a text editor.
However, your website will inevitably end up looking like it is from the 90's.
My HTML/CSS attempt is still alive at [limyansky.github.io](https://limyansky.github.io/) (hey, its free!), for all those interested in taking a look.

After this trial and error, I settled on using jekyll to build my website.
This software is built with Ruby, and easily translates [Markdown](https://www.markdownguide.org/) documents into decently looking websites.
Like any good tool, the sky's the limit!
For examples of what the pros can build jekyll, take a look at [Spotify for Developers](https://developer.spotify.com/) and the website for the [Freedom of Information Act](https://www.foia.gov/).

For my purposes, I'm already familiar with Markdown via my use of [Obsidian](https://obsidian.md/) as a note taking app in academia, which makes writing new blog posts a breeze.
Jekyll is also explicitly mentioned by GitHub as working well with Pages, with the GitHub team going as far as including specific tutorials for certain aspects of its use.
Although I have no prior experience with Ruby, which did cause some confusion during setup, jekyll is popular enough that tutorials and StackExchange questions are plentiful.

## A Note on Domain Names
Registering a domain name is a comparatively simple process - you find a domain registrar (Google Domains and NameCheap are popular examples) and pay them a few dollars to claim your desired name.
There may be a few settings to tweak when connecting your domain name to your hosting service, but tutorials are abundant from registrars and hosting providers.

However, something very important to keep in mind is that missing a payment (although most services offer a grace period) on your domain name means you are likely to lose access to the name for a number of years.
Rather than simply being de-listed, old domain names are often auctioned to investors looking either to resell them for a profit or make money from their existing user base. 
One organization I was previously involved with lost their domain in this manner, although it was eventually de-listed about two years later.

All this is to say that I chose Google Domains not only because I found their pricing competitive ($12 at the time of writing), but because I knew I could keep up to date with the payments if I associated them with my existing google account. 

## Conclusions
I found the most challenging part of making this website to be selecting software and providers that would work well together.
I hope that by going into detail on what I finally settled on, I can save you some time in designing your own website.
Good luck! 