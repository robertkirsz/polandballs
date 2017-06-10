import { getItemInfo } from '../api'

export const FETCH_GALLERY_ITEM_REQUEST = 'FETCH_GALLERY_ITEM_REQUEST'
export const FETCH_GALLERY_ITEM_SUCCESS = 'FETCH_GALLERY_ITEM_SUCCESS'
export const FETCH_GALLERY_ITEM_FAIL = 'FETCH_GALLERY_ITEM_FAIL'

export const fetchGalleryItem = id => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_GALLERY_ITEM_REQUEST })

    getItemInfo(id)
      .then(item => {
        dispatch({ type: FETCH_GALLERY_ITEM_SUCCESS, item })
        resolve()
      })
      .catch(error => {
        dispatch({ type: FETCH_GALLERY_ITEM_FAIL, error })
        reject()
      })
  })

export const galleryItemActions = { fetchGalleryItem }

const initialState = {
  item: {},
  loading: false,
  loaded: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GALLERY_ITEM_REQUEST:
      return { ...state, loading: true, loaded: false, error: null }
    case FETCH_GALLERY_ITEM_SUCCESS:
      return { ...state, loading: false, loaded: true, item: action.item }
    case FETCH_GALLERY_ITEM_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error }
    default:
      return state
  }
}
