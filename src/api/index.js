import { request } from '../utils'

const clientId = 'ce0047b3e0f17c3'
const headers = new Headers({ Authorization: `Client-ID ${clientId}` })
const get = { method: 'GET', headers }

export const getGalleryByTag = (
  tag = 'polandball',
  { sort = 'viral', date = 'week', page = 0 } = {}
) => request('Get gallery', `https://api.imgur.com/3/gallery/t/${tag}/${sort}/${date}/${page}`, get)

export const getItemInfo = id =>
  request('Get item info', `https://api.imgur.com/3/gallery/${id}`, get)

export const getComments = (id, { sortBy = 'best' } = {}) =>
  request('Get comments', `https://api.imgur.com/3/gallery/${id}/comments/${sortBy}`, get)

export const getUserGallery = (id, { page = 0 } = {}) =>
  request("Get user's gallery", `https://api.imgur.com/3/account/${id}/submissions/${page}`, get)
