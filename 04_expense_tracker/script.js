document.addEventListener("DOMContentLoaded", (e) => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseListDisplay = document.getElementById("expense-list");

  let expenseList = JSON.parse(localStorage.getItem("expenses")) || [];

  function Expense(amount, name) {
    ((this.amount = amount), (this.name = name), (this.id = Date.now()));
  }

  expenseForm.addEventListener("submit", () => {
    const amount = parseFloat(expenseAmount.value);
    const name = expenseName.value.trim();

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const expense = new Expense(amount, name);
      expenseList.push(expense);

      expenseAmount.value = "";
      expenseName.value = "";
      
      renderExpenses();
      saveExpenses();
      totalPrice();
    }
  });

  function renderExpenses() {
    expenseListDisplay.innerHTML = "";

    expenseList.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${expense.name} </span> <span class="price"> ${expense.amount}</span> <button data-id=${expense.id}>delete</button>`;
      expenseListDisplay.appendChild(li);
    });
  }

  function totalPrice() {}

  function deleteExpense() {}

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }
});
