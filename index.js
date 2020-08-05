let todoList = [];

function addTodo() {
    let lenList = todoList.length;
    let todo = {
        id: lenList + 1,
        content: "this is the content",
        is_checked: false
    };

    let inputValue = document.getElementById("todoInput").value;
    todo.content = inputValue;

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
        checkbox.style.display = "inline";

        let pencilSpan = document.createElement("SPAN");
        pencilSpan.className = "glyphicon glyphicon-pencil";
        pencilSpan.style.display = "inline";

        let trashSpan = document.createElement("SPAN");
        trashSpan.className = "glyphicon glyphicon-trash";
        trashSpan.style.display = "inline";
        //trashSpan.addEventListener("click", deleteTodo);
        trashSpan.onclick = () => deleteTodo(i);

        let inputText = document.createElement("INPUT");
        inputText.setAttribute("type", "text");
        inputText.id = "text" + (i + 1);
        inputText.style.display = "none";

        let labelEdit = document.createElement("LABEL");
        labelEdit.htmlFor = inputText.id;
        labelEdit.innerHTML = "Edit: ";
        labelEdit.id = "label" + (i + 1);
        labelEdit.style.display = "none";

        let saveButton = document.createElement("BUTTON");
        saveButton.id = "buttonSave" + (i + 1);
        saveButton.innerHTML = "Save";
        saveButton.style.display = "none";

        let li = document.createElement("LI");
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(todoList[i].content));
        li.appendChild(pencilSpan);
        li.appendChild(trashSpan);
        li.appendChild(labelEdit);
        li.appendChild(inputText);
        li.appendChild(saveButton);

        list.appendChild(li);
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

function clear () {
    document.getElementById("todoInput").value = "";
}

