let todoList = sessionStorage.getItem("todoList")
    ? JSON.parse(sessionStorage.getItem("todoList")) : [];

const button = document.querySelector("button");

sessionStorage.setItem("todoList", JSON.stringify(todoList));
const retrievedTodoList = JSON.parse(sessionStorage.getItem("todoList"));


button.addEventListener("click", (ev) => {
    updateStorage(ev);
});

retrievedTodoList.forEach((item) => renderTodos());

function renderTodos() {
    let list = document.getElementById("list");
    list.innerText = "";

    for(let i = 0; i < todoList.length; i++){
        let li = document.createElement("LI");

        let span = document.createElement("SPAN");
        let closeBtn = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(closeBtn);
        span.addEventListener("click", (ev) => {
            deleteTodo(i);
            updateStorage(ev);
        });

        li.appendChild(document.createTextNode(todoList[i].content));
        li.appendChild(span);
        list.appendChild(li);

        let liList = document.querySelectorAll("LI");
        liList[i].addEventListener("click", (ev) => {
            handleChange(ev, i);
            liList[i].checked = todoList[i].is_checked;
            updateStorage(ev);
        });
        //liList[i].checked = todoList[i].is_checked;
    }
}

function addTodo() {
    //let lenList = todoList.length;
    let inputValue = document.getElementById("todoInput").value;
    if(inputValue === '')
        alert("Your input is empty");
    else {
        const todo = {
            id: Date.now(),
            content: document.getElementById("todoInput").value,
            is_checked: false
        };
        todoList.push(todo);

        console.log(todoList);

        clear();

        renderTodos();
    }
}

function clear(){
    document.getElementById("todoInput").value = '';
}

function deleteTodo(id) {
    let index = todoList.indexOf(todoList[id]);
    if(index > -1){
        todoList.splice(index, 1);
    }
    renderTodos();
}

function handleChange(event, id) {
    if(event.target.tagName === "LI"){
        if(event.target.classList.toggle("checked")) {
            if(todoList[id].is_checked === false)
                todoList[id].is_checked = true;
            else
                todoList[id].is_checked = false;
        }
        else {
            if(todoList[id].is_checked === true)
                todoList[id].is_checked = false;
            else
                todoList[id].is_checked = true;
        }
        console.log(todoList[id].is_checked);
    }

}

function updateStorage(ev) {
    ev.preventDefault();
    sessionStorage.setItem("todoList", JSON.stringify(todoList));
}