import { combineReducers } from "redux";

import {characterInitialState, characterReducer } from "./character";


export const InitalState = {
    character: characterInitialState,
    
}

export const rootReducer = combineReducers({
    character: characterReducer,
})