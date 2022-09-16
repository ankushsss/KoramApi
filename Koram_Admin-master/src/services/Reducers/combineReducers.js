import { configureStore, combineReducers } from '@reduxjs/toolkit'
import login from "./login"
// import { createStore } from 'redux'

// const allReducer = () =>{ 
//     combineReducers({
//     rest:resturantReducer
// })
// }
const reducer = {
    // User
    login

}
export  const store = configureStore({
    reducer,
})