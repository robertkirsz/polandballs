import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
// Components
import { Navbar } from './components'
import { GalleryPage, ImagePage } from './routes'
// Layout
import StyledApp from './styled/App'

const App = () =>
  <Router>
    <StyledApp>
      <Navbar />
      <Switch>
        <Route exact path="/" component={GalleryPage} />
        <Route path="/image/:id" component={ImagePage} />
        <Route path="/user/:id" component={GalleryPage} />
        <Route path="/search/:query" component={GalleryPage} />
        <Redirect to="/" />
      </Switch>
    </StyledApp>
  </Router>

export default App
