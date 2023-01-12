let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let userInputElement = document.getElementById("todoUserInput");
let deleteAllBtn = document.getElementById("deleteAll")
let saveTodoButton = document.getElementById("saveTodoButton");



function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;




saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

addTodoButton.onclick = function() {
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
  
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";

}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let todoId = 'todo' + todo.uniqueNo;
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let taskinputEle = document.createElement('input');
    taskinputEle.classList.add('task-input');
    taskinputEle.setAttribute("for", "checkboxInput");
    taskinputEle.id = labelId;
    taskinputEle.type = 'text';
    taskinputEle.value = todo.text;
    taskinputEle.setAttribute('readonly', 'readonly');
    if (todo.isChecked === true) {
        taskinputEle.classList.add("checked");
    }
    labelContainer.appendChild(taskinputEle);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let editBtn = document.createElement("button");
    editBtn.classList.add('edit');
    editBtn.textContent = 'Edit';
    deleteContainer.appendChild(editBtn);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

    editBtn.addEventListener('click', function() {
        if (editBtn.textContent.toLowerCase() === "edit") {
            editBtn.textContent = "Edited"
            taskinputEle.removeAttribute("readonly");
            taskinputEle.focus();
        } else {
            editBtn.textContent = "Edit"
            taskinputEle.setAttribute("readonly", "readonly");
        }
    })


}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}