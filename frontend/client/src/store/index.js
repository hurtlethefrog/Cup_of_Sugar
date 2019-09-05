import { combineReducers, createStore } from 'redux'
import app from './app'

export default createStore(combineReducers({
  app
}))