
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "About Me",
    "body": "I am a recent graduate from the University of California, Santa Cruz, where I received my PhD in physics for my work studying the emission mechanism of pulsars. I have made this website primarily to showcase personal projects relevant to a career in data science, but will also be showcasing some of my more technically oriented hobbies. For more information on my career, including academic works, please visit my linkedIn. On the hobby side, I occasionally post photographs I’ve taken on flickr. A small celebration after my thesis defense. "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                           All Stories:                                                                                                     A Guessing Game with GPT2 and TensorFlow              :       In this project, I fine-tuned the GPT2 large language model (LLM) with TensorFlow so that it generates scientific-sounding paper titles for a real-or-fake guessing game. You can view the project. . . :                                                                               Brent                23 Mar 2023                                                                                                                                     Building a Website: A Physicist's Perspective              :       A common piece of advice for those transitioning from academia to industry is to build a personal portfolio of projects to show off your skills and talents. One of the. . . :                                                                               Brent                27 Sep 2022                                            "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/A-Guessing-Game-with-GPT2/",
    "title": "A Guessing Game with GPT2 and TensorFlow",
    "body": "2023/03/23 - In this project, I fine-tuned the GPT2 large language model (LLM) with TensorFlow so that it generates scientific-sounding paper titles for a real-or-fake guessing game. You can view the project notebook (and run it in Google Colaboratory) here, and you can play the game by running this interactive notebook. The fake titles are generally realistic enough to pass cursory review, with the player needing subject-matter knowledge to determine real from fake. Disclaimer: LLMs in general, including the GPT family, are known to be biased, and occasionally generate offensive material. I have not encountered any instances of this for this use case, but it is possible something has evaded my review. Inspiration: During social hour in the physics department, we would occasionally play a guessing game called ArXiv vs SnarXiv. ArXiv is an open access website where scientists post pre-print copies of their papers, while SnarXiv is a parody website which generates fake paper titles, abstracts, and authors for high-energy theory papers. In this game, players are tasked with discerning which source (ArXiv or SnarXiv) each title originates from. Although a fun way to pass the time, I never felt I could really give it an honest shot, as theoretical physics is not my area of expertise. Enter: GPT2. GPT stands for Generative Pre-Trained Transformer. Generative, because it auto-completes text, pre-trained because this auto-complete task can be easily leveraged to perform other tasks, and finally transformer refers to the underlying structure of the model. I first heard of the GPT family of LLMs in relation to OpenAI’s ChatGPT, an online chat-bot powered by the GPT3 model. GPT2 is a bit older, but it is the most recent member of the family to be released as open-source. Through tweaking the GPT2 model in a process called “fine-tuning”, I thought I could get it to generate realistic sounding paper titles in a subject area that I am more familiar with. The Data: The underlying data for this project comes from ArXiv. org. ArXiv offers a place for scientists to upload their papers where they can be accessed by anyone, for free, without needing a university affiliation or publisher subscription. It is ubiquitous in physics, with most recent papers also appearing on ArXiv. Rather than scrape ArXiv myself, I used a Kaggle dataset containing the relevant information in a . json file. Originally, my plan was to create training sentences of the format: 1category: High Energy Physics - Experiment title: Building the LHCfor all 2+ million papers on ArXiv. Then, using prompts of the format: 1category: High Energy Astrophysical Phenomena title: GPT2 would end up generating a fake paper title. By changing what occurred after the “category” statement, I could use this technique to generate titles from any given category, as well as from a combination of categories. Unfortunately, this approach led to me quickly surpassing the GPU usage limits in Google’s (free) Colaboratory notebooks. I decided to simplify the task by picking a few categories of interest, selecting papers from only one category at a time, and fine-tuning a different model for each categorical selection.       Category   Number of Papers         Tissues and Organs   1,992       Materials Science   82,412       High Energy Physics - Experiment   49,629       High Energy Astrophysical Phenomena   50,447    While it took ~1 hr to perform a single epoch of training on the original 2+ million papers, training on 10’s of thousands of papers took only ~10-15 minutes per epoch, with “Tissues and Organs” being much faster. Data preparation was rather simple: I pulled the title, removed characters other than letters and numbers, and removed multiple spaces. In hindsight, this was too conservative - the GPT2 vocabulary includes various forms of punctuation and special characters. In particular, allowing the : symbol would really have improved the readability of my results. The Model: Due to computational limitations, I opted to use the smallest version of GPT2, with 124 million trainable parameters. For comparison, GPT2-XL has 1. 5 billion, and GPT3 has 175 billion (GPT4 does not have a disclosed number of parameters). LLM’s (and neural netowks in general) work with numbers, not raw text. The process of converting text to numbers is called tokenization, with each resultant token typically representing a few letters (a single word may be translated into multiple tokens). An easy way to get a handle on this is to try out the online interface for the GPT3 tokenizer. There are a handful of special tokens which may exist in a tokenizer, such as start of sequence (SOS), end of sequence (EOS), and padding (PAD). The SOS and EOS tokens denote when an input starts and ends. PAD tokens add extra characters to a set of sentences used in training, such that all sentences have the same length. Through the use of an attention mask, PAD tokens they are typically ignored during model training. GPT2 was only trained using EOS tokens, but I elected to add SOS and PAD tokens as well. The addition of an SOS token was purely aesthetic - I prefer to ask GPT2 to auto-complete a sentence of the form&lt;|startoftext|&gt;as opposed to just an empty string. The addition of a PAD token was necessary to ensure that GPT2 truncated the fake titles at a reasonable point, and without it (or by setting the EOS token to be the PAD token), GPT2 will generate text until it reaches a hard-coded limit. Training: As I mentioned earlier in this article, I used the free version of Google Colaboratory (a. k. a. Colab) for this project, which offers free GPU and TPU time if resources are available. Colab is meant for interactive tasks, meaning it has relatively conservative timeouts and usage restrictions. As such, I opted to terminate training for most of my datasets after inspection showed that a single training epoch produced satisfactory results. The exception to this was “Tissues and Organs”, which had much fewer examples. For this dataset, I performed multiple epochs of training, which included the implementation of early stopping. The final loss (cross-entropy with masking) of these models is shown in the table below.       Category   Test Loss         Tissues and Organs   4. 16       Materials Science   3. 42       High Energy Physics - Experiment   3. 16       High Energy Astrophysical Phenomena   3. 37    I didn’t perform hyperparameter tuning for this project. I used optimizer settings from here, which worked well enough for my purposes. Results: Note: I passed the real titles through the same text filtering as the training set, and lowercased all words. I found that GPT2 would only capitalize the first letter of the title, while real authors had a variety of capitalization schemes. It is also apparent where colons should be used, although the text filter removed them. Some Real Titles 1234567 Modeling Tumor Angiogenesis with Cellular Automata  Single photon detection performance of highly disordered NbTiN thin films  Multiboson production in W decays  Resonant micro-instabilities at quasi-parallel collisionless shocks cause or consequence of shock reformation Some Fake Titles 1234567A computational model of neural activity in mammalian brainstem structures All-electron spin oscillations at bulk FeMgO interfaces Long-lived proton-proton fusion particles of Pb-Pb collisions A short time scale model for gamma-ray burstsOverall, I was really pleased with these fake titles. Here is a rough measure of my guessing performance after 20 rounds of each category:       Test   My Performance         ArXiv vs SnarXiv   55%       Tissues and Organs   75%       Materials Science   65%       High Energy Physics - Experiment   55%       High Energy Astrophysical Phenomena   75%    Not awful, considering my prior experiences with the base ArXiv vs SnarXiv game. Based off of this small sample, the “Tissues and Organs” category had the most poorly trained model, producing strange or grammatically incorrect titles: 123all patients with chronic liver diseases a monozygotic deletion of chromosome 7 deletion in the cretylovusTo be honest, I’m somewhat embarrassed with my performance in the astrophysics category, and think I should have been able to score much better if I was a bit more careful. However, this was the last category I tried, meaning I’d already read 160 real and fake titles by the time I’d gotten there. I think I was a little tired out by that point… Reflections on Humor: I think this excerpt from The Onion’s amicus brief explaining their motto Tu stultus es does an excellent job explaining why I had so much fun with this project (if you only read one Amicus brief in your life, I highly suggest it be this one. )  …the phrase “you are dumb” capturesthe very heart of parody: tricking readers into believing that they’re seeing a serious rendering of some specific form—a pop song lyric, a newspaper article, apolice beat—and then allowing them to laugh at theirown gullibility when they realize that they’ve fallenvictim to one of the oldest tricks in the history of rhetoric.  One of parody’s most powerfulcapacities is rhetorical: It gives people the ability tomimic the voice of a serious authority—whether that’sthe dry news-speak of the Associated Press or the legalese of a court’s majority opinion—and thereby kneecap the authority from within. Of course, I’m not fighting against any authority here, but I got a lot of enjoyment from watching this model poke fun of my field/knowledge. For example, consider: J1305-4420-4533 a strange globular cluster I an enigmatic low-mass black hole mass hadrons and spin oscillationsAstronomy does use a naming convention that looks like PSR J1846-0285, where ‘PSR’ refers to the object type, ‘J’ refers to a particular coordinate system, and ‘1846-0285’ are the coordinates in that system. Adding a third set of coordinates to a title like this is gibberish - but, then again, this naming scheme certainly look like gibberish to a lot of people anyways. Interestingly, I also realized it was possible for GPT to do too good a job of generating fake paper titles. Take this example from chatGPT: Googling the first of these titles proves that it is, in fact, made up. But, take at look at the very-real “Gamma-ray emission from young radio galaxies and quasars” or “Missing Halos in the High-Energy Sky”. The generated title “Exploring the High-Energy Gamma-Ray Emission from AGN Jets” could conceivably be an alternate title for these works. Where’s the fun in that?The joy comes from the nonsense! Thanks!: I hope you enjoyed reading about this project as much as I enjoyed working on it. I’m open to any and all feedback! Edits: I may occasionally update this page. For the full version history, please refer to GitHub. Resources: https://huggingface. co/blog/how-to-generatehttps://www. modeldifferently. com/en/2021/12/generaci%C3%B3n-de-fake-news-con-gpt-2/#3-text-generation-with-gpt-2https://www. kaggle. com/code/ysthehurricane/text-generation-with-gpt2-huggingface#GPT2-Tokenizerhttps://hyunjoonlee70. github. io/Blog_Post_3/https://towardsdatascience. com/conditional-text-generation-by-fine-tuning-gpt-2-11c1a9fc639dhttps://towardsdatascience. com/teaching-gpt-2-a-sense-of-humor-fine-tuning-large-transformer-models-on-a-single-gpu-in-pytorch-59e8cec40912#:~:text=GPT%2D2%20comes%20in%204,and%201. 5B%20parameters%2C%20respectivelyhttps://huggingface. co/course/chapter7/https://huggingface. co/course/chapter3/ "
    }, {
    "id": 6,
    "url": "http://localhost:4000/Building-A-Website/",
    "title": "Building a Website: A Physicist's Perspective",
    "body": "2022/09/27 - A common piece of advice for those transitioning from academia to industry is to build a personal portfolio of projects to show off your skills and talents. One of the first elements to building such a portfolio is deciding how to display it. In creating my own website, I sought something cheap and easy to write, but also over which I had a large degree of creative control. I also thought it would be fun if I could use my own domain name. These requirements pushed me towards Google Domains to manage my domain name, GitHub Pages to host my website, and jekyll for formatting. In this blog post, I will discuss how I came to this final setup, as well as various prior attempts at website generation. I consider this “A Physicist’s Perspective” because my ultimate decision makes use of skills I’ve acquired during my time in academia, specifically GitHub, Linux (optional, but command line is a must), and Markdown, as well as an existing Google account. I have opted not to make this post a specific tutorial, and will mostly focus on providing an overview of my setup. If you are interested in a tutorial, I recommend looking at GitHubs official documentation. This will walk you through everything I discuss below, including using jekyll to build web content and write blog posts. Building and Hosting a Website: For amateur setups, the choice of tools used to build and host your website are intimately intertwined. Some hosting providers will require you to use a specific piece software to build your website, while others have certain technical requirements that won’t work with particular development software. If you have a strong preference in regards to software or web host, I recommend starting there and finding a complimentary service that will work well your choice. Hosting: I knew almost immediately that I wanted to host my website on GitHub Pages. This is a free service provided by GitHub that will host any of your public repositories as websites. It even gives you the option of connecting a domain name that you already own! For someone already familiar with GitHub, selecting a repository branch to be served as a website involves changing only a single setting. Managing the website is done through exactly the same procedures as managing any other repository. However, in my personal experience, GitHub has a steep enough learning curve that getting it set up exclusively to host a website may not be the best option for everyone. My limited experience with WordPress. com showed it to be a more user-friendly experience, although this comes at the cost of, well, money. Building: GitHub Pages limits you to hosting static websites. These are websites that provide identical content for all users, such as what one typically expects of a personal blog. Static websites are contrasted with dynamic websites, where content is generated via an app on a user-by-user basis. Most online retailers will use dynamic websites, which build their webpages by querying databases for the products most likely to appeal to each specific user. The WordPress software suite, although free and open source, natively generates dynamic websites that won’t work with GitHub Pages. There are some workarounds, such as the SimplyStatic plugin, but I had trouble getting these tools to work properly. I also considered the bare-bones option of writing the website in raw HTML and CSS. I found this to be the simplest path forward, as it doesn’t involve tinkering with any software other than a text editor. However, your website will inevitably end up looking like it is from the 90’s. My HTML/CSS attempt is still alive at limyansky. github. io (hey, its free!), for all those interested in taking a look. After this trial and error, I settled on using jekyll to build my website. This software is built with Ruby, and easily translates Markdown documents into decently looking websites. Like any good tool, the sky’s the limit!For examples of what the pros can build jekyll, take a look at Spotify for Developers and the website for the Freedom of Information Act. For my purposes, I’m already familiar with Markdown via my use of Obsidian as a note taking app in academia, which makes writing new blog posts a breeze. Jekyll is also explicitly mentioned by GitHub as working well with Pages, with the GitHub team going as far as including specific tutorials for certain aspects of its use. Although I have no prior experience with Ruby, which did cause some confusion during setup, jekyll is popular enough that tutorials and StackExchange questions are plentiful. A Note on Domain Names: Registering a domain name is a comparatively simple process - you find a domain registrar (Google Domains and NameCheap are popular examples) and pay them a few dollars to claim your desired name. There may be a few settings to tweak when connecting your domain name to your hosting service, but tutorials are abundant from registrars and hosting providers. However, something very important to keep in mind is that missing a payment (although most services offer a grace period) on your domain name means you are likely to lose access to the name for a number of years. Rather than simply being de-listed, old domain names are often auctioned to investors looking either to resell them for a profit or make money from their existing user base. One organization I was previously involved with lost their domain in this manner, although it was eventually de-listed about two years later. All this is to say that I chose Google Domains not only because I found their pricing competitive ($12 at the time of writing), but because I knew I could keep up to date with the payments if I associated them with my existing google account. Conclusions: I found the most challenging part of making this website to be selecting software and providers that would work well together. I hope that by going into detail on what I finally settled on, I can save you some time in designing your own website. Good luck! "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});