import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const addTodo = (e) => {
    e.preventDefault();
    if (!task) return alert("Please Enter a Task");
    setTodos([...todos, { id: Date.now(), task }]);
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setTask(todo.task);
  };

  const editTodo = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, task } : todo
      )
    );
    setIsEditing(false);
    setTask("");
  };

  return (
    <div className="todos">
      <h1>TO-DOs</h1>
      <form onSubmit={isEditing ? editTodo : addTodo}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">{isEditing ? "Update Todo" : "Add Todo"}</button>
      </form>
      <ol className="todosUl">
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="liValue">{todo.task}</div>
            <button className="edit" onClick={() => startEditing(todo)}>Edit</button>
            <button className="del" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
