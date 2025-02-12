task=document.getElementById('task');
button=document.getElementById('add');
para=document.getElementById('addtask');
function addtolist()
{
    console.log(task.value);
    para.textContent=task.value;

};
button.addEventListener('click',addtolist);