import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';

// const httpLink = createHttpLink({
//   uri: 'https://34.70.203.107:8000/graphql/',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
  uri: 'https://34.70.203.107:8000/graphql/',
  cache: new InMemoryCache()
});

const VERIFY_TOKEN = gql`
mutation VerifyToken($token: String) {
  verifyToken (token: $token){
    payload
  }
}
`;

client
  .mutate({
    mutation: VERIFY_TOKEN,
    variables: {token: localStorage.getItem("token")}
  })
  .then(result => console.log(result));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
