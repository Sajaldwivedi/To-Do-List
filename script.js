const newtask = document.getElementById('putbox');
const submitbutton = document.getElementsByClassName('submitbutton')[0];
const activitylist = document.getElementById('activitylist');

submitbutton.addEventListener('click', function() {
    if (newtask.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = newtask.value;
        activitylist.appendChild(li);
        newtask.value = "";
    }
});
