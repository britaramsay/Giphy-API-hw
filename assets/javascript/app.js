var topics = ['cats', 'dogs', 'snakes', 'snails'];

$(document).ready(function () {  
    topics.forEach( function (topic) {  
        var button = $('<button>');
        button.addClass('btn btn-success topic');
        button.text(topic);
        button.attr("data-name", topic);

        $('#topics').append(button);
    });
    $("#topics").on("click", ".btn", function() { 
        var title = $(this).attr("data-name");   

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&limit=1&api_key=dc6zaTOxFJmzC";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var gif = $('<div>');
            gif.append($('<img>',{id:'gif',src:response.data[0].images.fixed_height.url}));

            $('#topics').append(gif);

        });
    
    
    });
    
});

