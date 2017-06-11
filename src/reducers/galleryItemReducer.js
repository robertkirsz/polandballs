import api from '../api'

export const FETCH_GALLERY_ITEM_REQUEST = 'FETCH_GALLERY_ITEM_REQUEST'
export const FETCH_GALLERY_ITEM_SUCCESS = 'FETCH_GALLERY_ITEM_SUCCESS'
export const FETCH_GALLERY_ITEM_FAIL = 'FETCH_GALLERY_ITEM_FAIL'
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAIL = 'FETCH_COMMENTS_FAIL'

export const fetchGalleryItem = id => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_GALLERY_ITEM_REQUEST })

    api.getItemInfo(id)
      .then(item => {
        dispatch({ type: FETCH_GALLERY_ITEM_SUCCESS, item })
        resolve()
      })
      .catch(error => {
        dispatch({ type: FETCH_GALLERY_ITEM_FAIL, error })
        reject()
      })
  })

export const fetchComments = id => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_COMMENTS_REQUEST })

    api.getComments(id)
      .then(comments => {
        dispatch({ type: FETCH_COMMENTS_SUCCESS, comments })
        resolve()
      })
      .catch(error => {
        dispatch({ type: FETCH_COMMENTS_FAIL, error })
        reject()
      })
  })

export const galleryItemActions = { fetchGalleryItem, fetchComments }

const initialState = {
  item: {},
  comments: [],
  loading: false,
  loaded: false,
  error: null,
  commentsLoading: false,
  commentsLoaded: false,
  commentsError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GALLERY_ITEM_REQUEST:
      return { ...state, loading: true, loaded: false, error: null }
    case FETCH_GALLERY_ITEM_SUCCESS:
      return { ...state, loading: false, loaded: true, item: action.item }
    case FETCH_GALLERY_ITEM_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error }
    case FETCH_COMMENTS_REQUEST:
      return { ...state, commentsLoading: true, commentsLoaded: false, commentsError: null }
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, commentsLoading: false, commentsLoaded: true, comments: action.comments }
    case FETCH_COMMENTS_FAIL:
      return {
        ...state,
        commentsLoading: false,
        commentsLoaded: false,
        commentsError: action.error
      }
    default:
      return state
  }
}
