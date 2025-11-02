
// script.js

// Scroll to Products Section
function showProducts() {
  const productsSection = document.querySelector(".products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Confirmation before sending the order
document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.querySelector(".contact-form");

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      const confirmSend = confirm("Are you sure you want to send this order?");
      if (!confirmSend) {
        e.preventDefault(); // Stop form if user cancels
      } else {
        alert("Thank you! Your order request has been sent.");
      }
    });
  }
});

// Scroll to Contact Section
function goToContact() {
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Add event listeners for footer quick links (if same-page sections)
document.addEventListener("DOMContentLoaded", () => {
  const footerLinks = document.querySelectorAll(".footer-links a");

  footerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href");

      if (target === "#contact") {
        e.preventDefault();
        goToContact();
      } else if (target === "#products") {
        e.preventDefault();
        showProducts();
      }
    });
  });
});


// ---------- mobile nav toggle ----------
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    document.body.classList.toggle('nav-open');
  });

  // close nav when clicking outside menu
  document.addEventListener('click', function (e) {
    if (!document.body.classList.contains('nav-open')) return;
    const nav = document.querySelector('.site-nav');
    if (!nav.contains(e.target)) document.body.classList.remove('nav-open');
  });

  // close with Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.body.classList.remove('nav-open');
  });
});

