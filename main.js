const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const listContainer = document.querySelector("#listContainer");

addBtn.addEventListener("click", addTask);

function addTask(event) {
    event.preventDefault();
    if (inputBox.value === '') {
        alert("Please write a task!");
    } else {
        createTaskElement(inputBox.value, false);
        saveData();
        inputBox.value = '';
    }
}

function createTaskElement(taskText, isChecked) {
    // Create the main <li> element
    const li = document.createElement("li");
    li.classList.add("flex", "flex-row", "items-center", "justify-between", "gap-2", "w-full", "px-4", "py-2", "border-b");

    // Create the <input> checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.classList.add("mr-2"); // Adds some space to the right of the checkbox
    checkbox.addEventListener("click", () => {
        h4.classList.toggle("line-through");
        saveData();
    });

    // Create the <h4> element
    const h4 = document.createElement("h4");
    h4.textContent = taskText;
    h4.classList.add("flex-grow", "text-left"); // Makes it flexible and aligns text left
    if (isChecked) {
        h4.classList.add("line-through");
    }

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("text-white", "font-semibold", "border", "border-orange-500", "bg-orange-500", "rounded-full", "px-2", "w-8", "h-8", "flex", "items-center", "justify-center");
    deleteButton.addEventListener("click", () => {
        listContainer.removeChild(li);
        saveData();
    });

    // Append elements
    const span = document.createElement("span");
    span.appendChild(deleteButton);
    li.appendChild(checkbox);
    li.appendChild(h4);
    li.appendChild(span);
    listContainer.appendChild(li);
}

function saveData() {
    const tasks = Array.from(listContainer.children).map((li) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        const h4 = li.querySelector("h4");
        return { text: h4.textContent, completed: checkbox.checked };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach((task) => createTaskElement(task.text, task.completed));
}

showTask();
