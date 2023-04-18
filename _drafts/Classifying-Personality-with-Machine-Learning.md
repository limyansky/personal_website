---
layout: post
author: brent
title:  "Classifying Personality with Machine Learning"
image: assets/images/personality_classification.png
date:   2023-04-21
categories: [Machine Learning, TensorFlow, NLP]
comments: true
---

In this project, I demonstrate a technique to classify a person's Big 5 Personality Traits based off of 20 minute stream-of-consciousness essays.
I achieved an average accuracy of 58% across the five personality categories by using sentence-BERT embeddings coupled with small neural network classifiers.
Although this is slightly less than the 60% accuracy achieved by other BERT-based techniques, my model represents a 1000x reduction in complexity from these other methods.
In addition to demonstrating the power of sentence-BERT, this reduction in complexity is an important step in making these types of models more distributable to end-users.

## The Data
The dataset used in this project consists of 2,467 essays collected by [James Pennebaker et al.](https://psycnet.apa.org/doiLanding?doi=10.1037%2F0022-3514.77.6.1296).
Students wrote down their stream of consciousnesses, then took a standardized personality test.
Often referred to as the _Essays Dataset_, this has become one of the most prominent datasets used to build and measure automated personality classification systems.
[_myPersonality_](https://sites.google.com/michalkosinski.com/mypersonality), a dataset consisting Facebook content coupled with the user's personality type information, is also quite prominent. 
However, this dataset's maintainers stopped sharing it in 2018, and I felt it best to respect their decision to withdraw it.