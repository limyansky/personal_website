---
layout: post
author: brent
title:  "Exploring Aircraft Accidents"
image: assets/images/using_SQL.png
date:   2022-09-30
categories: [Data Science, Studying, SQL]
comments: true
---

After going through some tutorials on W3 to learn SQL, it quickly became apparent that the best way to learn this language would be to download some datasets I was interested in and have at it.
As I have an interest in aviation, my thought immediately jumped to looking at aircraft accident statistics.
Most serious or semi-serious accidents are reported to the National Transportation and Safety Board, or NTSB.
Conveniently, the NTSB provides their database of accidents since 1982 as a \~400 MB Microsoft Access .mdb file. 

Overview of how hours are often used as a proxy for experience

Originally, it was my hope to test anecdotal claims I've come across, such as "The accident rate decreases after a pilot gets 100 hours" and "The accident rate increases again at 200 hours due to overconfidence".
As we will see, these questions aren't really answerable using this set of data.
However, here's some cool stuff I found.

## Population Domination Example
Simply put, this data set appears to be dominated by the relative population of pilots and aircraft.
For example, consider the top 10 most accident-prone aircraft: 

``` SQL
SELECT acft_model, COUNT(acft_model) AS tot_incidents
FROM aircraft
GROUP BY acft_model
ORDER BY tot_incidents DESC
LIMIT 10;
```

Some output table here

It appears that the Cessna C-172 features strongly in this list, although it would be wise to consider all variations of the aircraft (The 172, 172S, and 172M should all be considered the same type of aircraft in this scenario)

## Cleaning the Data

Lets look at the top ten aircraft models with the most incident reports.

Immediately we run into issues.

Look at the Cessna 172
``` SQL
SELECT acft_model
FROM `aircraft`
WHERE acft_model LIKE '%172%'
GROUP BY acft_model;
```

We have entries for "172 M" "CE-172M" "172 - M" which are are all referring to the same model of aircraft.

We have similar problems for aircraft make

Solve this problem using lookup tables

Every time I run this sql command, my gui crashers. But, when I reload, the table is there, so...

Congrats to Thomas C. Piper on their homebuilt Murphy Rebel

Boeing-Stearman: long history of purchases and sales