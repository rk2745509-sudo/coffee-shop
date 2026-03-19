const products = [
  { name: "Product 1", price: 500 },
  { name: "Product 2", price: 700 },
  { name: "Product 3", price: 900 }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");

let cart = [];

products.forEach((p, index) => {
  let div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${index})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
    cartItems.appendChild(li);
  });

  cartCount.textContent = "🛒 " + cart.length;
}