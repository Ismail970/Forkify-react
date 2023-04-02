import { createContext, useReducer } from 'react';
import fokifyReducer from './ForkifyReducer';
import useLocalStorage from '../../hooks/useLocalStorage';
import usePagination from '../../hooks/usePagination';

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

  const RES_PER_PAGE = import.meta.env.VITE_RES_PER_PAGE;
  const { visibleItems, numPages } = usePagination(state.recipeData, RES_PER_PAGE, state.pagination)

  return (
    <ForkifyContext.Provider
      value={{
        ...state,
        dispatch,
        bookmarks,
        setBookmarks,
        visibleItems, numPages
      }}
    >
      {children}
    </ForkifyContext.Provider>
  )
}

export default ForkifyContext