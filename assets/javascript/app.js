var list = JSON.parse(localStorage.getItem("userlist"));
    // Checks to see if the todolist exists in localStorage and is an array currently
    // If not, set a local list variable to an empty array
    // Otherwise list is our current list of todos
if (!Array.isArray(list)) {
  list = [];
}

function display() {
  $("#list").empty();
  var insideList = JSON.parse(localStorage.getItem("userlist"));

      // Checks to see if we have any todos in localStorage
      // If we do, set the local insideList variable to our todos
      // Otherwise set the local insideList variable to an empty array
    if (!Array.isArray(insideList)) {
      insideList = [];
    }

    for (var i = 0; i < insideList.length; i++) {
      var itemGrp = $("<div class='itemGrp'>");
      var p = $("<p>").text(insideList[i]);
      var b = $("<button class='delete'>").text("x").attr("data-index", i);
      // var heart = $("<i>").addClass("material-icons").text("favorite_border");
      var heart = "<i class='material-icons heart' state='heart-empty'>favorite_border</i>"
      var heartsMult = $("<div class='hearts'>");
      heartsMult.append(heart.repeat(5));
      p.prepend(b);
      itemGrp.append(p);
      itemGrp.append(heartsMult);
      $("#list").prepend(itemGrp);
    }
}

display();

$("#add").on("click", function(event) {
  event.preventDefault();
  // Setting the input value to a variable and then clearing the input
  if($("#addChoice").val() !== ""){
    var val = $("input[type='text']").val().trim();
    // Adding our new todo to our local list variable and adding it to local storage
    list.push(val);
    localStorage.setItem("userlist", JSON.stringify(list));
    display();
    $("input[type='text'").val("");
  }
});

$("#clear").on("click", function(event) {
event.preventDefault();
var insidelist = JSON.parse(localStorage.getItem("userlist"));

  // Deletes the item marked for deletion
  insidelist = [];
  list = insidelist;

  localStorage.setItem("userlist", JSON.stringify(insidelist));

  display();
});

$(document.body).on("click", "button.delete", function() {
  var insidelist = JSON.parse(localStorage.getItem("userlist"));
  var currentIndex = $(this).attr("data-index");

  // Deletes the item marked for deletion
  insidelist.splice(currentIndex, 1);
  list = insidelist;

  localStorage.setItem("userlist", JSON.stringify(insidelist));

  display();
});

// Function to change gif state between animated and still when clicked
$(document.body).on("click", ".heart", function(){
  var hState = $(this).attr("state");
  var nextState = $(this).next().attr("state");
  if (hState === "heart-empty") {
    $(this).text("favorite");
    $(this).prevAll().text("favorite");
    $(this).attr("state", "heart-full");
    $(this).prevAll().attr("state", "heart-full");
    $(this).nextAll().text("favorite_border");
    $(this).nextAll().attr("state", "heart-empty");
  }
  else if (hState === "heart-full" && $(this).is(':first-child') && nextState ==="heart-empty") {
  	$(this).text("favorite_border");
  	$(this).attr("state", "heart-empty")
  }
  else {
    $(this).nextAll().text("favorite_border");
    $(this).nextAll().attr("state", "heart-empty");
  }
});

var askJessica = function (){
  var insidelist = JSON.parse(localStorage.getItem("userlist"));
  var lengthArr = insidelist.length;
  var randomIndex = Math.floor(Math.random() * lengthArr);
  if (lengthArr == 0) {
    $("#jPick").text("Options?");
  }
  else {
  $("#jPick").text(insidelist[randomIndex]);
  }
}

$(document.body).on("click", "#pick", function() {
  askJessica();
});
