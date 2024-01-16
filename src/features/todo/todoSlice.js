import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id: nanoid(),
        text: 'Learn Html',
        completed: false,
        date: new Date().toISOString()
    }]
}


export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false,
                date: new Date().toISOString()
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((each) => each.id !== action.payload)
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map((each) => {
                if (each.id === action.payload.editId) {
                    return {
                        ...each,
                        text: action.payload.input
                    }
                }
                return each
            })
        },
        completeTodo: (state, action) => {
            state.todos = state.todos.map((each) => {
                if (each.id === action.payload) {
                    return {
                        ...each,
                        completed: !each.completed
                    }
                }
                return each
            })
        }
    }
})

export const { addTodo, removeTodo, editTodo, completeTodo } = todoSlice.actions

export default todoSlice.reducer