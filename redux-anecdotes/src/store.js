import { configureStore } from "@reduxjs/toolkit";

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import noteficationReducer from './reducers/noteficationReducer'

const store = configureStore({
  reducer: {
      anecdote: anecdoteReducer,
      filter: filterReducer,
      notefication: noteficationReducer
  }
}) 
console.log('store.getState()', store.getState())

export default store;
