movieIDs=[754,33927,6963,1250,7091,1830,7270,11699,10427,451,12518,483,1701,2757,1738,23483,19053,9708,2059,157847,378,9679,2039,795];$(function(){window["WHEELOFFORTUNE"]={cache:{},init:function(){var wheelSound=$("#audio")[0];var _this=this;this["cache"]["wheel"]=$(".wheel");this["cache"]["wheelMarker"]=$(".marker");this["cache"]["wheelSpinBtn"]=$(".wheel");this["cache"]["wheelMapping"]=[23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]["reverse"]();this["cache"]["wheelMapping"]=["Face Off","Deadfall","The Weather Man","Ghost Rider","Vampire\x27s Kiss","Lord of War","Matchstick Men","Bad Lietenant: Port of Call","Red Rock West","Leaving Las Vegas","Honeymoon in Vegas","Wild at Heart","Con-Air","Adaptation","Next","Kick-Ass","Valley Girl","The Wicker Man","National Treasure","Joe","Raising Arizona","Gone in 60 Seconds","Moonstruck","City of Angels"];this["cache"]["wheelSpinBtn"]["on"]("click",function(e){e["preventDefault"]();if(!$(this)["hasClass"]("disabled")){_this["spin"]();wheelSound["load"]();wheelSound["play"]();};});this["resetSpin"]();},spin:function(){$("#results")["html"]("\x3Ch1\x3ESpinning...\x3C/h1\x3E");var _this=this;this["resetSpin"]();this["cache"]["wheelSpinBtn"]["addClass"]("disabled");var rand=Math["random"]()*1500;var deg=1500+Math["round"](rand);duration=1000;_this["cache"]["wheelPos"]=deg;this["cache"]["wheel"]["transition"]({rotate:"0deg"},0)["transition"]({rotate:deg+"deg"},duration,"easeOutCubic");_this["cache"]["wheelMarker"]["transition"]({rotate:"-20deg"},0,"snap");setTimeout(function(){_this["cache"]["wheelMarker"]["transition"]({rotate:"0deg"},300,"easeOutQuad")},duration-500);setTimeout(function(){var spin=_this["cache"]["wheelPos"];degrees=spin%360;segment=getSegment(degrees);win=_this["cache"]["wheelMapping"][segment];var id=movieIDs[segment];setTimeout(function(){$("#results")["show"]();$("#poster")["show"]();var imageData;tmdb["call"]("/movie/"+id+"/images",{},function(data){imageData=data},function(e){});tmdb["call"]("/movie/"+id,{"append_to_response":"trailers"},function(data){var releaseDate= new Date(data["release_date"]);var year=releaseDate["getFullYear"]();$("#results")["html"]("\x3Ch1\x3E"+data["original_title"]+"("+year+")"+"\x3C/h1\x3E"+"\x3Ch2\x3E"+data["tagline"]+"\x3C/h2\x3E"+"\x3Cbr\x3E\x3Cdiv class=\x27embed-container\x27\x3E\x3Ciframe src=\x27http://www.youtube.com/embed/"+data["trailers"]["youtube"][0]["source"]+"\x27 frameborder=\x270\x27 allowfullscreen\x3E\x3C/iframe\x3E\x3C/div\x3E");},function(e){});},700);_this["cache"]["wheelSpinBtn"]["removeClass"]("disabled");},duration);},resetSpin:function(){this["cache"]["wheel"]["transition"]({rotate:"0deg"},0);this["cache"]["wheelPos"]=0;}};function getSegment(degrees){var segment=1;for(var i=1;i<=24;i++){if(degrees<i*15){segment=i-1;i=25;}};return segment;}window["WHEELOFFORTUNE"]["init"]();});
