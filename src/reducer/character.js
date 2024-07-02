
// Filters Reducer

export const characterInitialState = {
    characterArr: [],
    peopleArr: [],
    peopleFilm: []

};
export const characterReducer = (state = characterInitialState, action) => {
    switch (action.type) {
        case 'SET_CHARACTERS_ARRAY':
            return {
                ...state,
                characterArr: action.payload
            };
        case 'SET_CHARACTER_ARRAY':
            return {
                ...state,
                peopleArr: action.payload
            };    
        case 'SET_CHARACTER_FILM':
            return {
                ...state,
                peopleFilm: [...state.peopleFilm, action.payload]
            };   
        case 'SET_CHARACTER_FILM_EMPTY':
            return {
                ...state,
                peopleFilm: action.payload
            };         
        default: return state

    }
}