const input = document.querySelector("#tasktext");
const submit = document.querySelector("#addtask");
const tasksDiv = document.querySelector("#tasks");
const span = document.getElementById("hidden");
const all=document.getElementById("all");
const complete=document.getElementById("complete");
const incomplete=document.getElementById("incomplete");
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


window.onload=function (){
    all.style="background-color: #f684af;"
    for (let i = 0; i < arrayOfTasks.length; i++) {
        show(arrayOfTasks[i])
    }
}


all.addEventListener("click",function (){
    all.style="background-color: #f684af;"
    incomplete.style="background-color: #fff4f1;"
    complete.style="background-color: #fff4f1;"
    delete_all();
    for (let i = 0; i < arrayOfTasks.length; i++) {
            show(arrayOfTasks[i])
    }
});
function delete_all()
{
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (document.getElementById(arrayOfTasks[i].id))
        document.getElementById(arrayOfTasks[i].id).parentElement.remove()
    }
}

complete.addEventListener("click",function (){
    delete_all();
    all.style="background-color: #fff4f1;"
    incomplete.style="background-color: ##fff4f1;"
    complete.style="background-color: #f684af;"
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].completed===true) {
       show(arrayOfTasks[i])
    }
    }
});

incomplete.addEventListener("click",function (){
    delete_all();
    all.style="background-color: ##fff4f1#fff4f1;"
    incomplete.style="background-color: #f684af;"
    complete.style="background-color: #fff4f1;"
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].completed===false){
            show(arrayOfTasks[i])
        }
    }
});

function deleteTask(what){

    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (what == arrayOfTasks[i].id) {
            arrayOfTasks.splice(i, 1)
            // console.log(arrayOfTasks)

        }
    }
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function show(task){
    d=document.createElement("div")
    d.className="task button-wrapper";
    p=document.createElement("p")
    p.className="confetti-button"
    del=document.createElement("img")
    del.src="icons/close.png"
    del.id=task.id
    p.id=task.id
    if(task.completed===true)
        p.classList.toggle("checked")
    p.innerText=task.title
    d.appendChild(p)
    d.appendChild(del)
    tasksDiv.appendChild(d)
}
function addTask(tValue){
     const task={
         id: Date.now(),
        title: tValue,
        completed: false,
     }
     arrayOfTasks.push(task);
     window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    show(task)
}

submit.onclick=function (){
    if (input.value !== "") {
        addTask(input.value);
        input.value = "";
        span.innerText=""
    }
    else{
        span.innerText="you must write something!"
    }
};

tasksDiv.addEventListener("click",function (e){
    if (e.target.tagName==="P")
    {
        e.target.classList.toggle("checked")
        for (let i = 0; i < arrayOfTasks.length; i++) {
            if( e.target.id == arrayOfTasks[i].id)
            {
                if(arrayOfTasks[i].completed===false) {
                    arrayOfTasks[i].completed = true
                    document.getElementById("yay").play();
                    confetti();


                }
                else
                    arrayOfTasks[i].completed=false
                window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
            }
        }
    }
    else if (e.target.tagName==="IMG"){
        e.target.parentElement.remove();
        deleteTask(e.target.id)
    }
}, false);


input.addEventListener("keypress",function (event) {
    if (event.key==="Enter"){
        event.preventDefault();
        submit.click();
    }

});


