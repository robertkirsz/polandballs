// Truncates a string and add ellipsis to its end
export const truncate = (string, length = 80) =>
  string && string.length > length ? string.substring(0, length).trim() + '...' : string

// Adds thumbnail URL to a gallery item
export const addThumbs = items =>
  items.map(item => {
    item.thumb = `https://i.imgur.com/${item.cover || item.id}_d.jpg?maxwidth=320&shape=thumb&fidelity=low` // eslint-disable-line
    return item
  })

// Checks for errors before converting a response to JSON
export const handleErrors = response => {
  if (!response.ok) throw Error(response.statusText)
  return response.json()
}

// Base for API request functions
export const request = (name, url, options) =>
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(handleErrors)
      .then(json => (json.success ? resolve(json.data) : reject(json.data.error.message)))
      .catch(error => {
        console.log(`${name} error =>`, error)
        reject(error.message)
      })
  })

// Filters gallery items by 'polandball' tabe
export const onlyPolandballs = items =>
  items.filter(item => !!item.tags.find(tag => tag.name === 'polandball'))
