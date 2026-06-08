document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const checkoutBtn = document.getElementById("checkout-btn");
  const totalPrice = document.getElementById("total-price");
  const cartTotal = document.getElementById("cart-total");
  const emptyCart = document.getElementById("empty-cart");
  const cartItems = document.getElementById("cart-items");

  const products = [];

  products.push({
    name: "Product 1",
    id: 1,
    price: 10,
  });

  products.push({
    name: "Product 2",
    id: 2,
    price: 20,
  });

  products.push({
    name: "Product 3",
    id: 3,
    price: 50,
  });

  renderProductList(products);

  function renderProductList(products) {
    products.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `<span> ${item.name} </span> <span>$${item.price}</span> <button id="${item.id}"> Add </button>`;
      productList.appendChild(div);
    });
  }

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // const div = e.target.closest("div")

      const id = parseInt(e.target.getAttribute("id"));
      products.forEach((item) => {
        if (item.id == id) renderCartItems(item);
      });
    }
  });

  cartItems.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const div = e.target.closest("div");
      div.remove();
      totalCartPrice();
      // if (cartItems.textContent.trim() == "") {
      //   emptyCart.classList.remove("hidden");
      // }
      //doesnt work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // because cartItem has 1 element <p> empty-cart so children are always +1

      if (cartItems.children.length === 1) {
        emptyCart.classList.remove("hidden");
      }
    }
  });

  function renderCartItems(item) {
    emptyCart.classList.add("hidden");
    cartTotal.classList.remove("hidden");

    const div = document.createElement("div");
    div.innerHTML = `<span> ${item.name} </span> <span class="price">${item.price}</span> <button id=${item.id}>Remove</button>`;
    div.classList.add("cartItem");
    cartItems.appendChild(div);
    totalCartPrice();
  }

  // instead of looping through the DOM and calculating price make Array of CartList this will also make sure that multiple cart items dont appear multiple times in dom
  function totalCartPrice() {
    let sum = 0;
    const spans = cartItems.querySelectorAll("span.price");

    spans.forEach((element) => {
      sum += parseInt(element.textContent);
    });

    totalPrice.innerHTML = `$ ${sum}`;
  }
});
