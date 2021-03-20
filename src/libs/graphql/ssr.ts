import { isPlainObject } from 'lodash';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (isPlainObject(pageProps)) {
    pageProps[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
};

export const getApolloState = (
  pageProps: any
): NormalizedCacheObject | undefined => {
  if (pageProps[APOLLO_STATE_PROP_NAME]) {
    return pageProps[APOLLO_STATE_PROP_NAME];
  }
  return undefined;
};
