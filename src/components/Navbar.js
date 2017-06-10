import React from 'react'
// Layout
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const Navbar = () =>
  <AppBar>
    <Toolbar>
      <Typography type="title" colorInherit>
        Polandballs
      </Typography>
    </Toolbar>
  </AppBar>

export default Navbar
