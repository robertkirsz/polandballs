import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import gallery from './galleryReducer'
import galleryItem from './galleryItemReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store
export default (initialState = {}) =>
  createStore(
    combineReducers({ gallery, galleryItem }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

// Actions
export { actions as galleryActions } from './galleryReducer'
export { actions as galleryItemActions } from './galleryItemReducer'
