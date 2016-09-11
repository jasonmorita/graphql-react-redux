import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../../actions/character.js';

const query = `
    person(id: "5") {
        name
        url
        vehicles {
            name
        }
        films {
            title
        }
        species {
            name
        }
        entity {
            image
        }
    }
`;

let Character = React.createClass({
  componentDidMount() {
    this.props.dispatch(getGraph(query));
  },
  render() {
    let dispatch = this.props.dispatch;
    // let fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    let goldberg = this.props.store.get('character').toObject();
    return (
      <div>
        // <p>Fetch in progress: {fetching}</p>
        <h3>{ character.name }</h3>
        <input ref={node => {queryText = node}}></input>
        <button onClick={() => {dispatch(getGraph(queryText.value))}}>
          query
        </button>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const CharacterContainer = connect(
  mapStateToProps
)(Character);
