import character from './character';

var reducer = function(state, action) {
    return {
        // each reducer should only receive its slice of state
        character: character(state, action)
    };
};

export default reducer;
