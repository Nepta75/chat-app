import styled from 'styled-components';
import { maxWidth } from '../../themes/breakpoints'

export const StyledContainer = styled.div`

  .navbar-brand {
    margin-right: 16px;
  }

  .navbar-nav {
    width: 100%;
    justify-content: space-between;
  }

  .second-column {
    justify-content: flex-end;
    align-items: center;
    display: flex;

    ${maxWidth('md')} {
      flex-direction: column;
      align-items: start;
    }
  }
  
  .add-btn {
    align-self: center;
    background-color: #ff6e14;
    border-radius: 4px;
    color: #fff;
    height: 4rem;
    margin-right: 1rem;
    transition: background-color .3s;
    border: none;

    ${maxWidth('md')} {
      display: block;
      margin: 10px 0;
      width: 100%;
    }
  }

  a {
    margin: 0 5px;
  }
`