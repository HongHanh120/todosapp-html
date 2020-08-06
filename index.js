let todoList = [];

function addTodo() {
    let lenList = todoList.length;
    let todo = {
        id: lenList + 1,
        content: "this is the content",
        is_checked: false
    };

    todo.content = document.getElementById("todoInput").value;

    todoList.push(todo);

    return clear();
}

function printTodos() {
    let list = document.getElementById("list");
    list.innerText = '';

    for(let i = 0; i < todoList.length; i++){
        let checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.id = 'checkbox'+ (i + 1);
        checkbox.name = "checkbox";
        checkbox.addEventListener("change", ev => {
            handleChange(ev, i);
        });
        checkbox.checked = todoList[i].is_checked;

        let label = document.createElement("LABEL");
        label.id = 'content'+ (i + 1);
        label.htmlFor = checkbox.id;
        label.innerHTML = todoList[i].content;

        let pencilSpan = document.createElement("SPAN");
        pencilSpan.className = "glyphicon glyphicon-pencil";
        pencilSpan.onclick = () => editContent(i);

        let trashSpan = document.createElement("SPAN");
        trashSpan.className = "glyphicon glyphicon-trash";
        trashSpan.onclick = () => deleteTodo(i);

        let inputText = document.createElement("INPUT");
        inputText.setAttribute("type", "text");
        inputText.id = "text" + (i + 1);

        let labelEdit = document.createElement("LABEL");
        labelEdit.htmlFor = inputText.id;
        labelEdit.innerHTML = "Edit: ";
        labelEdit.id = "label" + (i + 1);

        let saveButton = document.createElement("BUTTON");
        saveButton.id = "button" + (i + 1);
        saveButton.innerHTML = "Save";


        let li = document.createElement("LI");
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(pencilSpan);
        li.appendChild(trashSpan);
        li.appendChild(labelEdit);
        li.appendChild(inputText);
        li.appendChild(saveButton);

        list.appendChild(li);
        displayDefault(i);
    }
}

function deleteTodo(id) {
    let ul = document.getElementById("list");
    let li = ul.children;

    ul.removeChild(li[id]);
    let index = todoList.indexOf(todoList[id]);
    if(index > -1)
        todoList.splice(index, 1);
    printTodos();
}

function editContent(id) {
    showEditForm(id);

    let oldText = todoList[id].content;
    let newText = document.getElementById("text" + (id + 1));
    newText.value = oldText;

    document.getElementById("button" + (id + 1)).onclick = function () {
        todoList[id].content = newText.value;
        printTodos()
    };
}

function handleChange(event, id){
    if(event.target.checked){
        if(todoList[id].is_checked === false)
            todoList[id].is_checked = true;
    }
    else{
        if(todoList[id].is_checked === true)
            todoList[id].is_checked = false;
    }
    console.log(todoList[id].is_checked)
}

function displayDefault(id) {
    document.getElementById("checkbox" + (id + 1)).style.display = "inline";
    document.getElementById("content" + (id + 1)).style.display = "inline";
    document.getElementsByClassName("glyphicon glyphicon-pencil")[id].style.display = "inline";
    document.getElementsByClassName("glyphicon glyphicon-trash")[id].style.display = "inline";

    document.getElementById("label" + (id + 1)).style.display = "none";
    document.getElementById("text" + (id + 1)).style.display = "none";
    document.getElementById("button" + (id + 1)).style.display = "none";
}

function showEditForm(id) {
    document.getElementById("checkbox" + (id + 1)).style.display = "none";
    document.getElementById("content" + (id + 1)).style.display = "none";
    document.getElementsByClassName("glyphicon glyphicon-pencil")[id].style.display = "none";
    document.getElementsByClassName("glyphicon glyphicon-trash")[id].style.display = "none";

    document.getElementById("label" + (id + 1)).style.display = "inline";
    document.getElementById("text" + (id + 1)).style.display = "inline";
    document.getElementById("button" + (id + 1)).style.display = "inline";
}

function clear () {
    document.getElementById("todoInput").value = "";
}

