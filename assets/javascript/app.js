// List of topics for gifs
var topics = ['cats', 'dogs', 'snakes', 'snails'];

$(document).ready(function () { 
    // For each topic in the array 
    topics.forEach( function (topic) {  
        // Create a button element
        var button = $('<button>');
        button.addClass('btn btn-success topic');
        // Set text for button to the current topic
        button.text(topic);
        // Set data-name to the topic
        button.attr("data-name", topic);
        // Append to topics div
        $('#topics').append(button);
    });
    // When a topic button is clicked
    $("#topics").on("click", ".btn", function() { 
        // Set title to data-name for that button
        var title = $(this).attr("data-name");   
        // Define query url with search as the topic
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&limit=10&api_key=dc6zaTOxFJmzC";
        // Use ajax to get a response with that url
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Empty gifs div from a previous button being clicked
            $('#gifs').empty();
            // For each gif in the response
            (response.data).forEach (function (data) {
                // Create img element
                var gif = $('<img>');
                // Set src attribute to the still img url
                gif.attr('src', data.images.fixed_height_still.url);
                // Set srcStill attribute to the still img url
                gif.attr('srcStill', data.images.fixed_height_still.url);
                // Set srcMove attribute to the moving gif url
                gif.attr('srcMove', data.images.fixed_height.url);
                // Append to gifs div
                $('#gifs').append(gif);                
            });
            // When a image is clicked
            $("#gifs").on("click", 'img', function() {  
                // If image is still
                if($(this).attr('src') == $(this).attr('srcStill')) {
                    // Change src to the moving image url          
                    $(this).attr('src', $(this).attr('srcMove'));
                }
                // If image is moving
                else if($(this).attr('src') == $(this).attr('srcMove')) {
                    // Change src to the still image url          
                    $(this).attr('src', $(this).attr('srcStill'));
                }
            })
        
        });
    
    });
    
});

