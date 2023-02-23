import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const noteficationSlice = createSlice ({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            console.log('setNotification ', action.payload)
            state = action.payload
            return state
          },
    },
})
export const { setNotification } = noteficationSlice.actions

export const createNotefication = (message, timeout) => {
    
    return (dispatch) => {
        dispatch(setNotification(message) )
        setTimeout(() => dispatch(setNotification(null)), (timeout * 1000) )
    }
}

export default noteficationSlice.reducer
