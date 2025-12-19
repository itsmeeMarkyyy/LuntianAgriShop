const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  })
}
if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  })
}
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();

    let product = {
      name: this.dataset.name,
      price: parseFloat(this.dataset.price),
      img: this.dataset.img,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to cart page

  });
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  let cartItemsDiv = document.getElementById("cart-items");
  let totalDiv = document.getElementById("cart-total");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name}</span>
          <span>₱${item.price}</span>
          <label>Qty:</label>
          <input type="number" min="1" value="${item.quantity}" 
                 onchange="updateQuantity(${index}, this.value)">
        </div>
        <span class="remove-btn" onclick="removeItem(${index})">Remove</span>
      </div>
    `;
  });

  totalDiv.innerText = "Total: ₱" + total;
}

function updateQuantity(index, newQty) {
  newQty = parseInt(newQty);
  if (newQty > 0) {
    cart[index].quantity = newQty;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// Run on page load
updateCartDisplay();
function addItem(el) {
  const name = el.dataset.name;
  const price = Number(el.dataset.price);
  const img = el.dataset.img;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const idx = cart.findIndex(p => p.name === name);
  if (idx > -1) {
    cart[idx].qty += 1;   // increase quantity if already in cart
  } else {
    cart.push({ name, price, img, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}
function handleBuyNow(el) {
  addItem(el);                 // add or increment quantity
  window.location.href = 'cart.html'; // then go to cart page
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.buy-now').forEach(btn => {
    btn.addEventListener('click', () => handleBuyNow(btn));
  });
});
function handleBuyNow(el) {
  addItem(el);                 // add or increment quantity
  window.location.href = 'cart.html'; // then go to cart page
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.buy-now').forEach(btn => {
    btn.addEventListener('click', () => handleBuyNow(btn));
  });
});
