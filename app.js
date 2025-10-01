let task = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        task = storedTasks;
        updateTaskList();
        updatestats();
    }
});

// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(task));
};

// Add new task
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updatestats();
        saveTasks();
    }
};

// Toggle completed status
const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTaskList();
    updatestats();
    saveTasks();
};

// Delete task
const deleteTask = (index) => {
    task.splice(index, 1);
    updateTaskList();
    updatestats();
    saveTasks();
};

// Edit task
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = task[index].text;
    task.splice(index, 1);
    updateTaskList();
    updatestats();
    saveTasks();
};

// Update stats and progress
const updatestats = () => {
    const completedTasks = task.filter(t => t.completed).length;
    const totalTasks = task.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    // Show percentage inside progress bar
    document.getElementById("progressPercent").innerText = `${Math.round(progress)}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if (task.length && completedTasks === totalTasks) {
        blastconfetti();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    task.forEach((t, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${t.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${t.completed ? "checked" : ""}/> 
                    <p>${t.text}</p>
                </div>
                <div class="icons">
    <div class="icon-wrapper">
        <span class="edit-icon" style="cursor:pointer; font-size:20px;">✏️</span>
        <div class="icon-label">Edit</div>
    </div>
    <div class="icon-wrapper">
        <span class="delete-icon" style="cursor:pointer; font-size:20px;">🗑️</span>
        <div class="icon-label">Delete</div>
    </div>
</div>

            </div>
        `;

        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        listItem.querySelector(".edit-icon").addEventListener("click", () => editTask(index));
        listItem.querySelector(".delete-icon").addEventListener("click", () => deleteTask(index));

        taskList.append(listItem);
    });
};

// Add task via button
document.getElementById("newTask").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

// Add task via Enter key
document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

// Confetti (simple console version, can replace with real confetti lib)
const blastconfetti = () => {
    confetti({
  particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
});
};
