import { createContext, useReducer } from 'react';
import fokifyReducer from './ForkifyReducer';
import useLocalStorage from '../../hooks/useLocalStorage';

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
    showResaults: false,
    showPage: false,
    isBookmarked: false,
  }

  const [state, dispatch] = useReducer(fokifyReducer, initialState)

  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', state.bookmarkedRecipesData);

  return (
    <ForkifyContext.Provider
      value={{
        ...state,
        dispatch,
        bookmarks,
        setBookmarks
      }}
    >
      {children}
    </ForkifyContext.Provider>
  )
}

export default ForkifyContext