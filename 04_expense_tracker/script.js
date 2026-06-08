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
    //MOST IMPORTANT, PREVENT DEFAULT BEHAVIOUR OF FORM FROM REFRESHING THE PAGE AFTER SUBMITTION
    e.preventDefault();
    const amount = parseFloat(expenseAmount.value);
    const name = expenseName.value.trim();

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const expense = new Expense(amount, name);

      if (!checkDuplicate(expense)) {
        expenseList.push(expense);

        renderExpenses();
        saveExpenses();
      }
      expenseAmount.value = "";
      expenseName.value = "";
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
    totalAmount.textContent = totalPrice.toFixed(2);
  }

  function calculateTotalPrice() {
    return expenseList.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // we can use .some method too
  function checkDuplicate(expense) {
    let count = 0;
    expenseList.forEach((element) => {
      if (element.amount == expense.amount && element.name == expense.name)
        alert("duplicate found");
      count = 1;
    });
    if (count === 1) return true;
    else return false;
  }

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }
});
