import React, { createContext, useContext, useMemo, useReducer } from "react"
import { InitalState, rootReducer } from "../reducer"


export const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const [State, dispatch] = useReducer(rootReducer, InitalState)

    const contextValue = useMemo(() => {
        return { State, dispatch }
    }, [State, dispatch])


    return (
        <AppContext.Provider value={contextValue} >{children}</AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)