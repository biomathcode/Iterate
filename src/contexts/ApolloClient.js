import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:  "https://journaling-iterate.herokuapp.com/graphql",
  onError: (e) => { console.log(e) },
  cache: new InMemoryCache(),
  
});

export {client};