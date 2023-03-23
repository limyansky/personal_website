---
layout: post
author: brent
title:  "A Guessing Game with GPT2 and TensorFlow"
image: assets/images/scientist.jpg
date:   2023-03-23
categories: [Machine Learning, TensorFlow, GPT]
comments: true
---

In this project, I fine-tuned the GPT2 large language model (LLM) with TensorFlow so that it generates scientific-sounding paper titles for a real-or-fake guessing game.
You can view the project notebook (and run it in Google Colaboratory) [here](https://github.com/limyansky/GPT2_ArXiv_SnarXiv/blob/main/ArXiv_Any.ipynb), and you can play the game by running this [interactive notebook](https://github.com/limyansky/GPT2_ArXiv_SnarXiv/blob/main/ArXiv_Play.ipynb).
The fake titles are generally real-sounding enough to pass cursory review, with the player needing subject-matter knowledge to determine real from fake. 

## Disclaimer
LLMs in general, including the GPT family, are known to be [biased](https://huggingface.co/gpt2), and occasionally generate offensive material.
I have not encountered any instances of this for this use case, but it is possible something has evaded my review. 

## Inspiration
During social hour in the physics department, we would occasionally play a guessing game called [ArXiv vs SnarXiv](http://snarxiv.org/vs-arxiv/). 
ArXiv is an open access website where scientists post pre-print copies of their papers, while SnarXiv is a parody of website which generates fake paper titles, abstracts, and authors.
In this game, players are tasked with discerning which source, ArXiv or SnarXiv, each title originates from.
This game was a fun way to waste some time, but I never felt I could really _play_ it, as theoretical physics is not my area of expertise. 
Enter, GPT2.
  
GPT stands for _Generative Pre-Trained Transformer_. Generative, because it effectively auto-completes text, pre-trained because this auto-complete task can be easily leveraged to perform other tasks, and finally transformer refers to the underlying structure of the model.
GPT3, an improved version of GPT2, has been making waves in the past few months after OpenAI released [ChatGPT](https://chat.openai.com/chat), an online chat-bot powered by a successor to the GPT2 model. 
Through tweaking the GPT2 model in a process called "fine tuning", I thought I could get to to generate realistic sounding paper titles in a subject area that I am more familiar with. 

## The Data

The data set for this project comes from [ArXiv.org](https://arxiv.org/).
ArXiv offers a place for scientists to upload their papers where they can be accessed by anyone, for free, without needing a university affiliation or publisher subscription.
It is _extremely_ ubiquitous in physics, with most recent papers also appearing on ArXiv.
Rather than pull the titles myself, I used a [Kaggle data set](https://www.kaggle.com/datasets/Cornell-University/arxiv?resource=download) containing the relevant information in a .json file.

Originally, my plan was to create training sentences of the format: 
```
category: High Energy Physics - Experiment title: Building the LHC
```
for all 2+ million papers on ArXiv.
Then, using prompts of the format: 
```
category: High Energy Astrophysical Phenomena title: 
```
in attempting to auto-complete the statement, GPT2 would end up generating a fake paper title.
By changing what occurred after the "category" statement, I could use this technique to generate titles from any given category, and perhaps even a combination of categories.

Unfortunately, this approach led to me being temporarily surpassing my GPU usage limits in Google's Colaboratory notebooks.
I decided to simplify the task by picking a few categories of interest, selecting papers from only one category at a time, and then fine-tuning a different model for each single category. 


| Category    | Number of Papers|
| ----------- | ---------------: |
| Tissues and Organs                 | 1,992  |
| Materials Science                  | 82,412 |
| High Energy Physics - Experiment   | 49,629 |
| High Energy Astrophysical Phenomena| 50,447 |

While it took ~1 hr to perform a single epoch of training on the original 2+ million papers, training on 10's of thousands of papers took only ~10-15 minutes per epoch, with "Tissues and Organs" being much faster.

Data preparation was rather simple.
I pulled the title, and removed characters other than letters and numbers, and removed multiple spaces.

## The Model
Due to computational limitations, I opted to use the smallest version of [GPT2](https://huggingface.co/gpt2), with 124 million trainable parameters. 
For comparison, [GPT2-XL](https://huggingface.co/gpt2-xl) has 1.5 billion, [GPT3](https://github.com/openai/gpt-3) has 175 billion, while GPT4 does not have a [disclosed number of parameters](https://www.mlyearning.org/gpt-4-parameters/).

Neural networks work with numbers, not raw text, with the process of converting text to numbers being called _tokenization_.
Tokens are numbers typically representing a few letters (meaning that a single word may be translated into multiple tokens).
You can play around with the GPT3 tokenizer [online](https://platform.openai.com/tokenizer) if you'd like to play with some examples.

There are a handful of special tokens which may exist in a tokenizer, such as _start of sequence_(SOS), _end of sequence_(EOS), and _padding_(PAD).
The SOS and EOS tokens denote when an input starts and ends.
PAD tokens are used to add characters to a set of sentences used in training, such that all sentences have the same length.
Through the use of an _attention mask_, PAD tokens they are typically ignored during model training.

GPT2 was only trained using EOS tokens.
However, I elected to add SOS and PAD tokens as well.
The addition of an SOS token was purely aesthetic - I prefer to ask GPT2 to autocomplete a sentence of the form
`<|startoftext|>`
as opposed to just an empty string.
The addition of a PAD token was necessary to ensure that GPT2 truncated, and without it (or by setting the EOS token to be the PAD token), GPT2 will generate text until it reaches a hard-coded limit.

## Training
As I mentioned earlier in this article, I used the free version of [Google Colaboratory](https://colab.research.google.com/) for this project, which offers free GPU and TPU time if resources are available.
Colab is meant for interactive tasks, meaning it has relatively conservative timeouts and usage restrictions, particularly in the free version.
As such, I opted to terminate training for most of my datasets after inspection showed a single training epoch produced satisfactory results.
The exception to this was "Tissues and Organs", which had much fewer examples. 
For this dataset, I performed multiple epochs of training, which included the implemation of early stopping. 

Test Loss: 

| Category    | Test Loss|
| ----------- | ---------------: |
| Tissues and Organs                 | 4.16 |
| Materials Science                  | 3.42 |
| High Energy Physics - Experiment   | 3.16 |
| High Energy Astrophysical Phenomena| 3.37 |

The default [GPT2 loss function]() was used, which is a masked cross entropy loss. 

Likewise, I didn't perform hyperparameter tuning for this project.
I used optimizer settings from [here](), which appeared to work well enough for my purposes.

## Results

Note: In the actual game, I lowercase all words. 
I found that GPT2 would only capitalize the first letter of the title, while real authors had a variety of capitalization schemes.

**Some Real Titles**  

```
 Modeling Tumor Angiogenesis with Cellular Automata  

 Single photon detection performance of highly disordered NbTiN thin films  

 Multiboson production in W decays  

 Resonant micro-instabilities at quasi-parallel collisionless shocks cause or consequence of shock reformation  
```

**Some Fake Titles**  

```
A computational model of neural activity in mammalian brainstem structures  

All-electron spin oscillations at bulk FeMgO interfaces  

Long-lived proton-proton fusion particles of Pb-Pb collisions  

A short time scale model for gamma-ray bursts
```

Overall, I was really pleased with these fake titles.
With little exception, I felt I

Here is a rough measure of my guessing performance, after 20 rounds of each category:

| Test | My Performance |
|------|---------------:|
| ArXiv vs SnarXiv                   | 55% |
| Tissues and Organs                 | 75% |
| Materials Science                  | 65% |
| High Energy Physics - Experiment   | 55% |
| High Energy Astrophysical Phenomena| 75% |

Not awful, considering my prior experiences with the base ArXiv vs SnarXiv game. 
Based off of this small sample, the Tissues and Organs category had the most poorly trained model, producing strange or gramatically incorrect titles: 
```
all patients with chronic liver disease

s a monozygotic deletion of chromosome 7 deletion in the cretylovus
```

To be honest, I'm somewhat embarrassed with my performance in the astrophysics category.
Upon review, I think I should have been able to score much better if I was a bit more careful.
However, this was the last category I tried, meaning I'd already read 160 real and fake titles by the time I'd gotten here. 
I think I was a little tired out by that point. 


## Reflections on Humor

I think this excerpt from _The Onion_'s [amicus brief](https://www.supremecourt.gov/DocketPDF/22/22-293/242292/20221003125252896_35295545_1-22.10.03%20-%20Novak-Parma%20-%20Onion%20Amicus%20Brief.pdf) explaining their motto _Tu stultus es_ does an excellent job explaining why I had so much fun with this project (if you only read one Amicus brief in your life, I highly suggest it be this one.)

>...the phrase “you are dumb” captures
>the very heart of parody: tricking readers into believing that they're seeing a serious rendering of some specific form—a pop song lyric, a newspaper article, a
>police beat—and then allowing them to laugh at their
>own gullibility when they realize that they've fallen
>victim to one of the oldest tricks in the history of rhetoric.

>One of parody's most powerful
>capacities is rhetorical: It gives people the ability to
>mimic the voice of a serious authority—whether that's
>the dry news-speak of the Associated Press or the legalese of a court's majority opinion—and thereby kneecap the authority from within. 

Of course, I'm not fighting against any authority here, but I got a lot of enjoyment from watching this model poke fun of my field/knowledge.
For example, consider: 
`J1305-4420-4533 a strange globular cluster I an enigmatic low-mass black hole mass hadrons and spin oscillations
`
Astronomy does use a naming convention that looks like `PSR J1846-0285`, where 'PSR' refers to the object type, 'J' refers to a particular coordinate system, and '1846-0285' are the coordinates in that system.
Adding a third set of coordinates to that a title like this is gibberish - but, then again, this naming scheme certainly look like gibberish to a lot of people anyways.

## Resources
