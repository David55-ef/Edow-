document.addEventListener("DOMContentLoaded", () => {
  // Global elements for Cart UI
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartButton = document.querySelector(".cart-button");
  const closeCartButton = document.getElementById("close-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalElement = document.getElementById("cart-total");
  const cartCountElement = document.getElementById("cart-count");
  const productListContainer = document.getElementById("product-list");
  const checkoutBtn = document.getElementById("checkout-btn");

  // --- 1. Product Data (Simulated Database) ---
  const products = [
    {
      id: 1,
      name: "Classic Linen Shirt",
      category: "shirts",
      size: "M",
      price: 95.0,
      img: "assets/gallery3.jpeg",
    },
    {
      id: 2,
      name: "Slim Fit Trousers",
      category: "trousers",
      size: "L",
      price: 120.0,
      img: "gallery1.jpeg",
    },
    {
      id: 3,
      name: "Leather Chelsea Boot",
      category: "shoes",
      size: "XL",
      price: 180.0,
      img: "product_shoes_1.jpg",
    },
    {
      id: 4,
      name: "Evening Silk Gown",
      category: "gowns",
      size: "S",
      price: 299.0,
      img: "product_gown_1.jpg",
    },
    {
      id: 5,
      name: "Patterned Oxford Shirt",
      category: "shirts",
      size: "S",
      price: 110.0,
      img: "product_shirt_2.jpg",
    },
    {
      id: 6,
      name: "Wool Blend Trousers",
      category: "trousers",
      size: "M",
      price: 135.0,
      img: "gallery2.jpeg",
    },
  ];

  let cart = JSON.parse(localStorage.getItem("edowCart")) || [];

  // --- 2. Core Cart Functions ---

  const saveCart = () => {
    localStorage.setItem("edowCart", JSON.stringify(cart));
    updateCartUI();
  };

  const updateCartCount = () => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = count;
  };

  const updateCartTotal = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotalElement.textContent = total.toFixed(2);
  };

  const updateCartUI = () => {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart-message">Your cart is empty.</p>';
    } else {
      cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item-detail";
        itemDiv.innerHTML = `
                    <p><strong>${item.name}</strong> ($${item.price.toFixed(
          2
        )})</p>
                    <p>Qty: ${item.quantity} 
                        <button class="remove-btn" data-id="${
                          item.id
                        }">&times;</button>
                    </p>
                    <hr/>
                `;
        cartItemsContainer.appendChild(itemDiv);
      });
      // Add listeners to new remove buttons
      document.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = parseInt(e.target.dataset.id);
          removeItemFromCart(id);
        });
      });
    }
    updateCartCount();
    updateCartTotal();
  };

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.id === productId);

    if (product) {
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      alert(`${product.name} added to cart!`);
      saveCart();
    }
  };

  const removeItemFromCart = (productId) => {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
  };

  // --- 3. UI Generation (Render Products) ---

  const renderProducts = (filteredProducts) => {
    productListContainer.innerHTML = "";
    if (filteredProducts.length === 0) {
      productListContainer.innerHTML =
        '<p style="grid-column: 1 / -1; text-align: center;">No products found matching your criteria.</p>';
      return;
    }

    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-category", product.category);
      card.setAttribute("data-size", product.size);
      card.setAttribute("data-price", product.price);

      card.innerHTML = `
                <a href="product-detail.html?id=${
                  product.id
                }" class="product-link">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <p class="price">$${product.price.toFixed(2)}</p>
                    </div>
                </a>
                <button class="add-to-cart-btn" data-product-id="${
                  product.id
                }">Add to Cart</button>
            `;

      productListContainer.appendChild(card);
    });

    // Add listeners to Add to Cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.productId);
        addToCart(id);
      });
    });
  };

  // --- 4. Search and Filter Logic ---
  window.filterProducts = () => {
    const searchTerm = document
      .getElementById("search-bar")
      .value.toLowerCase();
    const category = document.getElementById("filter-category").value;
    const size = document.getElementById("filter-size").value;

    let filtered = products.filter((product) => {
      // Search by name
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);

      // Filter by category
      const matchesCategory =
        category === "all" || product.category === category;

      // Filter by size
      const matchesSize = size === "all" || product.size === size;

      return matchesSearch && matchesCategory && matchesSize;
    });

    renderProducts(filtered);
  };

  // --- 5. Event Listeners for Cart UI ---
  cartButton.addEventListener("click", () => {
    cartSidebar.classList.add("open");
  });

  closeCartButton.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });

  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      alert(
        `Simulating Stripe Checkout for $${cartTotalElement.textContent}. \n\nNOTE: For a real e-commerce site, this would send data to a backend server to process the payment via Stripe's API.`
      );
      // Clear cart after simulated checkout
      cart = [];
      saveCart();
      cartSidebar.classList.remove("open");
    } else {
      alert("Your cart is empty. Please add items before checking out.");
    }
  });

  // Initial load
  renderProducts(products);
  updateCartUI();
});
