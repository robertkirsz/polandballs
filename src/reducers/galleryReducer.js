import api from '../api'
import { addThumbs, onlyPolandballs } from '../utils'

export const FETCH_GALLERY_REQUEST = 'FETCH_GALLERY_REQUEST'
export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS'
export const FETCH_GALLERY_FAIL = 'FETCH_GALLERY_FAIL'
export const APPEND_TO_GALLERY_REQUEST = 'APPEND_TO_GALLERY_REQUEST'
export const APPEND_TO_GALLERY_SUCCESS = 'APPEND_TO_GALLERY_SUCCESS'
export const APPEND_TO_GALLERY_FAIL = 'APPEND_TO_GALLERY_FAIL'

export const fetchGallery = tag => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_GALLERY_REQUEST })

    api
      .getGalleryByTag(tag)
      .then(response => {
        dispatch({
          type: FETCH_GALLERY_SUCCESS,
          items: addThumbs(response.items),
          tag
        })
        resolve()
      })
      .catch(error => {
        dispatch({ type: FETCH_GALLERY_FAIL, error })
        reject()
      })
  })

export const fetchUserGallery = id => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_GALLERY_REQUEST })

    api
      .getUserGallery(id)
      .then(items => {
        dispatch({
          type: FETCH_GALLERY_SUCCESS,
          items: addThumbs(onlyPolandballs(items))
        })
        resolve()
      })
      .catch(error => {
        dispatch({ type: FETCH_GALLERY_FAIL, error })
        reject()
      })
  })

export const searchGallery = query => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_GALLERY_REQUEST })

    api
      .searchGallery(query)
      .then(items => {
        dispatch({
          type: FETCH_GALLERY_SUCCESS,
          items: addThumbs(onlyPolandballs(items))
        })
        resolve()
      })
      .catch(error => {
        dispatch({ type: FETCH_GALLERY_FAIL, error })
        reject()
      })
  })

export const addMoreItems = () => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: APPEND_TO_GALLERY_REQUEST })

    const { tag, page } = getState().gallery

    api
      .getGalleryByTag(tag, { page: page + 1 })
      .then(response => {
        dispatch({
          type: APPEND_TO_GALLERY_SUCCESS,
          items: addThumbs(onlyPolandballs(response.items)),
          page: page + 1
        })
        resolve()
      })
      .catch(error => {
        dispatch({ type: APPEND_TO_GALLERY_FAIL, error })
        reject()
      })
  })

export const galleryActions = {
  fetchGallery,
  fetchUserGallery,
  searchGallery,
  addMoreItems
}

const initialState = {
  items: [],
  tag: '',
  page: 0,
  loading: false,
  loaded: false,
  error: null,
  appending: false,
  appended: false,
  appendError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GALLERY_REQUEST:
      return { ...state, loading: true, loaded: false, error: null }
    case FETCH_GALLERY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.items,
        tag: action.tag || state.tag
      }
    case FETCH_GALLERY_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error }
    case APPEND_TO_GALLERY_REQUEST:
      return { ...state, appending: true, appended: false, appendError: null }
    case APPEND_TO_GALLERY_SUCCESS:
      return {
        ...state,
        appending: false,
        appended: true,
        items: [...state.items, ...action.items],
        page: action.page
      }
    case APPEND_TO_GALLERY_FAIL:
      return { ...state, appending: false, appended: false, appendError: action.error }
    default:
      return state
  }
}
