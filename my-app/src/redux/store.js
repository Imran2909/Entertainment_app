import { legacy_createStore } from 'redux'
import { reducer } from './reducer'
import { m } from 'framer-motion'

const initialState={
    theme:"light",
    avatar:"https://img1.pnghut.com/t/22/13/22/7vKZnT8gWz/symbol-black-and-white-user-profile-information-monochrome.jpg",
    bookmark:[]
}

export const store = legacy_createStore(reducer, initialState)