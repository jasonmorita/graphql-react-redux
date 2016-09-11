import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers.js";
import thunkMiddleware from "redux-thunk";
import compose from 'lodash.compose';

import { QueryContainer } from "./components/character/Query.js";

let store = createStore(reducer, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

const Main = () => {
  return (
    <div>
      <QueryContainer />
    </div>
  )
};

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
