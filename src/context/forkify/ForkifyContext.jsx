import { createContext, useReducer } from 'react';
import fokifyReducer from './ForkifyReducer';

const ForkifyContext = createContext()

export const ForkifyProvider = ({ children }) => {
  const initialState = {
    id: "",
    query: "",
    recipeData: [],
    currentRecipeData: {},
    bookmarkedRecipesData: [],
    servings: null,
    pagination: 1,
    showPagBtns: false,
    isLoading: false,
    showPage: false,
    isBookmarked: false,
    error: false,
  }

  const [state, dispatch] = useReducer(fokifyReducer, initialState)

  return (
    <ForkifyContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </ForkifyContext.Provider>
  )
}

export default ForkifyContext