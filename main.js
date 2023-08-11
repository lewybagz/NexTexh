var mouseDot = document.querySelector("[data-mouse-dot]");
var mouseFollow = document.querySelector("[data-mouse-follow]");
var targetX = 0;
var targetY = 0;
var currentX = 0;
var currentY = 0;
var velocityX = 0;
var velocityY = 0;
var friction = 0.75;
var cartContent = document.querySelector(".cart-content");
var cartSymbol = document.querySelector(".cart-symbol");
var cartCount = 0;
updateCartCountDisplay();

document.addEventListener("DOMContentLoaded", function () {
  var toggleMenu = document.querySelector(".toggleMenu");
  var navigation = document.querySelector(".navigation");
  var navLinks = document.querySelectorAll(".navigation li a");
  var currentPage = window.location.href;

  toggleMenu.addEventListener("click", function () {
    navigation.classList.toggle("active");
  });

  navLinks.forEach(function (link) {
    // If the link URL matches the current page URL, add the active class to the parent li
    if (link.href === currentPage) {
      link.parentElement.classList.add("active");
    }

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

document.querySelector(".cart-symbol").addEventListener("click", function () {
  var cartOverlay = document.getElementById("cart-overlay");
  var cartContent = cartOverlay.querySelector(".cart-content");
  cartOverlay.style.display = "block";
  cartContent.classList.add("open"); // Add the open class
});

document
  .getElementById("close-cart-btn")
  .addEventListener("click", function () {
    var cartOverlay = document.getElementById("cart-overlay");
    var cartContent = cartOverlay.querySelector(".cart-content");
    cartContent.classList.remove("open"); // Remove the open class
    cartOverlay.style.display = "none";
  });

document.querySelectorAll(".add-to-cart-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    var productDiv = button.closest(".product, .feat-product"); // Match both regular and featured products
    var name = productDiv.querySelector(".product-name").textContent;
    var price = productDiv.querySelector(".product-price span").textContent;
    var quantity = productDiv.querySelector(".quantity-selector").value;
    var imageUrl = productDiv.querySelector(".img-box img").src;

    addToCart(name, price, quantity, imageUrl);
  });
});

function addToCart(name, price, quantity, imageUrl) {
  var cartItems = document.getElementById("cart-items");
  var cartTotal = document.getElementById("cart-total");
  var total = parseFloat(cartTotal.textContent.replace("$", ""));

  var itemPrice = parseFloat(price.replace("$", "")) * quantity;
  itemPrice = itemPrice.toFixed(2); // Round the individual item's total price

  var item = document.createElement("div");
  item.innerHTML = `
  <div class="cart-item">
  <div class="cart-item-container">
    <img src="${imageUrl}" alt="${name}" class="cart-item-img" />
    <div class="cart-item-details">
      <h4>${name}</h4>
      <span>${price} ( ${quantity} ) = $${itemPrice}</span>
    </div>
  </div>
    <button class="remove-item-btn">Remove</button> <!-- Add the "Remove" button here -->
  </div>
`;

  // Add the shake class to the cart symbol
  var cartSymbol = document.querySelector(".cart-symbol");
  cartSymbol.classList.add("shake");

  // Remove the shake class after the animation duration (0.5s in this example)
  setTimeout(function () {
    cartSymbol.classList.remove("shake");
  }, 500);
  
  cartCount += parseInt(quantity); // Increment the cart count by the quantity added
  updateCartCountDisplay();

  cartItems.appendChild(item);
  total += parseFloat(itemPrice);
  cartTotal.textContent = "$" + total.toFixed(2); // Round the total cart price
  showNotification("cart-notification");
}

document.getElementById("cart-items").addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-item-btn")) {
    var itemContainer = e.target.closest(".cart-item");
    var priceSpan = itemContainer.querySelector(".cart-item-details span");
    var itemPrice = parseFloat(priceSpan.textContent.split(" = $")[1]);
    var cartTotal = document.getElementById("cart-total");
    var total = parseFloat(cartTotal.textContent.replace("$", "")) - itemPrice;
    cartTotal.textContent = "$" + total.toFixed(2);

    // Add the slide-out-right class to start the animation
    itemContainer.classList.add("slide-out-right");

    var quantitySpan = itemContainer.querySelector(".cart-item-details span");
    var itemQuantity = parseInt(
      quantitySpan.textContent.split(" ( ")[1].split(" )")[0]
    );
    cartCount -= itemQuantity; // Decrement the cart count by the quantity removed
    updateCartCountDisplay(); // Update the cart count display

    // Remove the item from the DOM after the animation is complete (0.5s)
    setTimeout(function () {
      itemContainer.remove();
    }, 500);
  }
});

function showNotification(id) {
  var notification = document.getElementById(id);
  notification.style.display = "block";

  // Hide the notification after 3 seconds
  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}

// Function to update the cart count display
function updateCartCountDisplay() {
  var cartCountDiv = document.querySelector(".cart-count");
  cartCountDiv.textContent = cartCount; // Set the text content to the current cart count
}
