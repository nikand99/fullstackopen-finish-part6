import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import { createAnecdote } from '../requests'
import CounterContext from '../CounterContext'
const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({ type: 'ADD_MESSAGE', data: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => dispatch({  type: 'ADD_MESSAGE', data: 0}), (3000) )
    }
  })

  const [, dispatch] = useContext(CounterContext)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    await newAnecdoteMutation.mutateAsync({content, 'votes': 0  })
  
    dispatch({ type: 'ADD_MESSAGE', data: `you added: '${ content }'`})
    setTimeout(() => dispatch({  type: 'ADD_MESSAGE', data: 0}), (3000) )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={ onCreate }>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
