import React from 'react'
import {useSelector,useDispatch } from 'react-redux'
import{deleteTodo} from '../features/todo/todoSlice'
import AddTodo from './AddTodo.jsx'


const Todos = () => {
    const todos=useSelector(state=>state.todos)
    const dispatch=useDispatch()


     // this is how we are getting the todos from the state
  return (
    <div>
        <AddTodo/>
        
        <h1 className='text-3xl font-bold'>Todos</h1>
        {todos.map((todo)=>(
            <div key={todo.id} className='border-2 border-gray-300 rounded-lg p-4 mt-4 flex justify-between items-center'>
                <h1 className='text-xl font-bold'>{todo.text}</h1>
                <button onClick={()=>dispatch(deleteTodo({id:todo.id}))} className='bg-red-500 text-white px-4 py-2 rounded-lg'>Delete</button>
            </div>
        ))}

    </div>
  )
}

export default Todos
