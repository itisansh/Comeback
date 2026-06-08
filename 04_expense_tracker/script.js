document.addEventListener("DOMContentLoaded", (e) => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseListDisplay = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");

  let expenseList = JSON.parse(localStorage.getItem("expenses")) || [];
  renderExpenses();

  //in object constructor dont use , to separte properties use ;
  function Expense(amount, name) {
    this.amount = amount;
    this.name = name;
    this.id = Date.now();
  }

  expenseForm.addEventListener("submit", (e) => {
    //MOST IMPORTANT IN FORM PREVENT DEFAULT BEHAVIOUR OF REFRESHING
    e.preventDefault();
    const amount = parseFloat(expenseAmount.value);
    const name = expenseName.value.trim();

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const expense = new Expense(amount, name);

      expenseList.push(expense);

      expenseAmount.value = "";
      expenseName.value = "";

      renderExpenses();
      saveExpenses();
    }
  });

  function renderExpenses() {
    expenseListDisplay.innerHTML = "";

    expenseList.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${expense.name} </span> <span class="price"> $${expense.amount}</span> <button data-id=${expense.id}>delete</button>`;
      expenseListDisplay.appendChild(li);
    });
    totalPriceDisplay();
  }

  expenseListDisplay.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.getAttribute("data-id"));
      expenseList = expenseList.filter((expense) => expense.id !== id);

      const li = e.target.closest("li");
      li.remove();
      saveExpenses();
      totalPriceDisplay();
    }
  });

  function totalPriceDisplay() {
    const totalPrice = calculateTotalPrice();
    totalAmount.textContent = totalPrice;
  }

  function calculateTotalPrice() {
    return expenseList.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
  }

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }
});
