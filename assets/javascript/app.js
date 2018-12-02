var list = JSON.parse(localStorage.getItem("userlist"));
    // Checks to see if the todolist exists in localStorage and is an array currently
    // If not, set a local list variable to an empty array
    // Otherwise list is our current list of todos
if (!Array.isArray(list)) {
  list = [];
}

// Display list on webpage
function display() {
  $("#list").empty(); // empties out the html
  var insideList = JSON.parse(localStorage.getItem("userlist"));

      // Checks to see if we have any todos in localStorage
      // If we do, set the local insideList variable to our todos
      // Otherwise set the local insideList variable to an empty array
    if (!Array.isArray(insideList)) {
      insideList = [];
    }

    for (var i = 0; i < insideList.length; i++) {
      var itemGrp = $("<div class='itemGrp'>");
      var p = $("<p class='lText'>").text(insideList[i].Etext);
      var b = $("<button class='delete'>").text("x").attr("data-index", i);
      var heartsMult = $("<div class='hearts'>").attr("heart-index", insideList[i].hearts).attr("data-index", i);

      heartsMult.append("<i class='material-icons undo'>undo</i>");

      var rating = insideList[i].hearts;
      for (var x = 0; x < rating; x++){
          var favHeart = "<i class='material-icons heart' style='font-size:35px;' heartNum=" + (x + 1) + 
          ">favorite</i>";
          heartsMult.append(favHeart);
      }
      for (var y = rating; y < 3 ; y++){
        var emptyHeart = "<i class='material-icons heart' style='font-size:35px;' heartNum=" + (y + 1) + ">favorite_border</i>";
          heartsMult.append(emptyHeart);
      }
      // heartsMult.append(heart.repeat(5));
      p.prepend(b);
      itemGrp.append(p);
      itemGrp.append(heartsMult);
      $("#list").append(itemGrp);
    }
}
// render our todos on page load
display();

// Add new entry
$("#add").on("click", function(event) {
  event.preventDefault();
  // Setting the input value to a variable and then clearing the input
  if (list.length < 10){

    var entryText = $("input[type='text']").val().trim();
    $("input[type='text'").val("");

    if(entryText !== ""){
      var heartVal = 0;
      var entry = {
        "Etext": entryText,
        "hearts": heartVal
        };
      // Adding our new todo to our local list variable and adding it to local storage
      list.push(entry);
      localStorage.setItem("userlist", JSON.stringify(list));
      display();
      // console.log(list.length)
    }
  }   else{
    alert("Sorry, you only get 10 options. Please delete something.")
  }
});

// Clear entire list
$("#clear").on("click", function(event) {
event.preventDefault();
var insidelist = JSON.parse(localStorage.getItem("userlist"));

  // Deletes the item marked for deletion
  insidelist = [];
  list = insidelist;

  localStorage.setItem("userlist", JSON.stringify(insidelist));

  display();
});

// Delete entry
$(document.body).on("click", "button.delete", function() {
  var insidelist = JSON.parse(localStorage.getItem("userlist"));
  var currentIndex = $(this).attr("data-index");

  // Deletes the item marked for deletion
  insidelist.splice(currentIndex, 1);
  list = insidelist;

  localStorage.setItem("userlist", JSON.stringify(insidelist));

  display();
});

// Change heart rating
$(document.body).on("click", ".heart", function(){
    var hNum = parseInt($(this).attr("heartNum"));
    var dNum = parseInt($(this).parent().attr("data-index"));
    // console.log(hNum);
    // console.log(dNum);

    var insidelist = JSON.parse(localStorage.getItem("userlist"));
    insidelist[dNum].hearts=hNum;
    // console.log("New heart num: " + insidelist[dNum].hearts);

    list = insidelist;

    localStorage.setItem("userlist", JSON.stringify(insidelist));

    display();
});

// Zero out hearts
$(document.body).on("click", ".undo", function(){
    var dNum = parseInt($(this).parent().attr("data-index"));

    var insidelist = JSON.parse(localStorage.getItem("userlist"));
    insidelist[dNum].hearts=0;

    list = insidelist;

    localStorage.setItem("userlist", JSON.stringify(insidelist));

    display();
});


var askJessica = function (){
  var insidelist = JSON.parse(localStorage.getItem("userlist"));
  var lengthArr = insidelist.length;
  var weightedArr = [];
  
  for (var i = 0; i < lengthArr ; i++){
    var hNum = parseInt(insidelist[i].hearts);
    for (var x = 0; x <= hNum ; x++){
      weightedArr.push(i);
    }
  }
  if (lengthArr == 0) {
    $("#jPick").text("Options?");
  }
  else {
    var lengthWeightedArray = weightedArr.length;
    var randomIndex = Math.floor(Math.random() * lengthWeightedArray);
    var choice = weightedArr[randomIndex];
    // console.log(lengthWeightedArray);
    // console.log("Array " + weightedArr);
    // console.log("Random Index: " + randomIndex);
    // console.log("Choice: " + choice);
    $("#jPick").text(insidelist[choice].Etext);
    $("#jPick").append("<i class='material-icons' id='thumbDown'>thumb_down</i>");
    $("#jPick").append("<i class='material-icons' id='thumbUp'>thumb_up</i>");
    

  var apikey = "57fd7b1be3b84af394c2693c04cb788d";
  var subject = insidelist[choice].Etext;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=" + apikey +
  "&limit=1";

  // // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // After the data comes back from the API
  .done(function(response){
    var results = response.data;
    console.log(results);
    for (var i = 0; i<results.length; i++){
      //Limit result ratings displayed
      if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
        var gifDiv = $("<div class= 'gDiv'>");
        var imageUrlS = results[i].images.fixed_height_still.url;
        var imageUrlA = results[i].images.fixed_height.url;
        var topicImg = $("<img>");
        topicImg.attr("src", imageUrlA);
        topicImg.attr("alt","image");
        topicImg.attr("data-still", imageUrlS);
        topicImg.attr("data-animate", imageUrlA);
        topicImg.attr("data-state", "animate");
        topicImg.addClass("gif");
        gifDiv.prepend(topicImg);
        $("#jPick").append(gifDiv);
      }
    } 
  });
  }

}
// Ask Jessica button
$(document.body).on("click", "#pick", function() {
  askJessica();
});

// Thumbs down icon click
$(document.body).on("click", "#thumbDown", function(){
    $("#jPick").text("");
});

// Thumbs up icon click
$(document.body).on("click", "#thumbUp", function(){
    var picked = $("#jPick").text();
    var test = picked.substring(0,picked.length-18);
    // console.log(test);
    $("#jPick").text("");
    $("#pickedList").text(test);

});

$(document.body).on("click", ".gif", function(){
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state","still");
  }
  $(this).prev("tr").remove();
});