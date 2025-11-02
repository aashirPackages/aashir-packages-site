// Product Details Navigation Function
function goToDetails(title, img, desc, price) {
  const url = `product-details.html?title=${encodeURIComponent(title)}&img=${encodeURIComponent(img)}&desc=${encodeURIComponent(desc)}&price=${price}`;
  window.location.href = url;
}

// Product Details Page Loader
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on product details page
  if (window.location.pathname.includes("product-details.html")) {
    loadProductDetails();
  }
  
  // Initialize suggestion modal functionality
  initSuggestionModal();
  
  // Initialize custom box request buttons
  initCustomBoxRequests();
});

// Load product details from URL parameters
function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const img = params.get("img");
  const desc = params.get("desc");
  const price = parseFloat(params.get("price"));

  if (title && img && desc && price) {
    document.getElementById("productTitle").textContent = title;
    document.getElementById("productImage").src = img;
    document.getElementById("productImage").alt = title;
    document.getElementById("productDesc").textContent = desc;
    document.getElementById("formProductName").value = title;
    
    // Update page title
    document.title = `${title} - Aashir Packages`;
  } else {
    // Fallback to default product or show error
    console.error("Product details not found in URL parameters");
  }
}

// Quantity update function for product details
function changeQuantity(change) {
  const qtyInput = document.getElementById("quantity");
  let qty = parseInt(qtyInput.value) + change;
  if (qty < 1) qty = 1;
  qtyInput.value = qty;
  
  // Update total price if price is available
  const price = parseFloat(document.getElementById("detailPrice")?.textContent);
  if (price && !isNaN(price)) {
    document.getElementById("totalPrice").textContent = (price * qty).toFixed(2);
  }
}

// Suggestion Modal Functionality
function initSuggestionModal() {
  const modal = document.getElementById("ap-suggestion-modal");
  const suggestBtns = document.querySelectorAll("[data-action='suggest']");
  const closeBtn = document.querySelector(".ap-modal-close");
  const cancelBtn = document.getElementById("ap-cancel-btn");
  const form = document.getElementById("ap-suggestion-form");

  // Only initialize if modal exists on page
  if (!modal) return;

  suggestBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  });

  [closeBtn, cancelBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Restore scrolling
      });
    }
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });

  // Form submission
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      sendSuggestionEmail(this);
    });
  }
}

// Custom Box Request Buttons
function initCustomBoxRequests() {
  const sendWhatsapp = document.getElementById("sendWhatsapp");
  const sendSMS = document.getElementById("sendSMS");
  const sendEmail = document.getElementById("sendEmail");
  const suggestionForm = document.getElementById("suggestionForm");

  if (!suggestionForm) return;

  // WhatsApp button
  if (sendWhatsapp) {
    sendWhatsapp.addEventListener("click", function() {
      if (validateForm()) {
        sendViaWhatsApp();
      }
    });
  }

  // SMS button
  if (sendSMS) {
    sendSMS.addEventListener("click", function() {
      if (validateForm()) {
        sendViaSMS();
      }
    });
  }

  // Email button
  if (sendEmail) {
    sendEmail.addEventListener("click", function() {
      if (validateForm()) {
        sendViaEmail();
      }
    });
  }
}

// Form Validation
function validateForm() {
  const name = document.getElementById("name")?.value.trim();
  const contact = document.getElementById("contact")?.value.trim();
  const details = document.getElementById("details")?.value.trim();
  const quantity = document.getElementById("quantity")?.value.trim();

  if (!name || !contact || !details || !quantity) {
    alert("Please fill in all required fields!");
    return false;
  }

  // Basic email/phone validation
  if (!isValidContact(contact)) {
    alert("Please enter a valid email address or phone number!");
    return false;
  }

  return true;
}

// Contact validation (basic)
function isValidContact(contact) {
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Simple phone validation (adjust based on your needs)
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  
  return emailRegex.test(contact) || phoneRegex.test(contact);
}

// Send via WhatsApp
function sendViaWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const details = document.getElementById("details").value.trim();
  const quantity = document.getElementById("quantity").value.trim();

  const whatsappNumber = "923000202001";
  const message = `🆕 *Custom Box Request - Aashir Packages* 🎁

*Name:* ${name}
*Contact:* ${contact}
*Box Details:* ${details}
*Quantity:* ${quantity}

We'll get back to you shortly! 📦`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  
  showSuccessMessage("WhatsApp message prepared! Please send it to complete your request.");
}

// Send via SMS
function sendViaSMS() {
  const name = document.getElementById("name").value.trim();
  const details = document.getElementById("details").value.trim();
  const quantity = document.getElementById("quantity").value.trim();

  const message = `Custom Box Request: ${name} - ${details} - Quantity: ${quantity}`;
  const encodedMessage = encodeURIComponent(message);
  
  // For SMS, we use the tel: protocol
  window.location.href = `sms:+923000202001?body=${encodedMessage}`;
  
  showSuccessMessage("SMS message prepared! Please send it to complete your request.");
}

// Send via Email
function sendViaEmail() {
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const details = document.getElementById("details").value.trim();
  const quantity = document.getElementById("quantity").value.trim();

  const subject = "New Custom Box Suggestion - Aashir Packages";
  const body = `Dear Aashir Packages,

I would like to request a custom box with the following details:

Name: ${name}
Contact: ${contact}
Box Details: ${details}
Quantity: ${quantity}

Please contact me to discuss further details.

Thank you!`;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  window.location.href = `mailto:aashirpackages@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  
  showSuccessMessage("Email client opened! Please send the email to complete your request.");
}

// Send suggestion via email (for modal form)
function sendSuggestionEmail(form) {
  const name = form.name.value.trim();
  const contact = form.contact.value.trim();
  const details = form.details.value.trim();
  const quantity = form.quantity.value.trim();

  if (!name || !contact || !details || !quantity) {
    alert("Please fill in all required fields!");
    return;
  }

  const subject = "New Custom Box Suggestion - Aashir Packages";
  const body = `New Custom Box Suggestion:

Name: ${name}
Contact: ${contact}
Box Details: ${details}
Quantity: ${quantity}

We'll review your request and get back to you soon!`;

  const mailtoURL = `mailto:aashirpackages@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoURL;

  // Reset form and close modal
  form.reset();
  const modal = document.getElementById("ap-suggestion-modal");
  if (modal) {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  
  showSuccessMessage("Email client opened! Please send the email to submit your suggestion.");
}

// Show success message
function showSuccessMessage(message) {
  // Create or update success message element
  let successElement = document.getElementById("successMessage");
  if (!successElement) {
    successElement = document.createElement("div");
    successElement.id = "successMessage";
    successElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #27ae60;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      max-width: 300px;
      font-weight: 500;
    `;
    document.body.appendChild(successElement);
  }
  
  successElement.textContent = message;
  successElement.style.display = "block";
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    successElement.style.display = "none";
  }, 5000);
}

// Product inquiry function (for product details modal)
function inquireAboutProduct(productName) {
  const message = `I'm interested in ${productName}. Please provide more details about pricing, sizes, and customization options.`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/923000202001?text=${encodedMessage}`, "_blank");
}

// Mobile menu functionality (if not already in HTML)
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Image lazy loading enhancement
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Form reset functionality
function resetForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "none";
    }
  }
}

// Export functions for global access (if needed)
window.goToDetails = goToDetails;
window.changeQuantity = changeQuantity;
window.inquireAboutProduct = inquireAboutProduct;
window.resetForm = resetForm;
