$(document).ready(function() {
    $( "#submitButton" ).click(function(e) {
    e.preventDefault();
    var url = "http://www.omdbapi.com/?s="+$("#movie-field").val()+"&apikey=a6a90d52";
        $.getJSON(url,function(data) {
            console.log(data)
            var everything;
            everything = "<ul>";
            console.log(data.Search)
            
            for(item of data.Search){
                everything += "<li> "+ item.Title;
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
});