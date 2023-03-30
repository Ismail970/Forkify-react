const FokifyReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECIPES": return {
      ...state,
      recipeData: action.payload,
    }
    case "SET_QUERY": return {
      ...state,
      query: action.payload
    }
    case "SET_SHOW_RESAULTS": return {
      ...state,
      showResaults: action.payload
    }
    case "SET_BOOKMARK": return {
      ...state,
      isBookmarked: action.payload
    }
    case "SET_RECIPE": return {
      ...state,
      currentRecipeData: action.payload,
    }
    case "SET_PAGE": return {
      ...state,
      showPage: action.payload,
    }
    case "SET_ID": return {
      ...state,
      id: action.payload,
    }
    case "ADD_BOOKMARKED_RECIPES": return {
      ...state,
      bookmarkedRecipesData: Array.isArray(state.bookmarkedRecipesData) && [...state.bookmarkedRecipesData, action.payload],
    }
    case "REMOVE_BOOKMARKED_RECIPE":
      const updatedBookmarks = state.bookmarkedRecipesData.filter(
        (recipe) => recipe.id !== action.payload
      );
      return {
        ...state,
        bookmarkedRecipesData: updatedBookmarks,
      };
    case "UPDATE_SERVINGS": return {
      ...state,
      servings: action.payload,
    }
    case "SET_PAGINATION": return {
      ...state,
      pagination: action.payload,
    }
    case "SET_SHOW_PAGINATION": return {
      ...state,
      showPagBtns: action.payload,
    }
    default: return state
  }
}

export default FokifyReducer