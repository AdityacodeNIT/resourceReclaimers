import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'


const AddTodo = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
       
        dispatch(addTodo({text:input}))
        setInput('')
    }


  return (

    <div>
      
      <h1>Add Todo</h1>
      <form onSubmit={addTodoHandler} className='form space-x-3 mt-12'>
        <input type="text" placeholder='Add Todo' value={input} className='border-2 border-gray-300 rounded-lg p-2 ' onChange={(e)=>setInput(e.target.value)} />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Add</button>
        </form>
    </div>
  )
}

export default AddTodo
