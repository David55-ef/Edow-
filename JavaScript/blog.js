document.addEventListener("DOMContentLoaded", () => {
  // Reusing the blogData structure defined in index.html for consistency
  const blogData = [
    {
      id: 1,
      title: "The Art of Bespoke Tailoring: A Timeless Craft",
      author: "Edow Style Team",
      date: "Nov 15, 2025",
      img: "blog_post_1_large.jpg",
      content:
        "Bespoke tailoring is the pinnacle of personalized fashion. At Edow, it involves a meticulous 12-step process, starting with a design consultation and leading to multiple fittings. We focus on enhancing the wearer's unique physique and ensuring the garment reflects their personal style philosophy. This craft preserves heritage while utilizing modern, ethical fabrics. The final result is a garment that lasts generations, not just seasons.",
    },
    {
      id: 2,
      title: "Sustainable Fabrics: Edow's Commitment to the Planet",
      author: "Sarah J.",
      date: "Nov 1, 2025",
      img: "blog_post_2_large.jpg",
      content:
        "As the fashion industry evolves, our commitment to sustainability deepens. We source organic cotton, recycled polyester, and innovative plant-based textiles like Tencel and Pinatex. Our production processes minimize water usage and chemical waste, ensuring that our beautiful designs come with a clear conscience. We detail our progress in our annual sustainability report.",
    },
    {
      id: 3,
      title: "A Guide to Building a Versatile Capsule Wardrobe",
      author: "A. Designer",
      date: "Oct 25, 2025",
      img: "blog_post_3_large.jpg",
      content:
        "A capsule wardrobe is a curated collection of essential pieces that never go out of style. Start with 10 core items: a classic blazer, tailored trousers, two perfect shirts, and essential footwear. The key is quality over quantity, investing in pieces from brands like Edow that offer superior construction and fit. This simplifies dressing and ensures you always look effortlessly chic.",
    },
    // Add more blog posts here following the same structure
  ];

  const blogContainer = document.getElementById("blog-posts-container");

  const renderBlogPosts = () => {
    blogContainer.innerHTML = "";

    blogData.forEach((post) => {
      const card = document.createElement("div");
      card.className = "full-blog-card";

      // Note: Since this is a simple HTML/CSS/JS site without real routing,
      // the Read More link will currently just link to the main blog page.
      // In a real application, it would link to a dedicated post page (e.g., blog.html?id=1)

      card.innerHTML = `
                <img src="${post.img}" alt="${post.title}">
                <div class="blog-card-content">
                    <h3>${post.title}</h3>
                    <p class="blog-meta">By <span>${
                      post.author
                    }</span> | Posted on <span>${post.date}</span></p>
                    <p>${post.content.substring(0, 150)}...</p>
                    <a href="#" class="read-more-link" data-id="${
                      post.id
                    }">Read Full Story &rarr;</a>
                </div>
            `;

      blogContainer.appendChild(card);
    });

    // Add alert/modal for 'Read More' links since we don't have separate post pages
    document.querySelectorAll(".read-more-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const postId = parseInt(e.target.dataset.id);
        const post = blogData.find((p) => p.id === postId);
        alert(
          `--- ${post.title} ---\n\n${post.content}\n\n(Note: This content would be on a dedicated single-post page in a full website.)`
        );
      });
    });
  };

  // Initial load
  renderBlogPosts();
});
