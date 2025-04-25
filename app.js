$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on("click", function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          }
        );
      } // End if
    });
  });

  let cart = [];

function updateCartDisplay() {
  let cartList = $("#cart-items");
  let total = 0;
  cartList.empty();
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    cartList.append(`<li>${item.name} x ${item.quantity} - ₹${subtotal}</li>`);
  });
  $("#cart-total").text(`Total: ₹${total}`);
}

$(document).on("click", ".add-to-cart", function () {
  const name = $(this).data("name");
  const price = parseInt($(this).data("price"));

  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartDisplay();
});

$("#checkout-btn").on("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Thank you for your purchase! Total: ₹${total}`);
  cart = [];
  updateCartDisplay();
});
