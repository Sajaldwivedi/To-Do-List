const newtask = document.getElementById('putbox');
const submitbutton = document.getElementsByClassName('submitbutton')[0];
const activitylist = document.getElementById('activitylist');
const completedlist = document.getElementById('completedlist');

submitbutton.addEventListener('click', function () {
    if (newtask.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = newtask.value;
        li.addEventListener('click', toggleTaskStatus);
        activitylist.appendChild(li);
        newtask.value = "";
    }
});

function toggleTaskStatus(event) {
    let task = event.target;
    
    if (task.parentElement === activitylist) {
        // Move to Completed List
        completedlist.appendChild(task);
        task.style.textDecoration = "line-through";
        task.style.color = "#4a4a4a";
        task.style.fontStyle = "italic";
    } else {
        // Move back to To-Do List
        activitylist.appendChild(task);
        task.style.textDecoration = "none";
        task.style.color = "#333";
        task.style.fontStyle = "normal";
    }
}
