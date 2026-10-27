const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

//New task list item
const createCheckbox = function () {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
};

const createLabel = function (taskText) {
  const label = document.createElement('label');
  label.innerText = taskText;
  label.className = 'task';
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButton.className = 'delete';
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');
  listItem.appendChild(createCheckbox());
  listItem.appendChild(createLabel(taskText));
  listItem.appendChild(createEditInput());
  listItem.appendChild(createEditButton());
  listItem.appendChild(createDeleteButton());
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const moveTask = function (listItem, targetList, nextHandler) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
};

const taskCompleted = function () {
  moveTask(this.parentNode, completedList, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, todoList, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkBoxEventHandler;
};

addTaskButton.addEventListener('click', addTask);

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], taskCompleted);
}

for (let j = 0; j < completedList.children.length; j++) {
  bindTaskEvents(completedList.children[j], taskIncomplete);
}
