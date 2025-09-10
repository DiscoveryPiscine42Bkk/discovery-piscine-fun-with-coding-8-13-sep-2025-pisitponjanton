// โหลด todo จาก cookie
window.onload = function () {
  const saved = getCookie("todos");
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(todo => addTodoElement(todo));
  }
};

function newTodo() {
  const task = prompt("Enter a new TO DO:");
  if (task && task.trim() !== "") {
    addTodoElement(task.trim(), true);
  }
}

function addTodoElement(text, save = false) {
  const ftList = document.getElementById("ft_list");
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  // ลบเมื่อคลิก
  div.onclick = function () {
    if (confirm("Do you want to remove this TO DO?")) {
      ftList.removeChild(div);
      saveTodos();
    }
  };

  // แทรกด้านบน
  ftList.insertBefore(div, ftList.firstChild);

  if (save) saveTodos();
}

// เก็บลง cookie
function saveTodos() {
  const todos = [];
  const items = document.querySelectorAll("#ft_list .todo");
  items.forEach(item => todos.push(item.textContent));
  setCookie("todos", JSON.stringify(todos), 7);
}

// helper: set cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// helper: get cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
