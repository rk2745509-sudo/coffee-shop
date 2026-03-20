const products = [
  {
    name: "Espresso",
    price: 120,
    image: "https://tse1.mm.bing.net/th/id/OIP.BgzjKx_Eq0O9KFew956vuAHaHa?w=500&h=500&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    name: "Cappuccino",
    price: 150,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  },
  {
    name: "Latte",
    price: 180,
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589"
  },
  {
    name: "Mocha",
    price: 200,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772"
  }
];

// ✅ LOAD SAVED CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load on page start
window.onload = function () {
  loadProducts();
  updateCart();
};

// Load products
function loadProducts() {
  const productDiv = document.getElementById("products");
  productDiv.innerHTML = "";

  products.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image}" class="product-img">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${i})">Add</button>
    `;

    productDiv.appendChild(div);
  });
}

// Add to cart
function addToCart(i) {
  cart.push(products[i]);
  updateCart();
}

// Update + Save cart
function updateCart() {
  const cartDiv = document.getElementById("cart");
  const totalDiv = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeItem(${index})">❌</button>
    `;

    cartDiv.appendChild(li);
    total += item.price;
  });

  totalDiv.textContent = "Total: ₹" + total;
  cartCount.textContent = "🛒 " + cart.length;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// ✅ Place order (modal)
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let content = "<h3>☕ Order Placed!</h3>";
  let total = 0;

  cart.forEach(item => {
    content += `<p>${item.name} - ₹${item.price}</p>`;
    total += item.price;
  });

  content += `<h4>Total: ₹${total}</h4>`;

  document.getElementById("modal-body").innerHTML = content;
  document.getElementById("orderModal").style.display = "block";

  // ✅ clear AFTER showing modal
  cart = [];
  localStorage.removeItem("cart");
  updateCart();
}

// Close modal
function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

// Click outside to close
window.onclick = function(event) {
  const modal = document.getElementById("orderModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
