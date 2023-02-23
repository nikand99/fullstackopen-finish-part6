import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'

import CounterContext from './CounterContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'



const notificationReducer = (state, action) => {
  if(action.type === 'ADD_MESSAGE') {
    // console.log('setNotification ', action.data)
    state = action.data
    return state
  }
  return state
}

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  const newAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({ type: 'ADD_MESSAGE', data: `an error occurred please try again`})
      setTimeout(() => notificationDispatch({  type: 'ADD_MESSAGE', data: 0}), (3000) )
    }
  })

  const handleVote = async (anecdote) => {
    console.log('vote', anecdote)

    await newAnecdoteMutation.mutateAsync({ ...anecdote, votes: anecdote.votes + 1 })
    
    notificationDispatch({ type: 'ADD_MESSAGE', data: `you voted on '${ anecdote.content }'`})
    setTimeout(() => notificationDispatch({  type: 'ADD_MESSAGE', data: 0}), (3000) )
  }

  const result = useQuery('anecdotes', getAnecdotes)
  // console.log(result)
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <span>anecdote service not available due to problems in server: {result.error.message}</span>
  }
  const anecdotes = result.data
  
  return (
    <CounterContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </CounterContext.Provider>
  )
}

export default App
