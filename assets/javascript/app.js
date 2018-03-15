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

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&limit=10&api_key=dc6zaTOxFJmzC";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $('#gifs').empty();
            (response.data).forEach (function (data) {
                var gif = $('<img>');
                gif.attr('src', data.images.fixed_height_still.url);
                gif.attr('srcMove', data.images.fixed_height.url);

                // gif.html($('<img>',{id:'gif',src:gif.attr('src')}));
                // $("#gifs").on("click", "#gif", function() {
                //     $('this').html($('<img>',{id:'gif',src:gif.attr('srcMove')}));
                // })
                $('#gifs').append(gif);

                
            });
            $("#gifs").on("click", 'img', function() {
                console.log($(this).attr('src') + $(this).attr('srcMove'));
            
                $(this).attr('src', $(this).attr('srcMove'));
            })
            

        });
    
    
    });
    
});

