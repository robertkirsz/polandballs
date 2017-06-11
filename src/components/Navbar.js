import React from 'react'
import Logo from '../assets/polandball.png'
// Components
import { Link } from 'react-router-dom'
// Layout
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Avatar from 'material-ui/Avatar'

const Navbar = () =>
  <AppBar>
    <Toolbar>
      <Link to="/" style={{ margin: 'auto' }}>
        <Avatar alt="Polandball logo" src={Logo} />
      </Link>
    </Toolbar>
  </AppBar>

export default Navbar
