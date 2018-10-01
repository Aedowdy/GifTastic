
var weapons = ['Nuke', 'Minigun', 'Boomstick', '50Cal'];

// ========================================================

function displayGif(){

    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=DrY1PJLFBPlkYTEElrSFXUwRJ3JK5xMY&limit=10&rating=pg";

     $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
         console.log(response);
        $("#weaponsView").empty();
        for (var i = 0; i < response.data.length; i++){

            var rating = response.data[i].rating;
            var imageUrl = response.data[i].images.fixed_height.url;
            var imageStillUrl = response.data[i].images.fixed_height_still.url;

            var image = $("<img>");
            var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

            
            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);


            $('#weaponsView').prepend(image, ratingText);
            checkState ();
        }
     }); 
} 

function renderButtons(){ 

    $('#buttonsView').empty();

    for (var i = 0; i < weapons.length; i++){

        var newButton = $('<button class="btn btn-danger">') 
        newButton.addClass('weapon');  
        newButton.attr('data-name', weapons[i]); 
        newButton.text(weapons[i]); 
        $('#buttonsView').append(newButton); 
    }
}

$('#addWeapon').on('click', function(){

    var weapon = $('#weapon-input').val().trim();

    weapons.push(weapon);
    
    renderButtons();

    return false;
})


$(document).on('click', '.weapon', displayGif);

renderButtons();

function checkState(){
    $('img').on('click', function(){
  var state = $(this).attr('data-state'); 
  if (state == 'still'){
  $(this).attr('src', $(this).data('animate'));
  $(this).attr('data-state', 'animate');
  }else{
  $(this).attr('src', $(this).data('still'));
  $(this).attr('data-state', 'still');
}

    });
};