const input = document.querySelector(".input");
const list = document.querySelector(".list");
const addBtn = document.querySelector(".btn__add");
const allBtn = document.querySelector(".btn__all");
const chkBtn = document.querySelector(".btn__checked");
const form = document.querySelector(".input-field");

// масив тудашек

let savedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
let todos = savedTodos;

// Функция добавления новой туда
function addTodo(evt) {
  evt.preventDefault(); //Отменяем стандартное поведение (обновление страницы при отправке)
  let value = input.value;

  //Добавляем новый объект в массив тудушек
  if (value.trim().length) {
    todos.push({
      id: new Date().toISOString(),
      text: value,
      isDone: false,
    });
  }
  input.value = "";
  input.focus(); // Не теряем фокус с инпута
  renderTodos(); // Отрисовка
}

// Удаление тудушек по id
const delTodo = (id) => () => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos(); //отрисовка
};

//Меняем статус тудушки в объекте по id
const toggleIsDone = (id) => () => {
  todos = todos.map((todo) => {
    if (id !== todo.id) return todo;
    return (todo = {
      ...todo,
      isDone: !todo.isDone,
    });
  });
  renderTodos(); // Отрисовка
};

//Удаление всех тудушек
const deleteAll = () => {
  todos = [];
  renderTodos(); // Отрисовка
};

//Удалить чекнутые
const deleteChecked = () => {
  todos = todos.filter((todo) => !todo.isDone);
  renderTodos(); // Отрисовка
};

//Отрисовка тудушки (+ события чекбокса и удаления)
function drawTodo(obj) {
  const li = document.createElement("li");
  li.innerHTML = `<input class="check" type="checkbox">
        <span>${obj.text}</span>
        <button class="btn btn__del">❌</button>`;
  const del = li.querySelector(".btn__del");
  const chk = li.querySelector(".check");

  chk.checked = obj.isDone; //Если статус туду в объекте - true, чекбокс будет отрисован чекнутым

  chk.addEventListener("change", toggleIsDone(obj.id)); // Событие чекбокса
  del.addEventListener("click", delTodo(obj.id)); // Событие удаления
  return li;
}

//Функция отрисовки всех туду из массива
function renderTodos() {
  list.innerHTML = "";
  localStorage.setItem("todos", JSON.stringify(todos));
  todos.forEach((item) => {
    list.append(drawTodo(item));
  });

  console.log(todos);
}
//первичная отрисовка
renderTodos;

form.addEventListener("submit", addTodo); // Собите формы
allBtn.addEventListener("click", deleteAll); //Удалить все
chkBtn.addEventListener("click", deleteChecked); //Удалить выполненые
