import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
// Store
import createStore from './store'
// Service worker
import registerServiceWorker from './registerServiceWorker'
// Components
import App from './App'
// Layout
import './index.css'

ReactDOM.render(
  <StoreProvider store={createStore()}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
)

registerServiceWorker()
