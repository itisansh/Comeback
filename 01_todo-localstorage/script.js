document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => render(task));

  addTaskBtn.addEventListener("click", (e) => {
    const text = todoInput.value.trim();
    if (text === "") return;

    let task = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    tasks.push(task);
    todoInput.value = "";
    render(task);
    save(tasks);
  });

  function render(task) {
    const li = document.createElement("li");
    li.setAttribute("id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `<span> ${task.text} </span> <button>delete</button>`;
    todoList.appendChild(li);

    li.addEventListener("click", (e) => {
      if (e.target.tagName == "BUTTON") return deleteTask(task);
      task.completed = !task.completed;
      li.classList.toggle("completed");
      save(tasks);
    });
  }

  function deleteTask(task) {
    tasks = tasks.filter((t) => t.id !== task.id);
    const li = document.getElementById(task.id); // type conversion here converts task.id into String if u do "task.id" it searches for id="task.id" instead of id="22332423"
    li.remove();
    save(tasks);
  }

  function save(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
