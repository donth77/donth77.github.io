var wheelSound = $("#audio")[0];

var movieIDs = [754, 33927, 6963, 1250, 7091, 1830, 7270, 11699, 10427, 451, 12518, 483, 1701, 2757, 1738, 23483, 19053, 9708, 2059, 157847,
378, 9679, 2039, 795
];
var movieIDs2 = [71676, 1722, 1852, 242310, 6637, 13811, 10013, 70578, 13184, 47327, 6071, 74998, 9802, 47359, 27022, 8688, 83105, 23047, 10660, 8224,
5994, 12100, 8649, 28028
];
var movieIDs3 = [277546, 297596, 49519, 71642, 218043, 16577, 13342, 199373, 64837, 232, 35257, 285923, 11296, 9906, 112019, 2148, 19585, 6472, 23719, 6470, 
31000, 289720, 127493, 36630
];

var movieCache = {};

var movieQuotes = ["I want to take his face... off.", "Fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuck!", "People don't throw things at me any more. Maybe because I carry a bow around.", 
"Let's ride!", "I'm a vampire! I'm a vampire! I'm a vampire!", "There are two types of tragedies in life.", 
"Hey have you ever been beaten till you PISSED... BLOOD!", "Shoot him again! His soul's still dancing!", "Adios, Red Rock.", 
"I don't know if I started drinking 'cause my wife left me but fuck it anyway.", "Yoohoo! Can I get a room?", "This is a snakeskin jacket!",
"Put... the bunny... back... in the box.", "You are what you love, not what loves you.", "I've seen every possible ending.",
"Oh, child... You always knock me for a loop!", "All right, but when they attack the car, save the radio.", "OH, NO! NOT THE BEES! NOT THE BEES!",
"I'm gonna steal the Declaration of Independence!", "I went through a windshield at 4 AM and I don't give a fuck.", "I'll be taking these Huggies and whatever cash ya got.",
"I just stole fifty cars in one night!", "I lost my hand! I lost my bride!", "I would rather have had one touch of her hand than eternity without it."];

var movieQuotes2 = ["You will tell me or I will eat your stinking soul!", "I have always found something in life worth singing about and for that I cannot apologize.", "You... kept me... alive.", 
"How deep is hell?", "I'm gonna kidnap the President of the United States.", "I think shit just happens. But that's me." , "Yeah, girls mature faster than guys.", "In your hands they go back to being nothing but rocks.", 
"Where there's money, there's competition and the guy paying me usually wins.", "What's he gonna do? Not let me back in?", "Balls, Attitude, Direction.", "The hungry rabbit jumps.", "How in the name of ZEUS'S BUTTHOLE did you get out of your cell?",
"You mean America's high-flyin' red-white-and-blue bird of freedom?", "I had a dream. You were insulting me, Dave. Repeatedly.", "Who gives a shit if you're sorry?", "That makes me sound like some kind of fancy boy!", "Whomever slays the most men drinks for free.", 
"Decaf, please. I've reached my target heart rate for the day.", "DIE! FUCKER DIE! DIE!" , "I want that cake!", "What a magical heap of Navajo horseshit!", "Where are the Band-Aids? This IS an ambulance, isn't it?", "Now I know why Mother calls you \"a natural born whore.\""];


var movieQuotes3 = ["I'm gonna make sure these bastards pay for what they've taken from you." ,"You've got your head so far up Obama's ass that all you can see is his shit any more.", "Tomorrow isn't a place. It's-it's-it... Ugh! You can't see it!", "Wanna smoke?", 
"I know you all want answers, and believe me, so do I.", "It's going to make him perfect, PERFECT!", "Brad, your sister's turning into a fox!", "You know, he stalks them like his next trophy animal, he rapes them and kills them.", "I thought I was a man already.","You know, if there were gangs around like in the old days, I'd be running things, not you.",
"Ooooohhhhh!", "THIS IS MY VTTSTAHHHHHH! AHAHAHAHAHA! AHAHAHAHA!", "You ain't gonna fly any more than I could, Birdy.", "Curse you, rock, a curse upon your children!", "Is anybody hurt? Can I give somebody a lift?", "Bugle Boy, me Jesse James!", "I'm a mole. I got a thing for worms.", "And Tess... Get in the god damn chair.", 
"Ring Dings and milk? Oh sure. Then we'll get some balloons and go to the puppet show.", "I AM THE GREATEST!", "I know for all your talk, you're about the whitest damn black man I ever met.", "You want my blood?", "That was for the eight years in prison.", " I wanna shake you naked and eat you alive..."];


for(var i = 0; i < movieQuotes.length; i++){
    console.log(movieQuotes2[i]);
}

function getQuote(index){
    return movieQuotes[index];
}
function getQuote2(index){
    return movieQuotes[index];
}
function getQuote3(index){
    return movieQuotes[index];
}


var currentMovie, currentQuote;

var currentWheel = 1;
setSelected();

var spinning = false;

$(function() {
    window.WHEEL = {

        cache: {},

        init: function() {
            var _this = this;
            this.cache.wheel = $('.wheel');
            this.cache.wheelMarker = $('.marker');
            this.cache.wheelSpinBtn = $('.wheel');

            this.cache.wheelSpinBtn.on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('disabled')) {
                    _this.spin();
                }
            });
            this.resetSpin();

        },

        spin: function() {
            wheelSound.load();
            wheelSound.play();

            spinning = true;
            $("#results").html("<h1>Spinning...</h1>");

            var _this = this;

            this.resetSpin();

            this.cache.wheelSpinBtn.addClass('disabled');

            var rand = Math.random() * 1500;
            var deg = 1500 + Math.round(rand);
            duration = 17000; 

            _this.cache.wheelPos = deg;


            this.cache.wheel.transition({
                rotate: '0deg'
            }, 0)
            .transition({
                rotate: deg + 'deg'
            }, duration, 'easeOutCubic');


            _this.cache.wheelMarker.transition({
                rotate: '-20deg'
            }, 0, 'snap');


            setTimeout(function() {

                _this.cache.wheelMarker.transition({
                    rotate: '0deg'
                }, 300, 'easeOutQuad');
            }, duration - 500);

            setTimeout(function() {

                var spin = _this.cache.wheelPos;
                degrees = spin % 360;

                segment = getSegment(degrees);

                var id;
                if(currentWheel == 1){
                    id = movieIDs[segment];
                    currentQuote = movieQuotes[segment];
                }else if(currentWheel == 2){
                    id = movieIDs2[segment];
                    currentQuote = movieQuotes2[segment];
                }else if(currentWheel == 3){
                    id = movieIDs3[segment];
                    currentQuote = movieQuotes3[segment];
                }

                setTimeout(function() {
                    $("#results").show();
                    $("#poster").show();

                    var basicData;

                    if (movieCache[id] == null) {
                        tmdb.call("/movie/" + id, {
                            "append_to_response": "trailers"
                        },
                        function(data) {
                            movieCache[id] = data;
                            basicData = data;
                            displayResults(basicData);



                        },
                        function(e) {
                            console.log("Error: " + e);
                        }
                        )
                    } else {
                        basicData = movieCache[id];
                        displayResults(basicData);
                    }

                }, 700);

                _this.cache.wheelSpinBtn.removeClass('disabled');

            }, duration);


},

resetSpin: function() {
    this.cache.wheel.transition({
        rotate: '0deg'
    }, 0);
    this.cache.wheelPos = 0;
}

}

var fadeDuration = 200;
$("#wheel1-thumb").click(function(){
    if(!(currentWheel == 1) && !spinning){
        currentWheel = 1;
        setSelected();
        $(".wheel").fadeOut(fadeDuration, function() {
            $(".wheel").attr("src", "images/cage-wheel.png");
        })
        .fadeIn(fadeDuration, function(){
            window.WHEEL.resetSpin();
        });
        window.WHEEL.resetSpin();
    }
});
$("#wheel2-thumb").click(function(){
    if(!(currentWheel == 2) && !spinning){
        currentWheel = 2;
        setSelected();
        $(".wheel").fadeOut(fadeDuration, function() {
            $(".wheel").attr("src", "images/cage-wheel2.png");
        })
        .fadeIn(fadeDuration, function(){
            window.WHEEL.resetSpin();
        });
    }
});
$("#wheel3-thumb").click(function(){
    if(!(currentWheel == 3) && !spinning){
        currentWheel = 3;
        setSelected();
        $(".wheel").fadeOut(fadeDuration, function() {
            $(".wheel").attr("src", "images/cage-wheel3.png");
        })
        .fadeIn(fadeDuration, function(){
            window.WHEEL.resetSpin();
        });
    }
});
$("#mystery-thumb").click(function(){
    if(!spinning){
        currentWheel = Math.floor(Math.random() * 3) + 1;
        setSelected();
        window.WHEEL.resetSpin(); 
        $(".wheel").fadeOut(fadeDuration, function() {
            if(currentWheel == 1){
                $(".wheel").attr("src", "images/cage-wheel.png");
            }else if(currentWheel == 2){
                $(".wheel").attr("src", "images/cage-wheel2.png");
            }else if(currentWheel == 3){
                $(".wheel").attr("src", "images/cage-wheel3.png");
            }
        })
        .fadeIn(fadeDuration, function(){
            window.WHEEL.spin();
        });
    }
});

function getSegment(degrees) {
    var segment;
    for (var i = 1; i <= 24; i++) {
        if (degrees < i * 15) {
            segment = i - 1;
            i = 25;
        }
    }
    return segment;
}

function displayResults(data) {
    spinning = false;

    var releaseDate = new Date(data.release_date);
    var year = releaseDate.getFullYear();

    currentMovie = data.id;

    var title;
    if(currentMovie == 242310){
        title = "Rage";
    }else if(currentMovie == 71642){
        title = "Time To Kill";
    }else{
        title = data.original_title;
    }

    var tagline;
    if(currentMovie == 2757){
        tagline = "Charlie Kaufman writes the way he lives... With Great Difficulty";
    }else{
        tagline = data.tagline;
    }

    var youtubeURL = "http://www.youtube.com/embed/";
    if(currentMovie == 23047){
        youtubeURL += "YHR56TdWC44";
    }else if(currentMovie == 28028){
        youtubeURL += "gr2yb3Vzc1k";
    }else if(currentMovie == 285923){
        youtubeURL += "lZad00qYMbQ";
    }else if(currentMovie == 112019){
        youtubeURL += "gCi3ZQWA6j8";
    }else if(currentMovie == 64837){
        youtubeURL += "PQJvtY47_Rw";
    }else if(currentMovie == 71642){
        youtubeURL += "DJi5zNgpKDo";
    }else if(currentMovie == 35257){
        youtubeURL += "HEStW6KkSBg";
    }else if(currentMovie == 47359){
        youtubeURL += "xiZd9cftM8s";
    }else{
        youtubeURL += data.trailers.youtube[0].source;
    }

    var watchLink = "http://www.fan.tv/movies/";
    if(currentMovie == 277546){
        watchLink += 251344;
    }else if(currentMovie == 218043){
        watchLink += 205417;
    }else if(currentMovie == 289720){
        watchLink += 263552;
    }else if(currentMovie == 242310){
        watchLink += 220998;
    }else if(currentMovie == 199373){
        watchLink += 193814;
    }else if(currentMovie == 297596){
        watchLink = "http://putlocker.tn/dying-of-the-light/";
    }else{
        watchLink += currentMovie;
    }

    $("#results").html(
        "<h1>" + title + "(" + year + ")" + "</h1>" +
        "<h2>" + tagline + "</h2>" +
        "<br>" +
        "<div class='embed-container'><iframe src='" + 
        youtubeURL +
        "' frameborder='0' allowfullscreen></iframe></div>" + 
        "<br>" + 
        "<a class='button button-primary' href='" + watchLink + "' target='_blank'>Watch online</a>");
}

window.WHEEL.init();
});


function setSelected(){
    if(currentWheel == 1){
        $("#wheel1-thumb").css("opacity", "0.7");
        $("#wheel2-thumb").css("opacity", "1");
        $("#wheel3-thumb").css("opacity", "1");
    }else if(currentWheel == 2){
        $("#wheel2-thumb").css("opacity", "0.7");
        $("#wheel1-thumb").css("opacity", "1");
        $("#wheel3-thumb").css("opacity", "1");
    }else if(currentWheel == 3){
        $("#wheel3-thumb").css("opacity", "0.7");
        $("#wheel1-thumb").css("opacity", "1");
        $("#wheel2-thumb").css("opacity", "1");
    }
}
$("#wheel1-thumb").mouseover(function() {
    $(this).css("opacity", "0.7");
}).mouseout(function() {
    if(!(currentWheel == 1)){
        $(this).css("opacity", "1");
    }
});
$("#wheel2-thumb").mouseover(function() {
    $(this).css("opacity", "0.7");
}).mouseout(function() {
    if(!(currentWheel == 2)){
        $(this).css("opacity", "1");
    }
});
$("#wheel3-thumb").mouseover(function() {
    $(this).css("opacity", "0.7");
}).mouseout(function() {
    if(!(currentWheel == 3)){
        $(this).css("opacity", "1");
    }
});