//GIPHY CREATOR!!!
$(document).ready(function() {


    // GIPHY API KEY: SJ20szTUJrDjECFq4AvkTmf4OigY3Uie
    
  

    var topicList = ["kitty", "doggy", "piggy", "wiggy", "figgy"];

    //method to create buttons from topicList array into button-div
 


    
    


    $("#user-submit").on("click", function(event){
        event.preventDefault();

        var newGifSubject = $("#user-input").val();

        topicList.push(newGifSubject);
        console.log(topicList);

        createButtons();

    });
    
    
    
    function displayButtonGif(){

        var gifSubject = $(this).attr("data");
        console.log(gifSubject);


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifSubject + "&api_key=SJ20szTUJrDjECFq4AvkTmf4OigY3Uie&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response){
        
        gifData = response.data;
        console.log(gifData);

        for (i=0; i < gifData.length; i++) {
            var gifDiv = $("<div>");
            var rating = gifData[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", gifData[i].images.fixed_height_still.url)
                .attr("still", gifData[i].images.fixed_height_still.url)
                .attr("animate", gifData[i].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(gifImage);

            $(".gif-display").prepend(gifDiv);

        }

      })
      createButtons();
    };

    function createButtons(){

        $(".button-div").empty();

        for (i=0; i< topicList.length; i++){
            var newButton = $("<button>");
            newButton.attr("class", "show-gif-button")
                .attr("data", topicList[i])
                .text(topicList[i]);
            $(".button-div").append(newButton);

        }

    };


    $(document).on("click", ".show-gif-button", displayButtonGif);

    createButtons();


});