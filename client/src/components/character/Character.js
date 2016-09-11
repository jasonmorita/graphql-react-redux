import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../../actions/character.js';
import get from 'lodash.get';

const query = `
    query Person {
        person(id: "7") {
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

let Character = React.createClass({
    componentDidMount() {
        this.props.dispatch(getGraph(query));
    },
    render() {
        let fetching = this.props.store.character.fetching;
        let name = get(this.props.store.character, 'character.name');

        if (fetching) {
            return (
                <div>
                    <p>Fetching your data...</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>{ name }</h3>
                    <h3>Vehicles:</h3>
                    <ul>
                    </ul>
                </div>
            )
        }
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
