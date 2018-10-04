$(document).ready(function() {
    $( "#submitButton" ).click(function(e) {
    e.preventDefault();
    var url = "http://www.omdbapi.com/?s="+getMovieName()+"&apikey=a6a90d52";
        $.getJSON(url,function(data) {
            var everything;
            everything = "<ul>";
            console.log(data.Search)
            
            for(item of data.Search){
                everything += "<li> "+ item.Title + "</li>";
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
    
    function getMovieName(){
        name = $("#movie-field").val();
        name.toLowerCase();
        name.replace(" ", "_");
        return name;
    }
});