document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Gallery Data (Simulated) ---
  const galleryItems = [
    {
      id: 101,
      name: "Crimson Sunset Gown",
      collection: "couture",
      description: "A dramatic piece from our runway collection.",
      price: 500.0,
      img: "Assests/gallery12.jpeg",
    },
    {
      id: 102,
      name: "Oceanic Swim Set",
      collection: "resort",
      description: "Hand-dyed fabric inspired by the coast.",
      price: 185.0,
      img: "Assests/gallery17.jpeg",
    },
    {
      id: 103,
      name: "Modern Power Suit",
      collection: "formal",
      description: "Perfectly tailored for the modern professional.",
      price: 350.0,
      img: "Assests/gallery14.jpeg",
    },
    {
      id: 104,
      name: "Tropical Kaftan",
      collection: "resort",
      description: "Lightweight linen, perfect for warm climates.",
      price: 160.0,
      img: "Assests/gallery15.jpeg",
    },
    {
      id: 105,
      name: "Emerald A-Line Dress",
      collection: "formal",
      description: "Sleek and elegant evening wear.",
      price: 280.0,
      img: "Assests/gallery16.jpeg",
    },
    {
      id: 106,
      name: "Sculptural Overcoat",
      collection: "couture",
      description: "Architectural shape and unique fabric blend.",
      price: 420.0,
      img: "Assests/gallery17.jpeg",
    },
  ];

  const galleryContainer = document.getElementById("image-gallery");
  const itemModal = document.getElementById("itemModal");
  const closeItemModal = document.getElementById("close-item-modal");

  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-design-title");
  const modalDescription = document.getElementById("modal-design-description");
  const modalPrice = document.getElementById("modal-design-price");

  // --- 2. Render Gallery Items ---
  const renderGallery = (filteredItems) => {
    galleryContainer.innerHTML = "";
    if (filteredItems.length === 0) {
      galleryContainer.innerHTML =
        '<p style="grid-column: 1 / -1; text-align: center;">No designs found matching your criteria.</p>';
      return;
    }

    filteredItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      card.setAttribute("data-collection", item.collection);
      card.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="gallery-overlay">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p class="price-tag">Price: $<span>${item.price.toFixed(
                      2
                    )}</span></p>
                </div>
            `;

      // Event listener for modal
      card.addEventListener("click", () => {
        modalImage.src = item.img;
        modalImage.alt = item.name;
        modalTitle.textContent = item.name;
        modalDescription.textContent = item.description;
        modalPrice.textContent = item.price.toFixed(2);
        itemModal.style.display = "block";
      });

      galleryContainer.appendChild(card);
    });
  };

  // --- 3. Search and Filter Logic ---
  window.filterGallery = () => {
    const searchTerm = document
      .getElementById("gallery-search")
      .value.toLowerCase();
    const collectionFilter = document.getElementById("gallery-filter").value;

    let filtered = galleryItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm);
      const matchesCollection =
        collectionFilter === "all" || item.collection === collectionFilter;

      return matchesSearch && matchesCollection;
    });

    renderGallery(filtered);
  };

  // --- 4. Modal Close Handlers ---
  closeItemModal.onclick = function () {
    itemModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == itemModal) {
      itemModal.style.display = "none";
    }
  };

  // Initial load
  renderGallery(galleryItems);
});
