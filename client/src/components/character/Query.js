import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../../actions/character.js';

let Query = React.createClass({
  componentDidMount() {
    this.props.dispatch(getGraph("{person(id: 2) {name}}"));
  },
  render() {
    let dispatch = this.props.dispatch;
    let fetching = String(this.props.store.get('fetching'));
    let queryText;
    let goldberg = this.props.store.get('character').toObject();
    return (
      <div>
        <p>Fetch in progress: {fetching}</p>
        <h3>{ goldberg.name }</h3>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);
