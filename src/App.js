import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, editTodo, completeTodo } from './features/todo/todoSlice';
import { intervalToDuration } from 'date-fns'

function App() {
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState('')
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()


  const onSubmitForm = (event) => {
    event.preventDefault()
    if (!editId) {
      dispatch(addTodo(input))
    } else {
      dispatch(editTodo({ editId, input }))
    }
    setInput('')
    setEditId('')
  }

  const onDelete = (id) => {
    dispatch(removeTodo(id))
  }

  const onEditTodo = (id) => {
    const todo = todos.find((each) => each.id === id)
    setInput(todo.text)
    setEditId(id)
  }


  const onClickCheckBox = (event) => {
    dispatch(completeTodo(event.target.value))
  }

  return (
    <div className="bg-container">
      <h1>Todos</h1>
      <form className='form' onSubmit={onSubmitForm}>
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)} className='input' required />
        <button type='submit'>Add</button>
      </form>
      <ul className='todo-list'>
        {todos.map(e => {
          const isCompleted = e.completed

          const timeRequired = () => {
            let timeTakenString = ''
            const start = new Date(e.date);
            const end = new Date();
            const { hours, minutes } = intervalToDuration({ start, end });

            if (hours > 0) {
              timeTakenString += `${hours} hour${hours !== 1 ? 's' : ''}`;
            }
            if (minutes > 0) {
              timeTakenString += `${timeTakenString.length > 0 ? ' ' : ''}${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
            return timeTakenString
          }
          const timeTakenString = timeRequired()

          return <li className='list-item' key={e.id}>
            <div className='todo-container'>
              <input type='checkbox' value={e.id} onClick={onClickCheckBox} />
              <p className={isCompleted ? 'todo strikedOut' : 'todo'}>{e.text}</p>
              {isCompleted && <p className='distance'> Completed In: {timeTakenString || '1 min'}</p>}
              <div className='buttons-container'>
                <button type='btn button' onClick={() => onEditTodo(e.id)}>
                  Edit</button>
                <button type='btn button' onClick={() => onDelete(e.id)}>
                  Delete</button>
              </div>
            </div>
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
