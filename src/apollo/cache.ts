import { makeVar, InMemoryCache } from '@apollo/client';
import { User } from '../types/user';
export const userVar = makeVar({});
export const setUserVar = (user: User | {}) => userVar(user);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read() {
            return userVar();
          }
        },
      },
    },
  }
});