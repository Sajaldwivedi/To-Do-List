const newtask = document.getElementById('putbox');
const submitbutton = document.querySelector('.submitbutton');
const activitylist = document.getElementById('activitylist');
const completedlist = document.getElementById('completedlist');
const themeToggle = document.getElementById("themeToggle");

function addTask() {
    if (newtask.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = newtask.value;
        li.addEventListener('click', toggleTaskStatus);
        activitylist.appendChild(li);
        newtask.value = "";
    }
}

submitbutton.addEventListener('click', addTask);

newtask.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function toggleTaskStatus(event) {
    let task = event.target;
    if (task.parentElement === activitylist) {
        completedlist.appendChild(task);
        task.style.textDecoration = "line-through";
        task.style.color = "#4a4a4a";
        task.style.fontStyle = "italic";
    } else {
        activitylist.appendChild(task);
        task.style.textDecoration = "none";
        task.style.color = "#333";
        task.style.fontStyle = "normal";
    }
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});
