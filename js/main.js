const todoForm = document.querySelector('form#todo_form');
const todo = document.querySelector('#todo');
const todo_list = document.querySelector('ul#todo_list');
let todos = []
let isUpdate = false;
let activeTodo = "";
let activeIndex;
const todo_button = document.querySelector('#todo_button')
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
  }
const updateTodo = (e)=>{
     activeTodo = e.target.parentNode.parentNode.childNodes[0].data;
     let target = getEventTarget(e);
        let li = target.closest('li'); // get reference by using closest
        let nodes = Array.from( li.closest('ul').children ); // get array
         activeIndex = nodes.indexOf( li ); 
    if(e.target.classList.contains("delete")){
        todos = JSON.parse(localStorage.getItem("todos"));
         todos.splice(activeIndex,1);
localStorage.setItem("todos",JSON.stringify(todos))

    }
    else if(e.target.classList.contains("edit"))
    {
        
     
        isUpdate = true;
        todo.value = activeTodo;
todo_button.innerText = "Update Todo";

    }
getTodos();


}
todo_list.addEventListener("click",updateTodo)

const addTodo = (e) =>
{
e.preventDefault();
if(todo.value=="")
    alert("Please input something")
else{
if(isUpdate)
{
    todos = JSON.parse(localStorage.getItem("todos"));
  
            todos[activeIndex] = todo.value;
      

    
todo_button.innerText = "Add Todo";
isUpdate = false;
localStorage.setItem("todos",JSON.stringify(todos))
}
else{


const li = document.createElement("li");
todos = JSON.parse(localStorage.getItem("todos"));
let list = [];
list.push(todo.value);

if(todos===null)
  localStorage.setItem("todos",JSON.stringify(list))
  else{
list = [...todos,todo.value];
localStorage.setItem("todos",JSON.stringify(list))

  }
}
}
  todo.value = ""
  getTodos()

}

const getTodos = () =>{
    todos = JSON.parse(localStorage.getItem("todos"));
    // console.log(todos)
    
    if(todos===null || todos.length==0)
    {
        todo_list.innerHTML = "No Todos"
    }
    else
    {
        todo_list.innerHTML = ""

    todos.forEach((todo,i)=>
    {
        // console.log(i)
    const li = document.createElement("li");

        li.innerHTML = `<span>${todo}<span> <button class="edit">Edit</button> <button class="delete" >Delete</button>`
        li.style.listStyle="number"
        todo_list.appendChild(li);
    }
    )
    


}
    
}
todoForm.addEventListener("submit",addTodo);

getTodos()