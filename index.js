let todoList = sessionStorage.getItem("todoList")
    ? JSON.parse(sessionStorage.getItem("todoList")) : [];

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
        });

        li.appendChild(document.createTextNode(todoList[i].content));
        li.appendChild(span);
        list.appendChild(li);

        list.addEventListener("click", ev => {
            if(ev.target.tagName === "LI"){
                ev.target.classList.toggle("checked");
                handleChange(ev, i);
            }
        }, false)
    }
}

function addTodo() {
    let lenList = todoList.length;
    let inputValue = document.getElementById("todoInput").value;
    if(inputValue === '')
        alert("Your input is empty");
    const todo = {
        id: lenList,
        content: inputValue,
        is_checked: false
    };

    todoList.push(todo);

    clear();

    renderTodos()
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
    if(event.target.checked){
        if(todoList[id].is_checked === false)
            todoList[id].is_checked = true;
    }
    else{
        if(todoList[id].is_checked === true)
            todoList[id].is_checked = false;
    }
    console.log(todoList[id].is_checked);
}