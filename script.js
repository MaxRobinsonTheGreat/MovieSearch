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

    function sortify(data) {
        rating = data.Metascore;
        if (rating > max) {
            max = rating;
            chosenOne = data;
            console.log(chosenOne);
        }
    }

    $("#sorter").click(function(e) {
        e.preventDefault();
        var chosenOne = null;
        var max = 0;
        for (item of datalist) {
            var movie = getMovieData(item.Title);
            console.log("fun "+movie);
            if(movie.Metascore > max){
                max = movie.Metascore;
                chosenOne = movie;
            }
        }
      alert(chosenOne);  
    });
    
    function getMovieData(title){
        var url = "http://www.omdbapi.com/?t=" + title + "&apikey=a6a90d52";
        $.getJSON(url, function(data) {
            console.log(data)
            return data;
        }).done(function() {
            console.log('getJSON request succeeded!');
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
        }).always(function() {
            console.log('getJSON request ended!');
        });
    }
    
    function getMovieName() {
        name = $("#movie-field").val();
        name.toLowerCase();
        name.replace(" ", "_");
        return name;
    }
});
