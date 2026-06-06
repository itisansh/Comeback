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
    id: Date.now(),
    price: "10$",
  });

  products.push({
    name: "Product 2",
    id: Date.now(),
    price: "20$",
  });

  products.push({
    name: "Product 3",
    id: Date.now(),
    price: "50$",
  });

  renderProductList(products);

  function renderProductList(products) {
    products.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `<span> ${item.name} </span> <span>${item.price}</span> <button id="${item.id}"> Add </button>`;
      productList.appendChild(div);
    });
  }

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // const div = e.target.closest("div");

      const id = parseInt(e.target.getAttribute("id"));
      products.forEach((item) => {
        if (item.id == id) renderCartItems(item);
      });
    }
  });

  function renderCartItems(item) {
    emptyCart.classList.add("hidden");

    const div = document.createElement("div");
    div.innerHTML = `<span> ${item.name} </span> <span>${item.price}</span>`;
    cartItems.appendChild(div);
  }
});
