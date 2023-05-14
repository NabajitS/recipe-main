import { createContext } from "react";
import { useReducer } from 'react';

const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RECIPES':
            return { recipes: action.payload }
        case 'CREATE_RECIPES':
            return {
                recipes: [action.payload, ...state.recipes]
            }
    }
}


export const RecipeContext = createContext();

export const RecipesProvider = ({ children }) => {
    const initialState = { recipes: null }
    const [state, dispatch] = useReducer(recipeReducer, initialState)


    return (
        <RecipeContext.Provider value={{ ...state, dispatch }} >
            {children}
        </RecipeContext.Provider>
    )
}

