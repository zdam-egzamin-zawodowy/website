import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

let client: ApolloClient<NormalizedCacheObject> | undefined;

const getApiURI = () => {
  return (
    (typeof window === 'undefined'
      ? process.env.SERVER_API_URI
      : process.env.NEXT_PUBLIC_API_URI) ?? 'http://localhost:8080/graphql'
  );
};

export interface CreateClientOpts {
  uri?: string;
  data?: NormalizedCacheObject;
}

const createClient = ({
  uri = getApiURI(),
  data,
}: CreateClientOpts = {}): ApolloClient<NormalizedCacheObject> => {
  const ssrMode = typeof window === 'undefined';
  if (!ssrMode && client) {
    if (data) {
      client.cache.restore(data);
    }
    return client;
  }

  const _client = new ApolloClient({
    queryDeduplication: true,
    cache: new InMemoryCache().restore(data ?? {}),
    ssrMode,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (process.env.NODE_ENV === 'development') {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }
      }),
      new HttpLink({ uri }),
    ]),
  });

  if (ssrMode) return _client;
  client = _client;
  return client;
};

export default createClient;
