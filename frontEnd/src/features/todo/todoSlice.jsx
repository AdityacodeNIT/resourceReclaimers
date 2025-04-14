import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState={ // this is our state object
    todos:[{id:1,text:"todo1"},],
}




export const todoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const newTodo={
                id:nanoid(), // this is a unique id for each todo
                text:action.payload.text, // this is the text of the todo
            // this is the completed status of the todo
            };
            state.todos.push(newTodo); // we are poushing todos here
        },
        removeTodo:(state,action)=>{
            const id=action.payload.id; // this is the id of the todo we want to remove
            state.todos=state.todos.filter((todo)=>todo.id!==id); // we are filtering out the todo we want to remove
            
        },

        updateTodo:(state,action)=>{
            const {id,text}=action.payload; // this is the id and text of the todo we want to update
            const todo=state.todos.find((todo)=>todo.id===id); // this is the todo we want to update
            if(todo){
                todo.text=text; // we are updating the text of the todo
            }
        },

        deleteTodo:(state,action)=>{
            const id=action.payload.id; // this is the id of the todo we want to delete
            state.todos=state.todos.filter((todo)=>todo.id!==id); // we are filtering out the todo we want to delete
        },


    }
    })

export const {addTodo,removeTodo,updateTodo,deleteTodo}=todoSlice.actions; // this is how we are exporting the actions
export default todoSlice.reducer; // this is how we are exporting the reducer
