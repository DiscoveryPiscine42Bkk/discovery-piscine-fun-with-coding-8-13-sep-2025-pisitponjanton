$(function(){
  loadTodos();

  $("#new").click(function(){
    let task = prompt("Enter TO DO:");
    if(task && task.trim()!=="") addTodo(task.trim(), true);
  });

  function addTodo(text, save=false){
    let div = $("<div>").addClass("todo").text(text);
    div.click(function(){
      if(confirm("Remove this TO DO?")){
        $(this).remove(); saveTodos();
      }
    });
    $("#ft_list").prepend(div);
    if(save) saveTodos();
  }

  function saveTodos(){
    let todos = [];
    $(".todo").each(function(){ todos.push($(this).text()); });
    document.cookie = "todos="+JSON.stringify(todos)+"; path=/";
  }

  function loadTodos(){
    let match = document.cookie.match(/(^| )todos=([^;]+)/);
    if(match){
      let todos = JSON.parse(match[2]);
      todos.forEach(t=> addTodo(t));
    }
  }
});
