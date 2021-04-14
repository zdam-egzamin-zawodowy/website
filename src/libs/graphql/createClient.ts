import { GraphQLClient } from 'graphql-request';

const getApiURI = () => {
  return (
    (typeof window === 'undefined' && process.env.BUILDING_PROCESS !== 'true'
      ? process.env.SERVER_API_URI
      : process.env.NEXT_PUBLIC_API_URI) ?? 'http://localhost:8080/graphql'
  );
};

export const createClient = (uri = getApiURI()): GraphQLClient => {
  return new GraphQLClient(uri);
};
