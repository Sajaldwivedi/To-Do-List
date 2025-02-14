const newtask = document.getElementById('putbox');
const submitbutton = document.getElementsByClassName('submitbutton')[0];
const activitylist = document.getElementById('activitylist');
const completedlist = document.getElementById('completedlist');
submitbutton.addEventListener('click',funtion()
{
   const li=document.createElement('li');
   li.textContent=newtask.value;
})