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
        checkbox.style.display = "inline";

        let pencilSpan = document.createElement("SPAN");
        pencilSpan.className = "glyphicon glyphicon-pencil";
        pencilSpan.style.display = "inline";
        pencilSpan.onclick = () => editContent(i);

        let trashSpan = document.createElement("SPAN");
        trashSpan.className = "glyphicon glyphicon-trash";
        trashSpan.style.display = "inline";
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
        saveButton.id = "button" + (i + 1);
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

function editContent(id) {
    let ul = document.getElementById("list");
    let li = ul.children;

    let ck = li[id].querySelector("text");
    console.log(ck);
    document.getElementById("checkbox" + (id + 1)).style.display = "none";
    document.getElementsByClassName("glyphicon glyphicon-pencil")[id].style.display = "none";
    document.getElementsByClassName("glyphicon glyphicon-trash")[id].style.display = "none";

    document.getElementById("label" + (id + 1)).style.display = "inline";
    document.getElementById("text" + (id + 1)).style.display = "inline";
    document.getElementById("button" + (id + 1)).style.display = "inline";

    let oldText = todoList[id].content;
    let newText = document.getElementById("text" + (id + 1));
    newText.value = oldText;

    document.getElementById("button" + (id + 1)).onclick = function () {
        todoList[id].content = newText.value;
        printTodos()
    };

}

function clear () {
    document.getElementById("todoInput").value = "";
}

