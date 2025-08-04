const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const checkedCountSpan = document.getElementById("checkedCount");
const uncheckedCountSpan = document.getElementById("uncheckedCount");
const clearAllBtn = document.getElementById("clearAllBtn");

function updateCounts() {
  const items = taskList.getElementsByClassName("task-item");
  let checked = 0, unchecked = 0;
  for (let item of items) {
    if (item.classList.contains("done")) {
      checked++;
    } else {
      unchecked++;
    }
  }
  checkedCountSpan.textContent = checked;
  uncheckedCountSpan.textContent = unchecked;
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = taskText;

  // Done button
  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.title = "Mark as done";

  doneButton.addEventListener("click", function () {
    li.classList.toggle("done");
    updateCounts();
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.title = "Delete task";
  deleteButton.style.backgroundColor = "#cc2244";

  deleteButton.addEventListener("click", function () {
    li.remove();
    updateCounts();
  });

  li.appendChild(span);
  li.appendChild(doneButton);
  li.appendChild(deleteButton);

  return li;
}

function addTask(taskText) {
  if (taskText.trim() === "") return;

  const taskElement = createTaskElement(taskText);
  taskList.appendChild(taskElement);
  taskInput.value = "";
  updateCounts();
}

addButton.addEventListener("click", function () {
  addTask(taskInput.value);
});

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask(taskInput.value);
  }
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    taskList.innerHTML = "";
    updateCounts();
  }
});
