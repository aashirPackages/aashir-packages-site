// Function to send product data via URL
function goToDetails(title, img, desc, price) {
  const url = `product-details.html?title=${encodeURIComponent(title)}&img=${encodeURIComponent(img)}&desc=${encodeURIComponent(desc)}&price=${price}`;
  window.location.href = url;
}

// On product-details.html, load product info
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes("product-details.html")) {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const img = params.get("img");
    const desc = params.get("desc");
    const price = parseFloat(params.get("price"));

    if (title && img && desc && price) {
      document.getElementById("detailTitle").textContent = title;
      document.getElementById("detailImg").src = img;
      document.getElementById("detailDesc").textContent = desc;
      document.getElementById("detailPrice").textContent = price;
      document.getElementById("totalPrice").textContent = price;
    }

    // Quantity update function
    window.changeQuantity = function(change) {
      const qtyInput = document.getElementById("quantity");
      let qty = parseInt(qtyInput.value) + change;
      if (qty < 1) qty = 1;
      qtyInput.value = qty;
      document.getElementById("totalPrice").textContent = (price * qty).toFixed(2);
    };
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("ap-suggestion-modal");
  const suggestBtns = document.querySelectorAll("[data-action='suggest']");
  const closeBtn = document.querySelector(".ap-modal-close");
  const cancelBtn = document.getElementById("ap-cancel-btn");
  const form = document.getElementById("ap-suggestion-form");

  suggestBtns.forEach(btn => btn.addEventListener("click", () => modal.setAttribute("aria-hidden", "false")));
  [closeBtn, cancelBtn].forEach(btn => btn.addEventListener("click", () => modal.setAttribute("aria-hidden", "true")));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value;
    const contact = form.contact.value;
    const details = form.details.value;
    const quantity = form.quantity.value;

   // ✅ Send via Email (opens default email app)
const email = "aashirpackages@gmail.com"; // your email address
const subject = "New Custom Box Suggestion";
const body = `New Custom Box Suggestion:

Name: ${name}
Contact: ${contact}
Box Details: ${details}
Quantity: ${quantity}`;

const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
window.location.href = mailtoURL;


    window.open(waURL, "_blank");
    form.reset();
    modal.setAttribute("aria-hidden", "true");
  });
});



document.getElementById("sendWhatsapp").addEventListener("click", function() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const details = document.getElementById("details").value;
  const quantity = document.getElementById("quantity").value;

  const whatsappNumber = "923000202001"; // Replace with your WhatsApp number
  const msg = `New Custom Box Suggestion:%0A%0AName: ${name}%0AContact: ${contact}%0ABox Details: ${details}%0AQuantity: ${quantity}`;
  window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
});

document.getElementById("sendSMS").addEventListener("click", function() {
  const details = document.getElementById("details").value;
  const quantity = document.getElementById("quantity").value;
  const msg = encodeURIComponent(`Box Request:\n${details}\nQuantity: ${quantity}`);
  window.open(`sms:03000202001?body=${msg}`);
});

document.getElementById("sendEmail").addEventListener("click", function() {
  const name = document.getElementById("name").value;
  const details = document.getElementById("details").value;
  const quantity = document.getElementById("quantity").value;

  const subject = encodeURIComponent("New Custom Box Suggestion");
  const body = encodeURIComponent(`Name: ${name}\nDetails: ${details}\nQuantity: ${quantity}`);
  window.location.href = `mailto:aashirpackages@gmail.com?subject=${subject}&body=${body}`;
});
