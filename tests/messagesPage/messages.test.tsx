import renderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import Messages from "../../src/pages/index";
import { userQuery } from '../../src/apollo/user/query';
import { InMemoryCache } from '@apollo/client';
import { User } from '../../src/types/user'
import { Conversation } from '../../src/types/conversation'

const user: User = {
  "id": 1,
  "nickname": "Thibaut",
  "password": "123",
  "token": "xxxx"
};

const cache = new InMemoryCache().restore({
  ROOT_QUERY: {
    user,
  },
});

const MOCK_CONVERSATIONS: Array<Conversation> =  [
  {
    "id": 1,
    "recipientId": 2,
    "recipientNickname": "Jeremie",
    "senderId": 1,
    "senderNickname": "Thibaut",
    "lastMessageTimestamp": 1625637849
  },
  {
    "id": 2,
    "recipientId": 3,
    "recipientNickname": "Patrick",
    "senderId": 1,
    "senderNickname": "Thibaut",
    "lastMessageTimestamp": 1620284667
  },
  {
    "id": 3,
    "recipientId": 1,
    "recipientNickname": "Thibaut",
    "senderId": 4,
    "senderNickname": "Elodie",
    "lastMessageTimestamp": 1625648667
  }
];

const mocks = [
  {
    request: {
      query: userQuery,
    },
    result: { data: { user } },
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_CONVERSATIONS),
  }),
) as jest.Mock;

describe('message page', () => {
  test('Should render correctly with user and conversations mocked data', async () => {
    let component;
    await act(async () => {
      component = renderer.create(
        <MockedProvider cache={cache} mocks={mocks}>
          <Messages />
        </MockedProvider>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
