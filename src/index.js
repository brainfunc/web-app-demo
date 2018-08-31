import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Home from './components/home';
import Web3ProviderBase from './components/web3providerbase';

import reducers from './reducers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/my_collectibles" component={Web3ProviderBase}/>
        <Route path="/marketplace" component={Web3ProviderBase}/>
        <Route path="/battleground" component={Web3ProviderBase}/>
        <Route path="/library" component={Web3ProviderBase}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.app__container'));
