
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "About Me",
    "body": "I am a recent graduate from the University of California, Santa Cruz, where I received my PhD in physics for my work studying the emission mechanism of pulsars. I have made this website primarily to showcase personal projects relevant to a career in data science, but will also be showcasing some of my more technically oriented hobbies. For more information on my career, including academic works, please visit my linkedIn. On the hobby side, I occasionally post photographs I’ve taken on flickr.  "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                                 Let's test spoilers                              :               Director Roland Suso Richter’s enigmatic psychological thriller (direct to video/DVD) was based upon screenwriter Michael Cooney’s own play “Point of Death” - a title that. . . :                                                                                                                                                                                                       11 Jan 2018                                                                                                                      All Stories:                                                             Building a Website: A Physicist's Perspective              :       A common piece of advice for those transitioning from academia to industry is to build a personal portfolio of projects to show off your skills and talents. One of the. . . :                                                                               Brent                27 Sep 2022                                            "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/Building-A-Website/",
    "title": "Building a Website: A Physicist's Perspective",
    "body": "2022/09/27 - A common piece of advice for those transitioning from academia to industry is to build a personal portfolio of projects to show off your skills and talents. One of the first elements to building such a portfolio is deciding how to display it. In creating my own website, I sought something cheap and easy to write, but also over which I had a large degree of creative control. I also thought it would be fun if I could use my own domain name. These requirements pushed me towards Google Domains to manage my domain name, GitHub Pages to host my website, and jekyll for formatting. In this blog post, I will discuss how I came to this final setup, as well as various prior attempts at website generation. I consider this “A Physicist’s Perspective” because my ultimate decision makes use of skills I’ve acquired during my time in academia, specifically GitHub, Linux (optional, but command line is a must), and Markdown, as well as an existing Google account. I have opted not to make this post a specific tutorial, and will mostly focus on providing an overview of my setup. If you are interested in a tutorial, I recommend looking at GitHubs official documentation. This will walk you through everything I discuss below, including using jekyll to build web content and write blog posts. Building and Hosting a Website: For amateur setups, the choice of tools used to build and host your website are intimately intertwined. Some hosting providers will require you to use a specific piece software to build your website, while others have certain technical requirements that won’t work with particular development software. If you have a strong preference in regards to software or web host, I recommend starting there and finding a complimentary service that will work well your choice. Hosting: I knew almost immediately that I wanted to host my website on GitHub Pages. This is a free service provided by GitHub that will host any of your public repositories as websites. It even gives you the option of connecting a domain name that you already own! For someone already familiar with GitHub, selecting a repository branch to be served as a website involves changing only a single setting. Managing the website is done through exactly the same procedures as managing any other repository. However, in my personal experience, GitHub has a steep enough learning curve that getting it set up exclusively to host a website may not be the best option for everyone. My limited experience with WordPress. com showed it to be a more user-friendly experience, although this comes at the cost of, well, money. Building: GitHub Pages limits you to hosting static websites. These are websites that provide identical content for all users, such as what one typically expects of a personal blog. Static websites are contrasted with dynamic websites, where content is generated via an app on a user-by-user basis. Most online retailers will use dynamic websites, which build their webpages by querying databases for the products most likely to appeal to each specific user. The WordPress software suite, although free and open source, natively generates dynamic websites that won’t work with GitHub Pages. There are some workarounds, such as the SimplyStatic plugin, but I had trouble getting these tools to work properly. I also considered the bare-bones option of writing the website in raw HTML and CSS. I found this to be the simplest path forward, as it doesn’t involve tinkering with any software other than a text editor. However, your website will inevitably end up looking like it is from the 90’s. My HTML/CSS attempt is still alive at limyansky. github. io (hey, its free!), for all those interested in taking a look. After this trial and error, I settled on using jekyll to build my website. This software is built with Ruby, and easily translates Markdown documents into decently looking websites. Like any good tool, the sky’s the limit!For examples of what the pros can build jekyll, take a look at Spotify for Developers and the website for the Freedom of Information Act. For my purposes, I’m already familiar with Markdown via my use of Obsidian as a note taking app in academia, which makes writing new blog posts a breeze. Jekyll is also explicitly mentioned by GitHub as working well with Pages, with the GitHub team going as far as including specific tutorials for certain aspects of its use. Although I have no prior experience with Ruby, which did cause some confusion during setup, jekyll is popular enough that tutorials and StackExchange questions are plentiful. A Note on Domain Names: Registering a domain name is a comparatively simple process - you find a domain registrar (Google Domains and NameCheap are popular examples) and pay them a few dollars to claim your desired name. There may be a few settings to tweak when connecting your domain name to your hosting service, but tutorials are abundant from registrars and hosting providers. However, something very important to keep in mind is that missing a payment (although most services offer a grace period) on your domain name means you are likely to lose access to the name for a number of years. Rather than simply being de-listed, old domain names are often auctioned to investors looking either to resell them for a profit or make money from their existing user base. One organization I was previously involved with lost their domain in this manner, although it was eventually de-listed about two years later. All this is to say that I chose Google Domains not only because I found their pricing competitive ($12 at the time of writing), but because I knew I could keep up to date with the payments if I associated them with my existing google account. Conclusions: I found the most challenging part of making this website to be selecting software and providers that would work well together. I hope that by going into detail on what I finally settled on, I can save you some time in designing your own website. Good luck! "
    }, {
    "id": 6,
    "url": "http://localhost:4000/quick-start-guide/",
    "title": "Let's test spoilers",
    "body": "2018/01/11 - Director Roland Suso Richter’s enigmatic psychological thriller (direct to video/DVD) was based upon screenwriter Michael Cooney’s own play “Point of Death” - a title that gave away the film’s entire plot twist premise. As in many similar films, such as Jacob’s Ladder (1990), Soul Survivors (2001), and The Butterfly Effect (2004), events and people were thoroughly distorted and confused because the protagonist was at the point of death. The tagline was misleading: “When You Don’t Have a Memory, How Can You Remember Who to Trust?” The mind-warping film opened with a hospital patient Simon Cable (Ryan Phillippe) awakening in a hospital with little knowledge (amnesia perhaps?) of what had happened, and why he was there, etc. He was told by attending Dr. Jeremy Newman (Stephen Rea) that it was July 29, 2002 (Simon thought it was the year 2000 - he was confused - he heard a doctor say 20:00 hours!) and that he had died for two minutes from cardiac arrest following the near-fatal accident – but he had been revived (“You’re as good as new”). Dr. Newman: “Simon, this is the 29th of July. The year is 2002. And your wife, whose name is Anna, is waiting outside. ” (The doctor left off four crucial additional words, revealed in the film’s ending. ) (Spoiler: Simon had died and was not resuscitated!). A major clue to everything that truly happened was the scene that played next under the credits - hospital staff failed to bring a patient back to life with a defibrillator after a car accident. Chest compressions failed and there was no pulse. A second major clue was provided by hospital orderly Travis (Stephen Graham): Everybody dies. No mystery there. But why and how everyone dies. Now, there’s a mystery worth solving. Probably the biggest mystery there is. So how do we do spoilers?: 1&lt;span class= spoiler &gt;My hidden paragraph here. &lt;/span&gt;"
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