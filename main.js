var mouseDot = document.querySelector("[data-mouse-dot]");
var mouseFollow = document.querySelector("[data-mouse-follow]");
var targetX = 0;
var targetY = 0;
var currentX = 0;
var currentY = 0;
var velocityX = 0;
var velocityY = 0;
var friction = 0.75; // You can adjust the friction to change the trailing effect

document.addEventListener("DOMContentLoaded", function () {
  var toggleMenu = document.querySelector(".toggleMenu");
  var navigation = document.querySelector(".navigation");

  toggleMenu.addEventListener("click", function () {
    navigation.classList.toggle("active");
  });

  var navLinks = document.querySelectorAll(".navigation li a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Prevent the default behavior of the link
      event.preventDefault();

      // Remove the active class from all list items
      navLinks.forEach(function (innerLink) {
        innerLink.parentElement.classList.remove("active");
      });

      // Add the active class to the clicked list item
      link.parentElement.classList.add("active");

      // Navigate to the link's href
      window.location.href = link.href;
    });
  });
});


document.addEventListener("mousemove", function (event) {
  // Update the position of the mouseDot element
  mouseDot.style.left = event.clientX + "px";
  mouseDot.style.top = event.clientY + "px";

  // Set the target position for the mouseFollow element
  targetX = event.clientX;
  targetY = event.clientY;
});

// Function to update the position of the mouseFollow element
function updateMouseFollow() {
  // Calculate the distance to the target
  var dx = targetX - currentX;
  var dy = targetY - currentY;

  // Calculate the velocity
  velocityX += dx * 0.1; // You can adjust the responsiveness by changing this value
  velocityY += dy * 0.1; // You can adjust the responsiveness by changing this value

  // Apply friction
  velocityX *= friction;
  velocityY *= friction;

  // Update the current position
  currentX += velocityX;
  currentY += velocityY;

  // Update the position of the mouseFollow element
  mouseFollow.style.left = currentX + "px";
  mouseFollow.style.top = currentY + "px";

  // Request the next animation frame
  requestAnimationFrame(updateMouseFollow);
}

// Start the animation
updateMouseFollow();

document.addEventListener("DOMContentLoaded", function () {
   var tabs = document.querySelectorAll("#product-nav li");
   var productNav = document.querySelector("#product-nav");
   var productSections = document.querySelectorAll(".product-section");
 
   // Function to update the underline position
   function updateUnderline() {
     var activeTab = document.querySelector("#product-nav li.active");
     if (activeTab) {
       var newLeft = activeTab.offsetLeft;
       var newWidth = activeTab.offsetWidth / productNav.offsetWidth;
       productNav.style.setProperty("--_left", newLeft + "px");
       productNav.style.setProperty("--_width", newWidth);
     }
   }
 
   tabs.forEach(function (tab) {
     tab.addEventListener("click", function () {
       // Get the target section's ID from the data-target attribute
       var target = tab.getAttribute("data-target");
 
       // Remove 'active' class from all sections
       productSections.forEach(function (section) {
         section.classList.remove("active");
       });
 
       // Remove 'active' class from all tabs
       tabs.forEach(function (otherTab) {
         otherTab.classList.remove("active");
       });
 
       // Add 'active' class to the target section
       document.getElementById(target).classList.add("active");
 
       // Add 'active' class to the clicked tab
       tab.classList.add("active");
 
       // Update the underline position
       updateUnderline();
     });
   });
 
   // Update the underline position when the page loads
   updateUnderline();
 }); 