import styled from 'styled-components'

const Comment = styled.div`
  position: relative;
  &:not(:first-of-type) { margin-top: 16px; }
  & & {
    margin-left: 8px;
    @media (min-width: 600px) {
      margin-left: 24px;
    }
  }

  .header {
    font-size: 0.8em;
    @media (min-width: 600px) {
      font-size: 0.9em;
    }
    + button {
      position: absolute;
      top: 0;
      right: 0;
      width: 32px;
      height: 32px;
      @media (min-width: 600px) {
        width: 48px;
        height: 48px;
      }
    }
  }

  .content { padding: 8px; }

  .message {
    margin: 0;
    padding: 8px 0;
  }
`

export default Comment
