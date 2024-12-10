document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Load tasks from local storage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      taskList.innerHTML = ""; // Clear the list
      tasks.forEach((task, index) => addTaskToDOM(task, index));
    };
  
    const saveTasks = (tasks) => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const getTasks = () => {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    };
  
    const addTaskToDOM = (task, index) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
        <span>${task.description}</span>
        <div>
          <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
          <button class="edit" data-index="${index}">Edit</button>
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    };
  
    const addTask = () => {
      const description = taskInput.value.trim();
      if (!description) {
        alert("Task cannot be empty.");
        return;
      }
      const tasks = getTasks();
      tasks.push({ description, completed: false });
      saveTasks(tasks);
      loadTasks();
      taskInput.value = "";
    };
  
    const updateTask = (index, description) => {
      const tasks = getTasks();
      tasks[index].description = description;
      saveTasks(tasks);
      loadTasks();
    };
  
    const deleteTask = (index) => {
      const tasks = getTasks();
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    };
  
    const toggleTaskCompletion = (index) => {
      const tasks = getTasks();
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      loadTasks();
    };
  
    taskList.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (e.target.classList.contains("edit")) {
        const newDescription = prompt("Edit Task:", getTasks()[index].description);
        if (newDescription) updateTask(index, newDescription);
      } else if (e.target.classList.contains("delete")) {
        deleteTask(index);
      } else if (e.target.type === "checkbox") {
        toggleTaskCompletion(index);
      }
    });
  
    addTaskBtn.addEventListener("click", addTask);
    loadTasks();
  });
  