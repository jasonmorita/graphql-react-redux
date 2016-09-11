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
        dispatch(startingRequest());
        return new Promise(function(resolve, reject) {
            let request=new XMLHttpRequest();
            request.open("POST", "http://localhost:5000", true);
            request.setRequestHeader("Content-Type",
            "application/graphql");
            request.send(payload);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    resolve(request.responseText)
                }
            }
        }).then(response => {
            dispatch(finishedRequest());
            dispatch(updateCharacter(JSON.parse(response)));
        })
    }
}
