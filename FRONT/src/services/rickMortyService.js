import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';


const restLink = new RestLink({
  uri: 'https://rickandmortyapi.com/api/',
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export default client;
