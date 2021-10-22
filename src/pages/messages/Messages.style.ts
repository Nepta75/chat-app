import styled from 'styled-components';
import { maxWidth } from '../../themes/breakpoints';

export default styled.div`
  display: flex;
  height: calc(100vh - 80px);
  padding: 50px 0;

  ${maxWidth('md')} {
    padding: 20px 0;
    height: calc(100vh - 56px);
    flex-direction: column;
  }

  .item {
    box-shadow: 0px 0px 6px -1px #000000;
    padding: 10px;
    border-radius: 10px;
    margin: 0 10px 10px 0;

    ${maxWidth('md')} {
      margin: ${({ hasSelectedConversation }) => !hasSelectedConversation ? '0 0 10px 0' : '0 10px 0 0'};
    }

    &--active {
      background-color: #ff6e14;
      color: white;
    }
  }

  .conversations-container {
    width: ${({ hasSelectedConversation }) => !hasSelectedConversation ? '100%' : '30%'};
    overflow-y: auto;
    padding: 20px;
    ${({ hasSelectedConversation }) => !hasSelectedConversation ? 'flex-direction: column;' : ''}

    ${maxWidth('md')} {
      display: flex;
      width: 100%;
      overflow-y: none;

      .date {
        display: ${({ hasSelectedConversation }) => !hasSelectedConversation ? 'block' : 'none'};
      }
    }


    img {
      width: 50px;
      height: auto;
    }
  }

  .messageview-container {
    box-shadow: 0px 0px 6px -1px #000000;
    width: 70%;

    ${maxWidth('md')} {
      height: calc(100vh - 260px);
      margin-top: 20px;
      width: 100%;
    }
  }
`;