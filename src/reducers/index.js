import { combineReducers } from 'redux'
import gallery from './galleryReducer'
import galleryItem from './galleryItemReducer'

const rootReducer = combineReducers({ gallery, galleryItem })

export default rootReducer
