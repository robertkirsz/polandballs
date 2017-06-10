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
