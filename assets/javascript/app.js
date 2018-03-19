// List of topics for gifs
// var topics = ['axolotl', 'angler fish', 'vampire squid', 'blobfish'];
var topics = ['Spagett', 'Dr. Steve Brule', 'Beaver Boys', "'The Snuggler'"];
// Set favorites to an empty array
var favorites = [];

$(document).ready(function () { 
    // Create buttons when page is ready
    renderButtons();
    // If favorites have been stored in local storage
    if (localStorage.getItem("favsInStorage")) 
        // Set favorites to the item in local storage
        favorites = JSON.parse(localStorage.getItem("favsInStorage"));

    // Create button to show or hide favorites
    var showHideFavs = $('<button>')
        .text('Show Favorites (' + favorites.length + ')')
        .addClass('btn showFavs')
        // Start with favorites hidden
        .attr('state', 'hide');
    // Create button to remove all favorites
    var removeFavs = $('<button>')
        .text('Remove All Favorites')
        .addClass('btn rmFavs');
    $('#favs').append(showHideFavs, removeFavs);
    // Hide favorite gifs
    $('#favss').hide();
});

// When a user clicks the show or hide favorites button
$(document).on('click', '.showFavs', function () {
    // If favs are currently hidden
    if($(this).attr('state') == 'hide') {
        // Switch state to show
        $(this).attr('state', 'show')
        // Switch option to hide favorites
               .text('Hide Favorites');
        // Show favorites
        showFavorites();
        $('#favss').show();
    }
    else {
        $(this).attr('state', 'hide')
               .text('Show Favorites (' + favorites.length + ')');
        $('#favss').hide();
    }
});

$(document).on('click', '.rmFavs', function() {
    favorites = [];
    // Store updated favorites array in local storage
    localStorage.setItem("favsInStorage", JSON.stringify(favorites));
    showFavorites();
})

function showFavorites() {
    // Empty first to no have duplicates
    $('#favss').empty();
    // For each favorite in the array 
    favorites.forEach( function (favorite) { 
        // Create an image element
        var gif = $('<img>')
            .addClass('img-favs')
            // Set src attribute to the img url
            .attr('src', favorite);

            $('#favss').append(gif);
    }); 
}

function renderButtons () { 
    // Empty first to not have duplicates
    $('#topics').empty();
    
    // For each topic in the array 
    topics.forEach( function (topic) {  
        // Create a button element
        var button = $('<button>');
        button.addClass('btn btn-dark btn-lg topic');
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
            // Make a link to download a gif
            var downloads = $('<a>')
                .text('Download')
                // TODO: Custom file name isn't working
                .attr("download", "giphy")
                .attr('href', data.images.fixed_height.url);
            // Make add to favorites element
            var addToFavs = $('<h4>')
                // Set src to push to favorites array
                .attr('src', data.images.fixed_height_small.url)
                .addClass('addFav');
            // Set text depending on if gif is already a favorite
            // TODO: Make remove all favorites button
            if(favorites.indexOf(addToFavs.attr('src')) != -1) 
                addToFavs.text('Remove from Favorites');
            else
                addToFavs.text('Add to Favorites');
            // Create div for rating
            var rating = $('<p>')
                // Set text to image rating
                .text('Rating: ' + data.rating);
            // Append gif and raitng to imgDiv
            imgDiv.append(gif, rating, downloads, addToFavs);  
            // Append imgDiv to gifs element
            $('#gifs').append(imgDiv);           
        }); 
    });  
}

// When a user wants to add a gif to their favorites
$(document).on("click", ".addFav", function() {
    if(favorites.indexOf($(this).attr('src')) == -1) {
        // Push src to favorites array
        favorites.push($(this).attr('src'));
        $(this).text('Remove from Favorites');
    }
    else {
        // Remove from favorites
        favorites.splice(favorites.indexOf($(this).attr('src')), 1);
        $(this).text('Add to Favorites');
    }
    // Store updated favorites array in local storage
    localStorage.setItem("favsInStorage", JSON.stringify(favorites));
    // If favorites are hidden now
    if($('.showFavs').attr('state') == 'hide') 
        // Update show hide button with new favorites length
        $('.showFavs').text('Show Favorites (' + favorites.length + ')');
    // Call showFavorites to add the new favorite gif
    showFavorites();
})

// When a topic button is clicked
$(document).on("click", ".topic", callAPI);

// When a image is clicked
$(document).on("click", '.img', function() {  
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

$(document).on("click", "#add-topic", function(event) {
    // Prevent page from refreshing on form submit
    event.preventDefault();
    // Trim the value entered into the text box
    var topic = $("#topic-input").val().trim();
    // If the user entered something
    if(topic.length > 0) {
        // Push new topic to the topics array
        topics.push(topic);
    }
    // Call render button to remake buttons with new topic added
    renderButtons();
});