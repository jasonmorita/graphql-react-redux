import 'whatwg-fetch';

const startingRequest = () => {
    return {
        type: "REQUEST_START"
    };
}

const finishedRequest = () => {
    return {
        type: "REQUEST_END"
    };
}

const updateCharacter = (response) => {
    return {
        type: "UPDATE_CHARACTER",
        payload: response
    };
}

export const getGraph = (payload) => {
    return dispatch => {
        let url = `http://localhost:5000?query=${encodeURIComponent(payload)}`;

        dispatch(startingRequest());

        fetch(url)
        .then(res => res.json())
        .then(res => {
            dispatch(finishedRequest());
            dispatch(updateCharacter(res.data));
        })
    }
}
