import styled from 'styled-components'
import Paper from 'material-ui/Paper'

const SearchForm = styled(Paper)`
  width: 100%;
  max-width: 300px;
  margin: 16px auto 0;
  padding: 8px;
  cursor: text;

  form { display: flex; }

  input {
    width: 100%;
    margin-left: 4px;
    padding: 4px;
    border: none;
    border-radius: 4px;
    outline: none;
    &:focus { border: 1px solid #ccc; }
  }
`

export default SearchForm
