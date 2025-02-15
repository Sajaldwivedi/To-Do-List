const newtask = document.getElementById('putbox');
const submitbutton = document.getElementsByClassName('submitbutton')[0];
const markAllCompleted = document.getElementById('markAllCompleted');
const activitylist = document.getElementById('activitylist');
const completedlist = document.getElementById('completedlist');

// Add a single task
submitbutton.addEventListener('click', function() {
    if (newtask.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = newtask.value;
        li.addEventListener('click', function() {
            moveToCompletedList(li);
        });
        activitylist.appendChild(li);
        newtask.value = "";
    }
});

// Move a single task to completed
function moveToCompletedList(task) {
    completedlist.appendChild(task);
    task.style.textDecoration = "line-through";
    task.style.color = "#4a4a4a";
    task.style.fontStyle = "italic";
    task.removeEventListener('click', function() {
        moveToCompletedList(task);
    });
    task.addEventListener('click', function() {
        moveToToDoList(task);
    });
}

// Move a single task back to To-Do
function moveToToDoList(task) {
    activitylist.appendChild(task);
    task.style.textDecoration = "none";
    task.style.color = "#333";
    task.style.fontStyle = "normal";
}

// Move all tasks to completed
markAllCompleted.addEventListener('click', function() {
    while (activitylist.firstChild) {
        let task = activitylist.firstChild;
        moveToCompletedList(task);
    }
});
