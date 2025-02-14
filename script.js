const newtask = document.getElementById('putbox');
const submitbutton = document.getElementsByClassName('submitbutton')[0];
const activitylist = document.getElementById('activitylist');
const completedlist = document.getElementById('completedlist');

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

function moveToCompletedList(task) {
    completedlist.appendChild(task);
    task.removeEventListener('click', function() {
        moveToCompletedList(task);
    });
    task.addEventListener('click', function() {
        moveToToDoList(task);
    });
}

function moveToToDoList(task) {
    task.style.textDecoration = 'none';
    activitylist.appendChild(task);
    task.removeEventListener('click', function() {
        moveToToDoList(task);
    });
    task.addEventListener('click', function() {
        moveToCompletedList(task);
    });
}
