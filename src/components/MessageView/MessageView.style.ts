import styled from 'styled-components';
import { maxWidth } from '../../themes/breakpoints';

export const StyledContainer = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  position: relative;

  .container {
    height: 100%;
    overflow-y: auto;
    padding: 20px;

    ${maxWidth('md')} {
      padding: 10px;
      width: 100%;
    }
  }

  .message-container {
    display: flex;

    .label-message {
      div {
        width: max-content;
        color: #fff;
        padding: 4px 15px;
        border-radius: 10px;

        ${maxWidth('md')} {
          width: auto;
          padding: 4px 15px;
        }

        .date-message {
          color: grey
        }
      }
    }

    .message {
      padding: 5px 0 20px 0;
    }

    &--user {
      justify-content: end;
      text-align: right;

      .label-message {
        display: flex;
        justify-content: end;

        div {
          background-color: #ff6e14;
        }
      }
    }

    &--user2 {
      .label-message {
        div {
          background-color: #212529;
        }
      }
    }
  }


  .bottom-container {
    height: 50px;
    display: flex;
    width: 100%;


    textarea {
      width: 100%;
    }

    button {
      width: 300px;
    }
  }
`