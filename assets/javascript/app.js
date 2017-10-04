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
      var heart = "<i class='material-icons' id='heart-empty'>favorite_border</i>"
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
var userlist = JSON.parse(localStorage.getItem("userlist"));

  // Deletes the item marked for deletion
  userlist = [];
  list = userlist;

  localStorage.setItem("userlist", JSON.stringify(userlist));

  display();
});

$(document).on("click", "button.delete", function() {
  var userlist = JSON.parse(localStorage.getItem("userlist"));
  var currentIndex = $(this).attr("data-index");

  // Deletes the item marked for deletion
  userlist.splice(currentIndex, 1);
  list = userlist;

  localStorage.setItem("userlist", JSON.stringify(userlist));

  display();
});

