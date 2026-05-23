const input = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

render(Tasks);

function Task(text) {
  this.id = Date.now();
  this.text = text;
  this.completed = false;
}

addTaskBtn.addEventListener("click", (e) => {
  let text = input.value.trim();
  if (text) {
    let task = new Task(text);
    input.value = "";

    Tasks.push(task);
    const li = document.createElement("li");
    li.id = task.id;
    li.innerHTML = `<span> ${task.text} </span> <button> delete </button>`;
    todoList.append(li);
    console.log(todoList);

    save(Tasks);
  }
});

todoList.addEventListener("click", (e) => {
  e.stopPropagation();
  let li = e.target.parentElement;
  const listItem = e.target.closest("li");
  if (e.target.tagName === "BUTTON") {
    li.remove();
    Tasks = Tasks.filter((t) => t.id != li.id);
    save(Tasks);
  } else {
    listItem.classList.toggle("completed");
    Tasks.forEach((task) => {
      if (task.id == listItem.id) {
        task.completed = !task.completed;
      }
    });
    // } else {
    // if (e.target.tagName == "LI") {
    //   e.target.classList.toggle("completed");
    //   Tasks.forEach((task) => {
    //     if (task.id == e.target.id) {
    //       task.completed = !task.completed;
    //     }
    //   });
    // } else if (li.tagName == "LI") {
    //   li.classList.toggle("completed");
    //   Tasks.forEach((task) => {
    //     if (task.id == li.id) {
    //       task.completed = !task.completed;
    //     }
    //   });
    // }
    save(Tasks);
  }
});

function save(Tasks) {
  localStorage.setItem("Tasks", JSON.stringify(Tasks));
}

function render(Tasks) {
  Tasks.forEach((task) => {
    const li = document.createElement("li");
    li.id = task.id;
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `<span> ${task.text} </span> <button> delete </button>`;
    todoList.append(li);
  });
}
