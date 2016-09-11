import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../../actions/character.js';

const query = `
    query Person {
      person(id: "15") {
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
    }
`;

let Query = React.createClass({
  componentDidMount() {
    this.props.dispatch(getGraph(query));
  },
  render() {
    let character = this.props.store.character;
    return (
      <div>
        <h3>{ character.name }</h3>
        <h3>Vehicles:</h3>
        <ul>
        </ul>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    store: state.character
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);
