---
layout: post
author: brent
title:  "A Guessing Game with GPT2 and TensorFlow"
image: assets/images/scientist.jpg
date:   2023-03-23
categories: [Machine Learning, TensorFlow, GPT, NLP]
comments: true
---

In this project, I fine-tuned the GPT2 large language model (LLM) with TensorFlow so that it generates scientific-sounding paper titles for a real-or-fake guessing game.
You can view the project notebook (and run it in Google Colaboratory) [here](https://github.com/limyansky/GPT2_ArXiv_SnarXiv/blob/main/ArXiv_Any.ipynb), and you can play the game by running this [interactive notebook](https://colab.research.google.com/github/limyansky/GPT2_ArXiv_SnarXiv/blob/main/ArXiv_Play.ipynb).
The fake titles are generally realistic enough to pass cursory review, with the player needing subject-matter knowledge to determine real from fake. 

## Disclaimer
LLMs in general, including the GPT family, are known to be [biased](https://huggingface.co/gpt2), and occasionally generate offensive material.
I have not encountered any instances of this for this use case, but it is possible something has evaded my review. 

## Inspiration
During social hour in the physics department, we would occasionally play a guessing game called [ArXiv vs SnarXiv](http://snarxiv.org/vs-arxiv/). 
ArXiv is an open access website where scientists post pre-print copies of their papers, while SnarXiv is a parody website which generates fake paper titles, abstracts, and authors for high-energy theory papers.
In this game, players are tasked with discerning which source (ArXiv or SnarXiv) each title originates from.
Although a fun way to pass the time, I never felt I could really give it an honest shot, as theoretical physics is not my area of expertise. 
Enter: GPT2.

GPT stands for _Generative Pre-Trained Transformer_. _Generative_, because it auto-completes text, _pre-trained_ because this auto-complete task can be easily leveraged to perform other tasks, and finally _transformer_ refers to the underlying structure of the model.
I first heard of the GPT family of LLMs in relation to OpenAI's [ChatGPT](https://chat.openai.com/chat), an online chat-bot powered by the GPT3 model.
GPT2 is a bit older, but it is the most recent member of the family to be released as open-source. 
Through tweaking the GPT2 model in a process called "fine-tuning", I thought I could get it to generate realistic sounding paper titles in a subject area that I am more familiar with. 

## The Data

The underlying data for this project comes from [ArXiv.org](https://arxiv.org/).
ArXiv offers a place for scientists to upload their papers where they can be accessed by anyone, for free, without needing a university affiliation or publisher subscription.
It is ubiquitous in physics, with most recent papers also appearing on ArXiv.
Rather than scrape ArXiv myself, I used a [Kaggle dataset](https://www.kaggle.com/datasets/Cornell-University/arxiv?resource=download) containing the relevant information in a .json file.

Originally, my plan was to create training sentences of the format: 
```
category: High Energy Physics - Experiment title: Building the LHC
```
for all 2+ million papers on ArXiv.
Then, using prompts of the format: 
```
category: High Energy Astrophysical Phenomena title: 
```
GPT2 would end up generating a fake paper title.
By changing what occurred after the "category" statement, I could use this technique to generate titles from any given category, as well as from a combination of categories.

Unfortunately, this approach led to me quickly surpassing the GPU usage limits in Google's (free) Colaboratory notebooks.
I decided to simplify the task by picking a few categories of interest, selecting papers from only one category at a time, and fine-tuning a different model for each categorical selection. 


| Category    | Number of Papers|
| ----------- | ---------------: |
| Tissues and Organs                 | 1,992  |
| Materials Science                  | 82,412 |
| High Energy Physics - Experiment   | 49,629 |
| High Energy Astrophysical Phenomena| 50,447 |  

<br/>

While it took ~1 hr to perform a single epoch of training on the original 2+ million papers, training on 10's of thousands of papers took only ~10-15 minutes per epoch, with "Tissues and Organs" being much faster.

Data preparation was rather simple: I pulled the title, removed characters other than letters and numbers, and removed multiple spaces.

## The Model
Due to computational limitations, I opted to use the smallest version of [GPT2](https://huggingface.co/gpt2), with 124 million trainable parameters. 
For comparison, [GPT2-XL](https://huggingface.co/gpt2-xl) has 1.5 billion, and [GPT3](https://github.com/openai/gpt-3) has 175 billion (GPT4 does not have a [disclosed number of parameters](https://www.mlyearning.org/gpt-4-parameters/)).

LLM's (and neural netowks in general) work with numbers, not raw text.
The process of converting text to numbers is called _tokenization_, with each resultant token typically representing a few letters (a single word may be translated into multiple tokens).
An easy way to get a handle on this is to try out the online interface for the [GPT3 tokenizer](https://platform.openai.com/tokenizer).

There are a handful of special tokens which may exist in a tokenizer, such as _start of sequence_ (SOS), _end of sequence_ (EOS), and _padding_ (PAD).
The SOS and EOS tokens denote when an input starts and ends.
PAD tokens add extra characters to a set of sentences used in training, such that all sentences have the same length.
Through the use of an _attention mask_, PAD tokens they are typically ignored during model training.

GPT2 was only trained using EOS tokens, but I elected to add SOS and PAD tokens as well.
The addition of an SOS token was purely aesthetic - I prefer to ask GPT2 to auto-complete a sentence of the form
`<|startoftext|>`
as opposed to just an empty string.
The addition of a PAD token was necessary to ensure that GPT2 truncated the fake titles at a reasonable point, and without it (or by setting the EOS token to be the PAD token), GPT2 will generate text until it reaches a hard-coded limit.

## Training
As I mentioned earlier in this article, I used the free version of [Google Colaboratory](https://colab.research.google.com/) (a.k.a. Colab) for this project, which offers free GPU and TPU time if resources are available.
Colab is meant for interactive tasks, meaning it has relatively conservative timeouts and usage restrictions.
As such, I opted to terminate training for most of my datasets after inspection showed that a single training epoch produced satisfactory results.
The exception to this was "Tissues and Organs", which had much fewer examples. 
For this dataset, I performed multiple epochs of training, which included the implementation of early stopping. 
The final loss (cross-entropy with masking) of these models is shown in the table below. 

| Category    | Test Loss|
| ----------- | ---------------: |
| Tissues and Organs                 | 4.16 |
| Materials Science                  | 3.42 |
| High Energy Physics - Experiment   | 3.16 |
| High Energy Astrophysical Phenomena| 3.37 |

<br/>

I didn't perform hyperparameter tuning for this project.
I used optimizer settings from [here](https://blog.tensorflow.org/2019/11/hugging-face-state-of-art-natural.html), which worked well enough for my purposes.

## Results

Note: I passed the real titles through the same text filtering as the training set, and lowercased all words.
I found that GPT2 would only capitalize the first letter of the title, while real authors had a variety of capitalization schemes.
It is also apparent where colons should be used, although the text filter removed them.

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
Here is a rough measure of my guessing performance after 20 rounds of each category:

| Test | My Performance |
|------|---------------:|
| ArXiv vs SnarXiv                   | 55% |
| Tissues and Organs                 | 75% |
| Materials Science                  | 65% |
| High Energy Physics - Experiment   | 55% |
| High Energy Astrophysical Phenomena| 75% |  

<br/>

Not awful, considering my prior experiences with the base ArXiv vs SnarXiv game. 
Based off of this small sample, the "Tissues and Organs" category had the most poorly trained model, producing strange or grammatically incorrect titles: 
```
all patients with chronic liver disease

s a monozygotic deletion of chromosome 7 deletion in the cretylovus
```

To be honest, I'm somewhat embarrassed with my performance in the astrophysics category, and think I should have been able to score much better if I was a bit more careful.
However, this was the last category I tried, meaning I'd already read 160 real and fake titles by the time I'd gotten there. 
I think I was a little tired out by that point...

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
Adding a third set of coordinates to a title like this is gibberish - but, then again, this naming scheme certainly look like gibberish to a lot of people anyways.

Interestingly, I also realized it was possible for GPT to do _too good_ a job of generating fake paper titles.
Take this example from chatGPT:  
![Asking chatGPT to make some fake paper titles.](/assets/images/chatGPT_SnarXiv.JPG)  

Googling the first of these titles proves that it is, in fact, made up.
But, take at look at the very-real "[Gamma-ray emission from young radio galaxies and quasars](https://academic.oup.com/mnras/article/507/3/4564/6353538)" or "[Missing Halos in the High-Energy Sky](https://aasnova.org/2019/03/18/missing-halos-in-the-high-energy-sky/)".
The generated title "Exploring the High-Energy Gamma-Ray Emission from AGN Jets" could conceivably be an alternate title for these works.
Where's the fun in that?
The joy comes from the nonsense! 

## Thanks!
I hope you enjoyed reading about this project as much as I enjoyed working on it.
I'm open to any and all feedback!

## Edits
I may occasionally update this page.
For the full version history, please refer to [GitHub](https://github.com/limyansky/personal_website/commits/main/_posts/2023-03-23-A-Guessing-Game-with-GPT2.md).

## Resources
<https://huggingface.co/blog/how-to-generate>  
<https://www.modeldifferently.com/en/2021/12/generaci%C3%B3n-de-fake-news-con-gpt-2/#3-text-generation-with-gpt-2>  
<https://www.kaggle.com/code/ysthehurricane/text-generation-with-gpt2-huggingface#GPT2-Tokenizer>  
<https://hyunjoonlee70.github.io/Blog_Post_3/>  
<https://towardsdatascience.com/conditional-text-generation-by-fine-tuning-gpt-2-11c1a9fc639d>  
<https://towardsdatascience.com/teaching-gpt-2-a-sense-of-humor-fine-tuning-large-transformer-models-on-a-single-gpu-in-pytorch-59e8cec40912#:~:text=GPT%2D2%20comes%20in%204,and%201.5B%20parameters%2C%20respectively>  
<https://huggingface.co/course/chapter7/>  
<https://huggingface.co/course/chapter3/>  