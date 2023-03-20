"use strict";

var toDoArr = [{
  label: 'Buy jacket',
  isDone: false
}, {
  label: 'Doing yoga',
  isDone: false
}];
var list = document.querySelector('.list');

function cleanTodo() {
  list.innerHTML = '';
}

;

function switchModal() {
  var forModal = document.querySelector('.modal_window');
  var isOpen = forModal.classList.contains('open_modal');
  isOpen ? forModal.classList.remove('open_modal') : forModal.classList.add('open_modal');
}

;

function createIcons() {
  var a = document.createElement('a');
  a.setAttribute('href', '#');
  a.classList.add('icon_open');
  a.addEventListener('click', function (e) {
    var targetItem = e.target.parentNode;
    var dataIndex = targetItem.dataset.index;
    var titleModal = document.querySelector('.title_modal');
    titleModal.textContent = toDoArr[dataIndex].label;
    var badge = document.querySelector('.badge');
    badge.textContent = toDoArr[dataIndex].isDone ? 'Done' : 'To Do';

    if (toDoArr[dataIndex].isDone === false) {
      badge.classList.add('badge_todo');
    } else {
      badge.classList.remove('badge_todo');
    }

    ;
    switchModal();
  });
  return a;
}

;

function createCheckBox() {
  var checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('class', 'checkbox_form');
  checkBox.setAttribute('value', 'check');
  checkBox.addEventListener('change', function (e) {
    var targetCheck = e.target;
    var isChecked = targetCheck.checked;
    var parentLi = targetCheck.parentNode;
    parentLi.classList.toggle('active');
    var dataAttrib = parentLi.dataset.index;
    toDoArr[dataAttrib].isDone = isChecked;
  });
  return checkBox;
}

;

function createLi(item, index) {
  var listItem = document.createElement('li');
  var check = createCheckBox();
  var icons = createIcons();
  var butt = createDeleteButton();
  listItem.textContent = item.label;
  listItem.setAttribute('class', 'list_item');
  listItem.setAttribute('data-index', index);
  listItem.prepend(check);
  listItem.append(icons);
  listItem.append(butt);
  return listItem;
}

;

function addNewItem() {
  toDoArr.forEach(function (item, index) {
    var li = createLi(item, index);
    list.appendChild(li);
  });
}

;

function createDeleteButton() {
  var button = document.createElement('a');
  button.setAttribute('href', '#');
  button.classList.add('delete_button');
  button.addEventListener('click', function (e) {
    var targetItem = e.target.parentNode;
    var dataIndex = targetItem.dataset.index;
    targetItem.remove(dataIndex);
    toDoArr.splice(dataIndex, 1);
  });
  return button;
}

;

function addNewTodo() {
  var inputEl = document.getElementById('inputval');
  var inputVal = inputEl.value;
  var newObj = {
    label: inputVal,
    isDone: false
  };
  toDoArr.push(newObj);
  inputEl.value = ' ';
  cleanTodo();
  addNewItem();
}

;
addNewItem();