const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const feedback = document.getElementById("feedback");
const taskList = document.getElementById("taskList");
const priorityInput = document.getElementById("priorityInput");
const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");

let tasks = load();

function save() {
    const json = JSON.stringify(tasks);

    localStorage.setItem("tasks", json);
}

function load() {
    const raw = localStorage.getItem("tasks");

    return JSON.parse(raw) || [];
}

function addTask() {
    const text = taskInput.value.trim();

    if(text==="") {
        feedback.textContent = "Please enter a task.";
        return;
    }

    feedback.textContent = "";
    const task= {
        id: Date.now(),
        title: text,
        completed: false,
        priority: priorityInput.value
    };

    tasks.push(task);
    save();
    taskInput.value = "";
    displayTask(task);

}

function displayTask(task) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskText = document.createElement("span");
    taskText.textContent = task.title;

    const priorityText = document.createElement("span");

    if (task.priority) {
        priorityText.textContent = task.priority;
        priorityText.classList.add("priority");
        priorityText.classList.add(task.priority);
    }

    checkbox.addEventListener("change", function() {
        task.completed = checkbox.checked;

        if (task.completed) {

            taskText.style.textDecoration = "line-through";

        } else {

            taskText.style.textDecoration = "none";

        }

        save();

    });

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "x";

    deleteButton.addEventListener("click", function() {

        tasks = tasks.filter(function(t) {

            return t.id !== task.id;

        });

        save();

        li.remove();

    });

    li.append(checkbox);
    li.append(taskText);
    if (task.priority) {
        li.append(priorityText);
    }    
    li.append(deleteButton);

    taskList.append(li);

    if (task.completed) {

        checkbox.checked = true;

        taskText.style.textDecoration = "line-through";

    }

}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});
tasks.forEach(function(task) {

    displayTask(task);

});

function filterTasks(filter) {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        if (filter === "all") {
            displayTask(task);
        }

        if (filter === "active" && !task.completed) {
            displayTask(task);
        }

        if (filter === "completed" && task.completed) {
            displayTask(task);
        }

    });
}

allButton.addEventListener("click", function() {
    filterTasks("all");
});

activeButton.addEventListener("click", function() {
    filterTasks("active");
});

completedButton.addEventListener("click", function() {
    filterTasks("completed");
});