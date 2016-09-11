import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../../actions/character.js';
import get from 'lodash.get';

const query = `
query Person {
    person(id: "1") {
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
        let fetching = this.props.store.character.fetching;
        let name = get(this.props.store.character, 'character.name');

        return (
            <div>
                <p>Fetching: {fetching}</p>
                <h3>{ name }</h3>
                <h3>Vehicles:</h3>
                <ul>
                </ul>
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
