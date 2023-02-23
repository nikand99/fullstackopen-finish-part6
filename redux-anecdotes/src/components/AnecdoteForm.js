import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotefication } from '../reducers/noteficationReducer'

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')
  const dispatch = useDispatch()

  const handleAnecdote = async (event) => {
    event.preventDefault()
    // dispatch({ type: 'ADD_ANECDOTE', data: { anecdote: anecdote } })
    dispatch(createAnecdote(anecdote) )
    dispatch(createNotefication(`you creates a new anecdote '${anecdote}'`, 3) )
    setAnecdote('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ handleAnecdote }>
        <div>
          anecdote:
          <input
            type='text'
            value={anecdote}
            name='title'
            id='title'
            onChange={({ target }) => setAnecdote(target.value)}
          />
        </div>
        <button type='submit' id='createBlog'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
