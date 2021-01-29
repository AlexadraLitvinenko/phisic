import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from "apollo-link-http";

const API = 'https://api-eu-central-1.graphcms.com/v2/ckh22f6jb0ae401xx524wgeap/master';

const httpLink = createHttpLink({
  uri: API
});
    
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
    });

ReactDOM.render(
  <ApolloProvider  client = { client }>
  <App/>
  </ApolloProvider>,
  document.getElementById('root')
);