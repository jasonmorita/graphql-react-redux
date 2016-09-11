import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers.js";
import thunkMiddleware from "redux-thunk";
import compose from 'lodash.compose';

// let store = createStore(reducer, compose(
//     applyMiddleware(thunkMiddleware),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

import { QueryContainer } from "./components/character/Query.js";

const Main = () => {
  return (
    <div>
      <QueryContainer />
    </div>
  )
};

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
