const initialState = { fetching: false, character: {} };

const character = function character(state = initialState, action) {
    switch (action.type) {
        case "REQUEST_START":
            return Object.assign({}, state, { fetching: true });
        case "REQUEST_END":
            return Object.assign({}, state, { fetching: false });
        case "UPDATE_CHARACTER":
            return Object.assign({}, state, { character: action.payload.person });
        default:
            return state;
    }
}

export default character;
