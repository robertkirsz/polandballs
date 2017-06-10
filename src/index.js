import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'
// Components
import App from './components/App'
// Layout
import './index.css'

const store = configureStore()

ReactDOM.render(
  <StoreProvider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
)

registerServiceWorker()
