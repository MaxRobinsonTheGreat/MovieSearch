$(document).ready(function() {
    var datalist;
    $("#submitButton").click(function(e) {
        e.preventDefault();
        var url = "http://www.omdbapi.com/?s=" + getMovieName() + "&apikey=a6a90d52";
        $.getJSON(url, function(data) {
            var everything;
            everything = "<ul>";
            console.log(data.Search)
            datalist = data.Search;
            for (item of data.Search) {
                everything += "<li> " + item.Title + "</li>";
            }
            everything += "</ul>";
            $("#movie-list").html(everything);
        }).done(function() {
            console.log('getJSON request succeeded!');
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
        }).always(function() {
            console.log('getJSON request ended!');
        });
    });
var chosenOne = null;
var chosenPoster = null;
        var max = 0;
    function sortify(title, rating, poster) {
        if (rating > max) {
            max = rating;
            chosenOne = title;
            chosenPoster = poster;
            console.log(chosenPoster);
            
        }
    }

$("#reveal").click(function(e) {
    console.log("chosen: " + chosenOne);
    var total = "Title: " + chosenOne + "\n";
    var rater = "Rating: " + max + "\n";
    var linker = "<img src=\"" + chosenPoster + "\" alt=\"movie\">"
    $("movie-chosen").html(total);
    $("#movie-rated").html(rater);
    $("#movie-posted").html(linker);
});
    
    $("#sorter").click(function(e) {
        max = 0;
        e.preventDefault();
        for (item of datalist) {
        var url = "http://www.omdbapi.com/?t=" + item.Title + "&apikey=a6a90d52";
        $.getJSON(url, function(data) {
            console.log(data.Metascore)
            if (data.Metascore != "N/A") {
            sortify(data.Title, data.Metascore, data.Poster);
            }
        }).done(function() {
            console.log('getJSON request succeeded!');
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
        }).always(function() {
            console.log('getJSON request ended!');
        });
    }
    console.log("HIIIII");
    });
    
    function getMovieName() {
        name = $("#movie-field").val();
        name.toLowerCase();
        name.replace(" ", "_");
        return name;
    }
});
