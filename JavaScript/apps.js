document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Close the menu if a link is clicked (on mobile)
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 600) {
        mainNav.classList.remove("open");
      }
    });
  });

  // --- 2. Floating Text Animation (for the Home Hero) ---
  // The animation itself is done in CSS, this JS is just for future control if needed.
  const floatingTexts = document.querySelectorAll(".floating-text");
  // We can add a class on load to trigger the animation
  floatingTexts.forEach((text) => {
    text.style.opacity = 1;
  });

  // --- 3. Shop Preview Slideshow ---
  const slideshow = document.getElementById("shop-slideshow");
  const shopImages = ["slideshow1.jpg", "slideshow2.jpg", "slideshow3.jpg"];
  let currentSlide = 0;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % shopImages.length;
    // Use a background image transition for the slide effect
    slideshow.style.backgroundImage = `url('${shopImages[currentSlide]}')`;
  }

  // Set the initial image
  slideshow.style.backgroundImage = `url('${shopImages[currentSlide]}')`;
  // Start the slideshow
  setInterval(nextSlide, 5000); // Change image every 5 seconds

  // --- 4. Blog Preview & Modal Logic (Static Placeholder Data) ---
  const blogData = [
    {
      title: "The Art of Bespoke Tailoring",
      author: "Edow Style Team",
      date: "Nov 15, 2025",
      snippet:
        "Discover the timeless process of custom garment creation, focusing on fit and fabric quality.",
      fullText:
        "At Edow, bespoke tailoring is a journey of collaboration. We start with a consultation, moving to precise measurements and selecting from our curated library of ethical fabrics. The result is a garment that is uniquely yours, embodying perfection in every stitch. This is more than just clothing; it’s an extension of your identity.",
    },
    {
      title: "Sustainable Fashion Trends for Winter '26",
      author: "Sarah J.",
      date: "Nov 1, 2025",
      snippet:
        "Exploring eco-friendly materials and ethical production methods driving the next season's styles.",
      fullText:
        "Sustainability is at the core of Edow's future. Our Winter '26 collection utilizes recycled wools and innovative plant-based fibers. We believe in transparency and traceable sourcing, ensuring that every purchase supports responsible environmental practices.",
    },
    {
      title: "How to Build a Capsule Wardrobe",
      author: "A. Designer",
      date: "Oct 25, 2025",
      snippet:
        "A guide to curating essential, versatile pieces that maximize your style with minimal effort.",
      fullText:
        "A capsule wardrobe saves time, space, and money. Focus on high-quality, neutral pieces—like a perfect pair of Edow trousers or a versatile navy blazer—that can be mixed and matched. Less is truly more when the pieces are built to last.",
    },
  ];

  const blogContainer = document.getElementById("blog-preview-container");
  const modal = document.getElementById("blogModal");
  const closeBtn = document.querySelector(".close-button");
  const modalTitle = document.getElementById("modal-title");
  const modalAuthor = document.getElementById("modal-author");
  const modalDate = document.getElementById("modal-date");
  const modalBody = document.getElementById("modal-body");

  // Populate Blog Previews
  blogData.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "blog-post-card";
    card.innerHTML = `
            <img src="blog${index + 1}.jpg" alt="${post.title}">
            <div class="blog-content">
                <h4>${post.title}</h4>
                <small>By ${post.author} | ${post.date}</small>
                <p>${post.snippet}</p>
            </div>
        `;

    // Modal Event Listener
    card.addEventListener("click", () => {
      modalTitle.textContent = post.title;
      modalAuthor.textContent = post.author;
      modalDate.textContent = post.date;
      modalBody.innerHTML = `<p>${post.fullText}</p>`;
      modal.style.display = "block";
    });

    blogContainer.appendChild(card);
  });

  // Close Modal Events
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // --- 5. Simple Contact Form Submission (Prevent default and show success) ---
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });

  // --- 6. Gallery Modal (for the small image preview section) ---
  // Note: The modal for the gallery is the same as the blog modal for simplicity
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const imgAlt = item.querySelector("img").alt;

      modalTitle.textContent = "Design Preview";
      modalAuthor.textContent = "Edow Collection";
      modalDate.textContent = "Current Line";
      modalBody.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}" style="width: 100%; display: block; margin: 10px 0;">`;
      document.querySelector(".read-more-modal").style.display = "none"; // Hide read more button
      modal.style.display = "block";
    });
  });
});
