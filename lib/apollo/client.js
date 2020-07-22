import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { WIKI_API_URL } from '../constants';

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: WIKI_API_URL,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}
