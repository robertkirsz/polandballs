import { getGalleryByTag, getUserGallery } from '../api'
import { addThumbs } from '../utils'

export const FETCH_GALLERY_REQUEST = 'FETCH_GALLERY_REQUEST'
export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS'
export const FETCH_GALLERY_FAIL = 'FETCH_GALLERY_FAIL'

export const fetchGallery = () => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_GALLERY_REQUEST })

    getGalleryByTag('polandball')
      .then(response => {
        dispatch({ type: FETCH_GALLERY_SUCCESS, items: addThumbs(response.items) })
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

    getUserGallery(id)
      .then(items => {
        dispatch({
          type: FETCH_GALLERY_SUCCESS,
          items: addThumbs(items.filter(item => !!item.tags.find(tag => tag.name === 'polandball')))
        })
        resolve()
      })
      .catch(error => {
        dispatch({ type: FETCH_GALLERY_FAIL, error })
        reject()
      })
  })

export const galleryActions = { fetchGallery, fetchUserGallery }

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  items: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GALLERY_REQUEST:
      return { ...state, loading: true, loaded: false, error: null }
    case FETCH_GALLERY_SUCCESS:
      return { ...state, loading: false, loaded: true, items: action.items }
    case FETCH_GALLERY_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error }
    default:
      return state
  }
}
