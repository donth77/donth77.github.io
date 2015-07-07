var movieIDs = [754, 33927, 6963, 1250, 7091, 1830, 7270, 11699, 10427, 451, 12518, 483, 1701, 2757, 1738, 23483, 19053, 9708, 2059, 157847,
    378, 9679, 2039, 795
];
var movieCache = {};

var currentMovie;

$(function() {
    window.WHEEL = {

        cache: {},

        init: function() {
            var wheelSound = $("#audio")[0];

            var _this = this;
            this.cache.wheel = $('.wheel');
            this.cache.wheelMarker = $('.marker');
            this.cache.wheelSpinBtn = $('.wheel');

            this.cache.wheelSpinBtn.on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('disabled')) {
                    _this.spin();
                    wheelSound.load();
                    wheelSound.play();
                }
            });
            this.resetSpin();

        },

        spin: function() {
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

                var id = movieIDs[segment];

                setTimeout(function() {
                    $("#results").show();
                    $("#poster").show();

                    var imageData;
                    var basicData;
                    /**tmdb.call("/movie/" + id + "/images", {},
                        function(data){
                            imageData = data;
                            $('html').fadeTo('fast', 0.5, function()
                            {
                                $(this).css({
                                    'background-image': 'url(' + tmdb.images_uri + "/w780" + imageData.backdrops[0].file_path + ')'
                                });
                            }).fadeTo('slow', 1);
                            $("#poster").html("<img src='"  + tmdb.images_uri + "/w780" + imageData.backdrops[0].file_path + "'/>")
                            console.log(imageData);

                        }, 
                        function(e){
                           // console.log("Error: "+e)
                        }
                        )**/

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
        var releaseDate = new Date(data.release_date);
        var year = releaseDate.getFullYear();

        var watchLink = "https://www.fan.tv/movies/" + data.id;

        currentMovie = data.id;

        $("#results").html(
            "<h1>" + data.original_title + "(" + year + ")" + "</h1>" +
            "<h2>" + data.tagline + "</h2>" +
            "<br>" +
            "<div class='embed-container'><iframe src='http://www.youtube.com/embed/" + 
            data.trailers.youtube[0].source +
            "' frameborder='0' allowfullscreen></iframe></div>" + 
            "<br>" + 
            "<a href='" + watchLink + "' target='_blank'>Watch " + data.original_title +  " online</a>");
    }

    window.WHEEL.init();
});