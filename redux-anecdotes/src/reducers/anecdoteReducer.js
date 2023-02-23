import { createSlice } from '@reduxjs/toolkit'

import filterReducer from './filterReducer'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const anecdoteUpdate = action.payload
      // console.log('anecdoteUpdate', anecdoteUpdate)
      
      let anecdote_return = state.map((anecdote) => anecdote.id !== anecdoteUpdate.id ? anecdote : anecdoteUpdate)
      anecdote_return = anecdote_return.filter(x => x.anecdote === filterReducer.filter)
      return anecdote_return.sort((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdote = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes.sort((a, b) => b.votes - a.votes) ) )
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote) ) 
  }
}

export const updateAnecdote = (anecdote) => {
  console.log('updateAnecdote ', anecdote)
  return async (dispatch) => {
    const updateAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(addVote(updateAnecdote) ) 
  }
}

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer



// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)


//   console.log('anecdote state now: ', state)
//   console.log('anecdote action', action)

//   if(action.type === 'VOTE') {
//     // console.log('action: ', action)
//     const id = action.data.id
//     // console.log('id: ', id)
//     // console.log('state.id: ', state)
//     const anecdoteUpdate = state.find(a => a.id === id )
//     // console.log('anecdoteUpdate: ', anecdoteUpdate)
//     const anecdotesChangeTo = {
//       ...anecdoteUpdate,
//       votes: anecdoteUpdate.votes + 1
//     }

//     // console.log('filterReducer.filter', filterReducer.filter)

//     let anecdote_return = state.map((anecdote) => anecdote.id !== id ? anecdote : anecdotesChangeTo)
//     anecdote_return = anecdote_return.filter(x => x.anecdote === filterReducer.filter)
//     return anecdote_return.sort((a, b) => b.votes - a.votes)
//   }

//   if(action.type === 'ADD_ANECDOTE') { 
//     // console.log('action: ', action)
//     const anecdote = action.data.anecdote
//     // console.log('anecdote: ', anecdote)

//     const newAnecdote = {
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//     const anecdote_return = [...state, newAnecdote]
//     return anecdote_return.sort((a, b) => b.votes - a.votes)
//   }

//   return state.sort((a, b) => b.votes - a.votes)
// }

// export const addVote = (id) => {
//   return ({type: 'VOTE', data: { id } } )
// }

// export const addAnecdote = (anecdote) => {
//   return ({type: 'ADD_ANECDOTE', data: { anecdote: anecdote } } )
// }

// export default anecdoteReducer
