document.addEventListener("DOMContentLoaded", function () {
  const cartItemsElement = document.getElementById("cart-items");
  const cartCounterElement = document.getElementById("cart-counter");

  let cart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];

  // Display cart items
  function displayCartItems() {
    cartItemsElement.innerHTML = "";
    let totalAllPrice = 0;

    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `<div class="image">
            <img src="${item.image}" alt="${
        item.title
      }" style="object-fit: cover; width: 100%; height: 100%;" />
        </div>

        <div class="description">
            <span>${item.title.slice(0, 10)}</span>
            <span>${item.category}</span>
        </div>

        <div class="quantity">
            <button onclick="decreaseQuantity(${
              item.id
            })" class="quantity-btn" type="button">
                -
            </button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${
              item.id
            })" class="quantity-btn" type="button">
                +
            </button>
        </div>

        <div class="total-price">$${item.price * item.quantity}</div>
        <div class="buttons">
            <span onclick="removeFromCart(${item.id})" class="delete-btn">
                <ion-icon name="trash-outline"></ion-icon>
            </span>
        </div>
    `;
      cartItemsElement.appendChild(cartItemElement);
      totalAllPrice += item.price * item.quantity;
    });
    const totalAllPriceElement = document.querySelector(".all-price");
    // totalAllPriceElement.document.queryselectorall(".all-price");
    totalAllPriceElement.textContent = `$${totalAllPrice}`;
    //   cartItemsElement.appendChild(totalAllPriceElement);
  }

  // Initial display of cart items
  displayCartItems();

  // Update cart counter
  function updateCartCounter() {
    if (cartCounterElement) {
      const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCounterElement.textContent = totalCount.toString();
    }
  }

  // Increase quantity function
  window.increaseQuantity = function (productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
      displayCartItems();
      updateCartCounter();
      saveCart();
    }
  };

  // Decrease quantity function
  window.decreaseQuantity = function (productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      displayCartItems();
      updateCartCounter();
      saveCart();
    }
  };

  // Remove item from cart function
  window.removeFromCart = function (productId) {
    cart = cart.filter((item) => item.id !== productId);
    displayCartItems();
    updateCartCounter();
    saveCart();
  };

  // Save cart function
  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
});
