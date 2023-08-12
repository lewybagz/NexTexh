let toggleMenu = document.querySelector(".toggleMenu");
let navigation = document.querySelector(".navigation");

const mouseDot = document.querySelector("[data-mouse-dot]");
const mouseFollow = document.querySelector("[data-mouse-follow]");

var currentPage = window.location.href;

var navLinks = document.querySelectorAll(".navigation a");

window.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  mouseDot.style.left = `${mouseX}px`;
  mouseDot.style.top = `${mouseY}px`;

  mouseFollow.style.left = `${mouseX}px`;
  mouseFollow.style.top = `${mouseY}px`;

  mouseFollow.animate(
    {
      left: `${mouseX}px`,
      top: `${mouseY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
});

window.addEventListener("scroll", function () {
  // Check if the screen width is 768px or less
  if (window.matchMedia("(max-width: 768px)").matches) {
    // If it is, exit the function early
    return;
  }
  // Check if the body has the 'home-page' class
  if (!document.body.classList.contains("home-page")) {
    // If it doesn't, exit the function early
    return;
  }
  var logo = document.querySelector(".logo");
  var hero = document.querySelector(".hero");
  var circle = document.querySelector(".sub-hero .big-circle2");
  var img = document.querySelector(".sub-hero .home-img2");
  var certainDiv = document.querySelector(".controller");
  var jrnyImg = document.querySelector(".jrny-img");
  var jrnyContent = document.querySelector("#jrny-content");

  if (window.scrollY > 25) {
    /* Adjust the scroll distance as needed */
    logo.classList.add("small");
    hero.classList.add("small");
  } else {
    logo.classList.remove("small");
    hero.classList.remove("small");
  }

  // get the position of the certainDiv relative to the top of the viewport
  var certainDivPosition = certainDiv.getBoundingClientRect().top;
  // check if certainDiv has come into the viewport
  if (certainDivPosition <= window.innerHeight) {
    circle.classList.add("animate-circle");
    img.classList.add("animate-img");
  }

  // get the position of the jrnyContent relative to the top of the viewport
  var jrnyContentPosition = jrnyContent.getBoundingClientRect().top;
  // check if jrnyContent has come into the viewport
  if (jrnyContentPosition <= window.innerHeight) {
    jrnyImg.classList.add("animate-jrny-img"); // add your animation class here
  }

  // check if the user has scrolled to the bottom of the page
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
    logo.classList.add("bottom-animation"); // add your animation class here
  } else {
    logo.classList.remove("bottom-animation"); // remove the class when the user scrolls away from the bottom
  }
});

// Loop through each link
navLinks.forEach(function (link) {
  // If the link URL matches the current page URL, add the active class to the parent li
  if (link.href == currentPage) {
    link.parentElement.classList.add("active");
  }

  // Add a click event listener to each link
  link.addEventListener("click", function () {
    // Remove the active class from all tabs
    navLinks.forEach(function (link) {
      link.parentElement.classList.remove("active");
    });

    // Add the active class to the clicked tab
    link.parentElement.classList.add("active");
  });
});

// Add a click event listener to the toggleMenu
toggleMenu.addEventListener("click", function () {
  // Toggle the active class on the navigation
  navigation.classList.toggle("active");
});

window.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll("#product-nav li");
  var productNav = document.querySelector("#product-nav");

  // Function to set the initial position of the underline
  function setInitialUnderlinePosition() {
    // Find the active tab
    var activeTab = document.querySelector("#product-nav li.active");

    if (activeTab) {
      // Calculate the position and width for the underline
      const newLeft = activeTab.offsetLeft;
      const newWidth = activeTab.offsetWidth / productNav.offsetWidth;

      // Set the CSS variables
      productNav.style.setProperty("--_left", newLeft + "px");
      productNav.style.setProperty("--_width", newWidth);
    }
  }

  // Call the function to set the initial position of the underline
  setInitialUnderlinePosition();

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // Get the target section's ID from the data-target attribute
      const target = tab.getAttribute("data-target");

      // Remove 'active' class from all sections
      const sections = document.querySelectorAll(".product-section");
      sections.forEach(function (section) {
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

      // Calculate new position and width for underline
      const newLeft = tab.offsetLeft;
      const newWidth = tab.offsetWidth / productNav.offsetWidth;

      // Set the CSS variables
      productNav.style.setProperty("--_left", newLeft + "px");
      productNav.style.setProperty("--_width", newWidth);
    });
  });
});
