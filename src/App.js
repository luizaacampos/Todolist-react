import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './App.css'

import TodoList from './components/TodoList'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
  }

  return (
    <div className="container">
    <div className="paper">
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <div className="functions">
    <input type="text" ref={todoNameRef} />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    </div>
    <div className="left">{todos.filter(todo => !todo.complete).length} left To do</div>
    </div>
    </div>
  )
}

export default App;
