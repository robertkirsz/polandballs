import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import registerServiceWorker from './registerServiceWorker'
// Components
import App from './components/App'
// Layout
import './index.css'

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker()
