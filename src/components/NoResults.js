import React from 'react'
import SadPolandball from '../assets/sad_polandball.png'
import StyledNoResults from '../styled/NoResults'

const NoResults = () =>
  <StyledNoResults>
    <img src={SadPolandball} alt="Sad polandball" />
    <span>No results</span>
  </StyledNoResults>

export default NoResults
