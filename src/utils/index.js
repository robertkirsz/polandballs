export const truncate = (string, length = 80) =>
  string && string.length > length ? string.substring(0, length).trim() + '...' : string

export const addThumbs = items =>
  items.map(item => {
    item.thumb = `https://i.imgur.com/${item.cover || item.id}_d.jpg?maxwidth=320&shape=thumb&fidelity=low` // eslint-disable-line
    return item
  })

export const handleErrors = response => {
  if (!response.ok) throw Error(response.statusText)
  return response
}

export const request = (name, url, options) =>
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => (json.success ? resolve(json.data) : reject(json.data.error.message)))
      .catch(error => {
        console.log(`${name} error =>`, error)
        reject(error.message)
      })
  })
