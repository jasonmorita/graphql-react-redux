import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers.js";
import thunkMiddleware from "redux-thunk";
import compose from 'lodash.compose';

import { CharacterContainer } from "./components/character/Character.js";

let store = createStore(reducer, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
  <Provider store={store}>
    <CharacterContainer />
  </Provider>,
  document.getElementById('root')
);
