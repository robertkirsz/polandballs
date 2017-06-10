import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Components
import Navbar from './Navbar'
import { GalleryPage } from '../routes'
// Layout
import StyledApp from '../styled/App'

const App = () =>
  <Router>
    <StyledApp>
      <Navbar />
      <Route exact path="/" component={GalleryPage} />
    </StyledApp>
  </Router>

export default App
