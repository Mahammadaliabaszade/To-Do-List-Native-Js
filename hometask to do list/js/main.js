const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
// array yaradmaq
let todos = [];
// formun submitine qulaq asmaliyam
todoForm.addEventListener('submit', function(event) {
    // sehife reload gedende 
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    // eger bosdursa
    if (item !== '') {
        // obyekte cevirmek 
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        // arraya elave etmek
        todos.push(todo);
        renderTodos(todos);
        // sonda inputun valuesini temizlemek
        todoInput.value = '';
    }
}
// 
function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        // itemi yoxlamaq
        const checked = item.completed ? 'checked' : null;

        // li yaradmaq

        const li = document.createElement('li');
        // li class vermek
        li.setAttribute('class', 'item');
        // id elave etmek
        li.setAttribute('data-key', item.id);

        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
      `;
        // finally add the <li> to the <ul>
        todoItemsList.append(li);
    });

}
// funksiyani locala atmaq
function addToLocalStorage(todos) {
    // string formatina cevirmek
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');

    if (reference) {
        // parse etmek
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}
getFromLocalStorage();
todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    // delete button yoxlamaq
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

function toggle(id) {
    todos.forEach(function(item) {

        if (item.id == id) {

            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id) {

    todos = todos.filter(function(item) {

        return item.id != id;
    });
    // local storage update elemek
    addToLocalStorage(todos);
}