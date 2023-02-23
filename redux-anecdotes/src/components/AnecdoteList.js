import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import { updateAnecdote } from '../reducers/anecdoteReducer'
import { createNotefication } from '../reducers/noteficationReducer'

const AnecdoteList = () => {
  let anecdotes2 =  useSelector(state => state.anecdote)
  let filter2 = useSelector(state => state.filter)
  
  const anecdotes = anecdotesToShow(anecdotes2, filter2)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote) )
    // console.log('vote', id)
    dispatch(createNotefication(`you voted on '${ anecdote.content }'`, 3) )
  }
  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

const anecdotesToShow = ( anecdotes, filter ) => {
  if ( filter === '' || filter === undefined) {
    // console.log('1', anecdotes)
    return anecdotes
  }
  return anecdotes.filter(anecdote => {return anecdote.content.toLowerCase().includes(filter)})
}

export default AnecdoteList
