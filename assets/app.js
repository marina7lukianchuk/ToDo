const toDoArr = [ 
    {
        label: 'Buy jacket',
        isDone: false
    },
    {
        label: 'Doing yoga',
        isDone: false
    }
    
];
const list = document.querySelector('.list');

function cleanTodo() {
    list.innerHTML = '';
};


function switchModal() {
    const forModal = document.querySelector('.modal_window');
    const isOpen = forModal.classList.contains('open_modal');
    isOpen? forModal.classList.remove('open_modal') : forModal.classList.add('open_modal');
};

function createIcons() {
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.classList.add('icon_open');
  
    a.addEventListener('click', e => {
        const targetItem = e.target.parentNode;
        const dataIndex = targetItem.dataset.index;
        const titleModal = document.querySelector('.title_modal');
        titleModal.textContent = toDoArr[dataIndex].label;

        const badge = document.querySelector('.badge');
        badge.textContent = toDoArr[dataIndex].isDone? 'Done' : 'To Do';

        if (toDoArr[dataIndex].isDone === false) {
            badge.classList.add('badge_todo') 
        } else {
            badge.classList.remove('badge_todo')  
        };

        switchModal()
})
    return a;

};




function createCheckBox () {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'checkbox_form');
    checkBox.setAttribute('value', 'check');

    checkBox.addEventListener('change', (e)=> {
       const targetCheck = e.target;
       const isChecked = targetCheck.checked;
       const parentLi = targetCheck.parentNode;
        parentLi.classList.toggle('active');

      
       const dataAttrib = parentLi.dataset.index;
       toDoArr[dataAttrib].isDone = isChecked;
       

    })
    return checkBox;
};

function createLi(item, index) {
    const listItem = document.createElement('li');
    const check = createCheckBox();
    const icons = createIcons();
    const butt = createDeleteButton();

    listItem.textContent = item.label;
    listItem.setAttribute('class', 'list_item');
    listItem.setAttribute('data-index', index);
    listItem.prepend(check);
    listItem.append(icons);
    listItem.append(butt);
   
    return listItem;
};


function addNewItem() {
    toDoArr.forEach((item, index) => {
        const li =  createLi(item, index);
        list.appendChild(li);
    })
};

function createDeleteButton() {
    const button = document.createElement('a');
    button.setAttribute('href', '#');
    button.classList.add('delete_button');

    button.addEventListener('click', e => {
    const targetItem = e.target.parentNode;
    const dataIndex = targetItem.dataset.index;
    targetItem.remove(dataIndex);
    toDoArr.splice(dataIndex, 1);
    })
    return button;

};


function addNewTodo() {
 const inputEl = document.getElementById('inputval');
 const inputVal = inputEl.value;
 const newObj = {
    label: inputVal,
    isDone: false
 };
 toDoArr.push(newObj);
 inputEl.value = ' ';
 cleanTodo();
 addNewItem();
};

addNewItem();


