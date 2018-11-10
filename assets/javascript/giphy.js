//GIPHY CREATOR!!!
$(document).ready(function() {


    // GIPHY API KEY: SJ20szTUJrDjECFq4AvkTmf4OigY3Uie

    var topicList = ["The Tin Man", "Mega Man", "T-800", "T-1000", "Johnny 5", "Bender", "C-3P0", "R2D2", "The Iron Giant", "Optimus Prime", "Astro Boy", "WALL-E", "RoboCop"];

 
 
    $("#user-submit").on("click", function(event){
        event.preventDefault();

        var newGifSubject = $("#user-input").val();
        

        topicList.push(newGifSubject);
        // console.log(topicList);

        $("#gif-form")[0].reset();

        createButtons();

    });
    
    
    
    function displayButtonGif(){
        $(".gif-display").empty();

        var gifSubject = $(this).attr("data");
        // console.log(gifSubject);


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifSubject + "&api_key=SJ20szTUJrDjECFq4AvkTmf4OigY3Uie&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response){
        $(".gif-display").empty();
        gifData = response.data;
        // console.log(gifData);

        for (i=0; i < gifData.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.attr("class", "gif-div");
            var rating = gifData[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", gifData[i].images.fixed_height_still.url)
                .attr("still", gifData[i].images.fixed_height_still.url)
                .attr("animate", gifData[i].images.fixed_height.url)
                .attr("data-state", "still")
                .attr("class", "gif");
            gifDiv.append(p);
            gifDiv.append(gifImage);

            $(".gif-display").prepend(gifDiv);

        }

        $(document).on("click", ".show-gif-button", displayButtonGif);

        $(".gif").on("click", function() {
     
            var still = $(this).attr("data-state");
      
            if (still === "still"){
              var animatedGif = $(this).attr("animate");
              $(this).attr("src", animatedGif);
              $(this).attr("data-state", "animate");
            } else {
              var stillGif = $(this).attr("still");
              $(this).attr("src", stillGif);
              $(this).attr("data-state", "still");
            };
           
        });

      })
      createButtons();
    };

    function createButtons(){

        $(".button-div").empty();

        for (i=0; i< topicList.length; i++){
            var newButton = $("<button>");
            newButton.attr("class", "show-gif-button btn btn-primary")
                .attr("data", topicList[i])
                .text(topicList[i]);
            $(".button-div").append(newButton);

        }

    };

 
    $(document).on("click", ".show-gif-button", displayButtonGif);

    // $(".gif").on("click", function() {
 
    //     var still = $(this).attr("data-state");
  
    //     if (still === "still"){
    //       var animatedGif = $(this).attr("animate");
    //       $(this).attr("src", animatedGif);
    //       $(this).attr("data-state", "animate");
    //     } else {
    //       var stillGif = $(this).attr("still");
    //       $(this).attr("src", stillGif);
    //       $(this).attr("data-state", "still");
    //     };
       
    // });

    createButtons();


});