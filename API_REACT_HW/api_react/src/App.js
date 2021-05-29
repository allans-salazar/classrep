import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuid from 'react-uuid'



const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]) 
  const todoNameRef = useRef()


  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storeTodos) setTodos(storeTodos)
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
    if (name === '')  return
    setTodos(prevTodos => {
    return [...prevTodos, { id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }


  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  return (
    <>
    <div style = {Styles.containter}>
    <p style= {Styles.title}> Check Out my List!! </p>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input style={Styles.bigSearchBox} ref={todoNameRef} type="text" />
    <button style={Styles.button1} onClick={handleAddTodo}>Add Item</button>
    <button style={Styles.button2} onClick={handleClearTodos}>Complete</button>
    <div style={Styles.completeMessage}> {todos.filter(todo => !todo.complete).length} left to do </div>

    </div>
    </>
  )
}

const Styles = {
  containter: {
    backgroundColor:'gray',
    height: '1000px'
  },

  title: {
    position:'absolute',
    top:'20%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    padding:'10px',
    fontWeight:'bold',
    textDecoration:'underline',
    fontSize:'40px'
  },

  bigSearchBox: {
    position:'absolute',
    top:'45%',
    left:'44%',
    transform:'translate(-50%,-50%)',
    padding:'10px'
  },
  
  button1: {
    position:'absolute',
    top:'45%',
    left:'55%',
    transform:'translate(-50%,-50%)',
    padding:'10px'
  },

  button2: {
    position:'absolute',
    top:'45%',
    left:'62%',
    transform:'translate(-50%,-50%)',
    padding:'10px'
  },

  completeMessage: {
    position:'absolute',
    top:'60%',
    left:'50.5%',
    transform:'translate(-50%,-50%)',
    width: '100',
    border: '2px solid black',
    padding: '10px',
    


  }

};

export default App;