//Model

//if localstorage has values then use it else use default array;
let todos;
const savedtodos = JSON.parse(localStorage.getItem("todos"));
if (Array.isArray(savedtodos)) {
  todos = savedtodos;
} else {
  todos = [
    { title: "Get groceries", dueDate: "2022-07-12", id: "id1", isDone: false },
    { title: "Wash car", dueDate: "2022-07-15", id: "id2", isDone: false },
    { title: "Make dinner", dueDate: "2022-07-11", id: "id3", isDone: false },
  ];
}

//Creates a todo
function createTodo(title, dueDate) {
  let id = "" + new Date().getTime();
  let isDone = false;
  let todoItem = { title: title, dueDate: dueDate, id: id, isDone: isDone };
  todos.push(todoItem);
  saveToDos();
}

//Deletes a todo
const removeTodo= idToDelete => {
  todos = todos.filter((todo) => todo.id !== idToDelete);
  saveToDos();
}

//Saves a todo
function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//edit a todo

function editToDo(idToEdit) {
  todos.forEach(item => {
    if (item.id === idToEdit) item.isEditing = true;
  });
  saveToDos();
}

//udpdate a todo
function updateToDo(idToUpdate,newTitle,newDueDate) {
  todos.forEach(function (item) {
    if (item.id === idToUpdate) {
    item.isEditing = false;
    item.title=newTitle;
    item.dueDate=newDueDate;
}
});
  saveToDos();
}

//Controller
function addNewToDo() {
  let textbox = document.getElementById("todo-title");
  let title = textbox.value;
  let datePicker = document.getElementById("date-picker");
  let dueDate = datePicker.value;
  createTodo(title, dueDate);
  render(todos);
}

function onEdit(event) {
  const editButton = event.target;
  const idToEdit = editButton.id;
  editToDo(idToEdit);
  render(todos);
}

function onUpdate(event) {
  const updateButton = event.target;
  const idToUpdate = updateButton.id;
  let textbox=document.getElementById(idToUpdate+'text');
  let newTitle=textbox.value;
  let datepicker=document.getElementById(idToUpdate+'date');
  let newDueDate=datepicker.value;
  updateToDo(idToUpdate,newTitle,newDueDate);
  render(todos);
}

const onDelete=todo => {
    return () => {
        removeTodo(todo.id);
        render(todos);
   };
}

function checkTodo(event) {
  const checkbox = event.target;
  const todoId = checkbox.dataset.todoId;
  const checked = checkbox.checked;
  toogleTodo(todoId, checked);
  render(todos);
}
function toogleTodo(todoId, isDone) {
  todos.forEach(function (item) {
    if (item.id === todoId) item.isDone = isDone;
  });
}

//View
function render(arrayName) {
  document.getElementById("todo-list").innerHTML = "";
  arrayName.forEach(function (arrayItem) {
    addTodo(arrayItem);
  });
}

function addTodo(arrayItem) {
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onchange = checkTodo;
  checkBox.dataset.todoId = arrayItem.id;

  if (arrayItem.isDone === true) checkBox.checked = true;
  else checkBox.checked = false;

  let element = document.createElement("div");

  if (arrayItem.isEditing === true) {
    let textbox = document.createElement("input");
    textbox.type = "text";
    textbox.id = arrayItem.id+'text';
    let datepicker = document.createElement("input");
    datepicker.type = "date";
    datepicker.id = arrayItem.id+'date';
    datepicker.style = "margin-left:12px;";
    let updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.style = "margin-left:12px;";
    updateButton.id = arrayItem.id;
    updateButton.onclick = onUpdate;
    element.appendChild(textbox);
    element.appendChild(datepicker);
    element.appendChild(updateButton);
  } else {
    element.innerText = arrayItem.title + " " + arrayItem.dueDate;
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.style = "margin-left:12px;";
    editButton.id = arrayItem.id;
    editButton.onclick = onEdit;
    element.prepend(checkBox);
    element.appendChild(editButton);
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style = "margin-left:12px;";
    deleteButton.onclick = onDelete(arrayItem);
    element.appendChild(deleteButton);
  }

  let todoList = document.getElementById("todo-list");
  todoList.appendChild(element);
}

render(todos);
