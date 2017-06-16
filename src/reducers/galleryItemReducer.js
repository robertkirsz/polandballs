import api from '../api'

// ACTION TYPES

export const FETCH_GALLERY_ITEM_REQUEST = 'FETCH_GALLERY_ITEM_REQUEST'
export const FETCH_GALLERY_ITEM_SUCCESS = 'FETCH_GALLERY_ITEM_SUCCESS'
export const FETCH_GALLERY_ITEM_FAIL = 'FETCH_GALLERY_ITEM_FAIL'
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAIL = 'FETCH_COMMENTS_FAIL'

// ACTIONS

export const fetchGalleryItem = id => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    dispatch({ type: FETCH_GALLERY_ITEM_REQUEST })

    api
      .getItemInfo(id)
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

    api
      .getComments(id)
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

// REDUCER

const ACTION_HANDLERS = {
  [FETCH_GALLERY_ITEM_REQUEST]: (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  }),
  [FETCH_GALLERY_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    item: action.item
  }),
  [FETCH_GALLERY_ITEM_FAIL]: (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error
  }),
  [FETCH_COMMENTS_REQUEST]: (state, action) => ({
    ...state,
    commentsLoading: true,
    commentsLoaded: false,
    commentsError: null
  }),
  [FETCH_COMMENTS_SUCCESS]: (state, action) => ({
    ...state,
    commentsLoading: false,
    commentsLoaded: true,
    comments: action.comments
  }),
  [FETCH_COMMENTS_FAIL]: (state, action) => ({
    ...state,
    commentsLoading: false,
    commentsLoaded: false,
    commentsError: action.error
  })
}

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

export default (state = initialState, action) => ACTION_HANDLERS[action.type]
  ? ACTION_HANDLERS[action.type](state, action)
  : state
