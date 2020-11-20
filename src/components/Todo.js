import React from 'react'

import './Todo.css'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    
    return (
        <div className="check">
            <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            <span>{todo.name}</span>
            </label>
        </div>
    )
}

