// Create a "close" button and add it to each list item
var myNodelist = document.getElementsByTagName("LI"); //get a list of all the list items
var i;
// for ever item in the list, create a close button with the class name close
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt); // the actual X symbol is added as a child of the button (within the button)
  myNodelist[i].appendChild(span); //for the currently selected list item, add a button to it
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close"); //select all elements with the class name close
var i;
// for the current close element, if clicked, select the parent element, which is the entire list item. 
// Switch the CSS to display none in order to hide it.
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul'); // select the entire list
// wait for anything within the list to be clicked, then...
list.addEventListener('click', function(ev) {
  // if a list item is clicked, (LI) then add or remove the class checked from the list item that was clicked
  // otherwise do nothing
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
// when add is clicked this function runs (called in the HTML earlier)
function newElement() {
  var li = document.createElement("li"); //creates a new, empty list item
  var inputValue = document.getElementById("myInput").value; //save the value from the text box
  var t = document.createTextNode(inputValue); //convert the value from above into a string
  li.appendChild(t); //put the text into the list item
  //check if the task is empty, if it is don't add
  if (inputValue === '' || inputValue === ' ') {
    alert("You can't have an empty task!");
  } else {
    // if is does contain text add it to the rendered list
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = ""; //reset the text box and remove what the user typed

  //add the close button just like above, along with the functionality to close it. See above for details
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}