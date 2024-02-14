document.addEventListener("DOMContentLoaded", function () {
  const productsListElement = document.getElementById("products-list");
  const cartCounterElement = document.getElementById("cart-counter");

  // Check if cart exists in session
  let cart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];

  let allProducts = [];

  function displayProducts(products) {
    productsListElement.innerHTML = "";

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("shop-card");
      productElement.innerHTML = `
        <div class="card-banner">
          <img src="${product.image}" alt="${product.title}">
          <div class="card-actions">
            <button onclick="addToCart(${
              product.id
            })" class="action-btn cart-btn" aria-label="add to cart">
              <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
            </button>
            <button class="action-btn view-btn" aria-label="view details">
              <ion-icon name="eye-outline" aria-hidden="true"></ion-icon>
            </button>
          </div>
        </div>
        <div class="card-content">
          <div class="price">
            <span class="span">$${product.price}</span>
          </div>
          <h3>
            <a href="#" class="card-title">${product.title.slice(0, 15)}</a>
          </h3>
          <div class="card-rating">
            <div class="rating-wrapper" aria-label="5 star rating">
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
              <ion-icon name="star" aria-hidden="true"></ion-icon>
            </div>
          </div>
        </div>
      `;
      productsListElement.appendChild(productElement);

      // Add event listener to view button
      const viewBtn = productElement.querySelector(".view-btn");
      viewBtn.addEventListener("click", function () {
        viewProductDetails(product);
      });
    });
  }

  // Display cart counter
  updateCartCounter();

  // Add to cart function
  window.addToCart = function (productId) {
    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Product not in cart, add it
      const product = allProducts.find((p) => p.id === productId);
      if (product) {
        cart.push({
          id: productId,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        });
      }
    }

    updateCartCounter();
    saveCart();
    showNotificationMsg();
  };

  // // Remove item from cart function
  // window.removeFromCart = function (productId) {
  //   cart = cart.filter((item) => item.id !== productId);
  //   updateCartCounter();
  //   saveCart();
  //   location.reload();
  // };

  // // Increase quantity function
  // window.increaseQuantity = function (productId) {
  //   const cartItem = cart.find((item) => item.id === productId);
  //   if (cartItem) {
  //     cartItem.quantity += 1;
  //     updateCartCounter();
  //     saveCart();
  //   }
  //   // location.reload();
  // };

  // // Decrease quantity function
  // window.decreaseQuantity = function (productId) {
  //   const cartItem = cart.find((item) => item.id === productId);
  //   if (cartItem && cartItem.quantity > 1) {
  //     cartItem.quantity -= 1;
  //     updateCartCounter();
  //     saveCart();
  //   }
  //   // location.reload();
  // };

  // Update cart counter function
  function updateCartCounter() {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounterElement.textContent = totalCount.toString();
  }

  // Save cart function
  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Notification
  function showNotificationMsg() {
    var notification = document.createElement("div");
    notification.classList.add("popup");
    notification.innerHTML =
      '<div class="notification">Item added to cart 🖤</div>';
    document.body.appendChild(notification);
    notification.style.display = "block";
    setTimeout(function () {
      notification.style.animation =
        "fadeOut var(--duration) ease-in-out forwards";
    }, 3000);
  }

  let viewCartBtn = document.getElementById("view-cart-btn");
  viewCartBtn.addEventListener("click", function viewCart() {
    window.location.href = "cart.html";
  });

  function filterProducts(category) {
    const filteredProducts =
      category === "all"
        ? allProducts
        : allProducts.filter((product) => product.category === category);
    displayProducts(filteredProducts);
  }

  const filterButtons = document.querySelectorAll("#filter-buttons button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = button.textContent.toLowerCase();
      filterProducts(category);
    });
  });

  function viewProductDetails(product) {
    const queryParams = `?title=${product.title}&price=${product.price}&image=${product.image}&category=${product.category}&description=${product.description}`;
    window.location.href = `product-details.html${queryParams}`;
  }

  fetch("https://products-blush-phi.vercel.app/products")
    .then((response) => response.json())
    .then((products) => {
      console.log("Fetched data:", products);
      allProducts = products;
      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching products:", error));

  // ******** productDetails-page  *******
  const productDetailsElement = document.getElementById("product-details");

  // Function to parse query parameters from URL
  function getQueryParams() {
    const queryParams = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");

    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      // Check if the value is undefined before decoding
      queryParams[key] = value
        ? decodeURIComponent(value.replace(/\+/g, " "))
        : null;
    }

    return queryParams;
  }

  // Get product details from query parameters
  const queryParams = getQueryParams();
  const productDetails = {
    title: queryParams.title || "No Title",
    price: queryParams.price || "No Price",
    image: queryParams.image || "No Image",
    category: queryParams.category || "No Category",
    description: queryParams.description || "No description",
  };

  // Display product details
  productDetailsElement.innerHTML = `
    <div class="container">
      <!-- Left Column -->
      <div class="left-column">
        
        <img
          data-image="red"
          class="active"
          src="${productDetails.image}"
          alt="${productDetails.title}"
          style="object-fit: cover; width: 100%; height: 100%;
          "
        />
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Product Description -->
        <div class="product-description">
          <span>${productDetails.category}</span>
          <h1>${productDetails.title.slice(0, 15)}</h1>
          <p>
            ${productDetails.description}</p>
        </div>

        <!-- Product Configuration -->
        <div class="product-configuration">
          <!-- Product Color -->
          <div class="product-color">
            <span>Color</span>

            <div class="color-choose">
              <div>
                <input
                  data-image="red"
                  type="radio"
                  id="red"
                  name="color"
                  value="red"
                  checked
                />
                <label for="red"><span></span></label>
              </div>
              <div>
                <input
                  data-image="blue"
                  type="radio"
                  id="blue"
                  name="color"
                  value="blue"
                />
                <label for="blue"><span></span></label>
              </div>
              <div>
                <input
                  data-image="black"
                  type="radio"
                  id="black"
                  name="color"
                  value="black"
                />
                <label for="black"><span></span></label>
              </div>
            </div>
          </div>

          <!-- Cable Configuration -->
          <div class="item-rating">
            <span>Rating</span>

            <div class="card-rating">
              <div class="rating-wrapper" aria-label="5 start rating">
                <ion-icon
                  class="star"
                  name="star"
                  aria-hidden="true"
                ></ion-icon>
                <ion-icon
                  class="star"
                  name="star"
                  aria-hidden="true"
                ></ion-icon>
                <ion-icon
                  class="star"
                  name="star"
                  aria-hidden="true"
                ></ion-icon>
                <ion-icon
                  class="star"
                  name="star"
                  aria-hidden="true"
                ></ion-icon>
                <ion-icon
                  class="star"
                  name="star"
                  aria-hidden="true"
                ></ion-icon>
              </div>
            </div>

            <a href="#">How to configurate your product?</a>
          </div>
        </div>

        <!-- Product Pricing -->
        <div class="product-price">
          <span>$${productDetails.price}</span>
          <button onclick="addToCart(${
            productDetails.id
          })" id="cart-btn" class="cart-btn">Add to cart</button>
        </div>
      </div>
    </div>          
`;
});
