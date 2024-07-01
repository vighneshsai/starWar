
// Filters Reducer

export const characterInitialState = {
    characterArr: [],
    peopleArr: []

};
export const characterReducer = (state = characterInitialState, action) => {
    switch (action.type) {
        case 'SET_CHARACTERS_ARRAY':
            return {
                characterArr: action.payload
            };
        case 'SET_CHARACTER_ARRAY':
            return {
                peopleArr: action.payload
            };    
        default: return state

    }
}