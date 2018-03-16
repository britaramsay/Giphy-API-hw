// List of topics for gifs
var topics = ['cats', 'dogs', 'snakes', 'ferret'];
var $this = '';
var title;


$(document).ready(function () { 
    renderButtons();
});

function renderButtons () { 
    $('#topics').empty();
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
}


function callAPI () {  
    // Set title to data-name for that button
    title = $(this).attr("data-name");   
    console.log($(this).attr("data-name"));
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
            // Create div for image and rating
            var imgDiv = $('<div>')
                .addClass('image');
            // Create img element
            var gif = $('<img>')
                .addClass('img')
                // Set src attribute to the still img url
                .attr('src', data.images.fixed_height_still.url)
                // Set srcStill attribute to the still img url
                .attr('srcStill', data.images.fixed_height_still.url)
                // Set srcMove attribute to the moving gif url
                .attr('srcMove', data.images.fixed_height.url);
                
            // Create div for rating
            var rating = $('<p>')
                // Set text to image rating
                .text('Rating: ' + data.rating);
            // Append gif and raitng to imgDiv
            imgDiv.append(gif, rating);  
            // Append imgDiv to gifs element
            $('#gifs').append(imgDiv);           
        }); 
       
    
    });
    
}
     
// When a topic button is clicked
$(document).on("click", ".topic", callAPI);
 // When a image is clicked
 $(document).on("click", '.img', function() {  

    console.log(title);
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

// renderButtons();