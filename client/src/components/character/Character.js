import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from './character-actions.js';
import get from 'lodash.get';

const query = `
    query Person {
        person(id: "1") {
            name
            url
            entity {
                abstract
                image
            }
            vehicles {
                name
            }
            films {
                title
            }
            species {
                name
            }
        }
    }
`;

let Character = React.createClass({
    componentDidMount() {
        this.props.dispatch(getGraph(query));
    },
    render() {
        let character = this.props.store.character;
        let fetching = character.fetching;
        let name = get(character, 'character.name');

        let entity = get(character, 'character.entity');

        let filmList = get(character, 'character.films', [])
            .map((film, i) => <li key={i}>{ film.title }</li>);

        let speciesList = get(character, 'character.species', [])
            .map((species, i) => <li key={i}>{ species.name }</li>);

        let vehicleList = get(character, 'character.vehicles', [])
            .map((vehicle, i) => <li key={i}>{ vehicle.name }</li>);

        let fetchingMarkup = (
            <div>
                <p>Fetching your data...</p>
            </div>
        );

        if (fetching) {
            return fetchingMarkup;
        } else {
            return (
                <div>
                    <h2>{ name }</h2>

                    {(() => {
                        if (get(entity, 'image')) {
                            return (
                                <img alt={name} src={entity.image} />
                            )
                        }
                    })()}

                    {(() => {
                        if (get(entity, 'abstract')) {
                            return (
                                <p>
                                    {entity.abstract}
                                </p>
                            )
                        }
                    })()}

                    {(() => {
                        if (speciesList.length > 0) {
                            return (
                                <div>
                                    <h3>Species:</h3>
                                    <ul>{speciesList}</ul>
                                </div>
                            )
                        }
                    })()}

                    {(() => {
                        if (filmList.length > 0) {
                            return (
                                <div>
                                    <h3>Films:</h3>
                                    <ul>{filmList}</ul>
                                </div>
                            )
                        }
                    })()}

                    {(() => {
                        if (vehicleList.length > 0) {
                            return (
                                <div>
                                    <h3>Vehicles:</h3>
                                    <ul>{vehicleList}</ul>
                                </div>
                            )
                        }
                    })()}
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
