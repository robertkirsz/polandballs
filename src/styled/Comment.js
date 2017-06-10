import styled from 'styled-components'

const Comment = styled.div`
  position: relative;
  &:not(:first-of-type) { margin-top: 16px; }
  & & { margin-left: 24px; }

  .header { font-size: 0.9em; }

  .content { padding: 8px; }

  .message {
    margin: 0;
    padding: 8px 0;
  }
`

export default Comment
