var topics = ['cats', 'dogs', 'snakes', 'snales'];

$(document).ready(function () {  
    topics.forEach( function (topic) {  
        var button = $('<button>');
        button.addClass('btn btn-success');
        button.text(topic);

        $('#topics').append(button);
    });
});
