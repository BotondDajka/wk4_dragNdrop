


const draggables = document.querySelectorAll(".task");


const containers = document.querySelectorAll(".box");



draggables.forEach(draggables =>{
    draggables.addEventListener("dragstart", (event)=>{
        draggables.classList.add("dragging")

    })
    draggables.addEventListener("dragend", ()=>{
        draggables.classList.remove("dragging")
        postState();
    })
})



containers.forEach(container =>{
    container.addEventListener("dragover", (event)=>{
        event.preventDefault();

        const draggable = document.querySelector(".dragging");

        const afterElement = getDragAfterElement(container, event.clientY)


        if (afterElement.element == undefined){
            container.appendChild(draggable);
        }
        else{
            container.insertBefore(draggable, afterElement.element)
        }

        
    })
})


function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll(".task:not(.dragging)")]

    return draggableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect()

        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        } 
        else{
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY})
}

function postState(){
    const tasksToDo = document.getElementById("todo").getElementsByClassName("task");
    const tasksDoing = document.getElementById("doing").getElementsByClassName("task");
    const tasksDone = document.getElementById("done").getElementsByClassName("task");

    data = {
        todo: [],
        doing: [],
        done: []
    }



    for (let i = 0; i < tasksToDo.length; i++){
        data.todo.push(tasksToDo[i].textContent)
    }

    for (let i = 0; i < tasksDoing.length; i++){
        data.doing.push(tasksDoing[i].textContent)
    }

    for (let i = 0; i < tasksDone.length; i++){
        data.done.push(tasksDone[i].textContent)
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({data:data}));

}