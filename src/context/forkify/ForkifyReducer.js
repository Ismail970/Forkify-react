const FokifyReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_RECIPES": return {
      ...state,
      recipeData: action.payload,
      query: "",
      showPagBtns: true
    }
    case "HIDE_RECIPES": return {
      ...state,
      recipeData: [],
      showPagBtns: false
    }
    case "SET_QUERY": return {
      ...state,
      query: action.payload
    }
    case "SET_SHOW_RESAULTS": return {
      ...state,
      showResaults: action.payload
    }
    case "SET_IS_BOOKMARKED": return {
      ...state,
      isBookmarked: action.payload
    }
    case "SET_RECIPE": return {
      ...state,
      currentRecipeData: action.payload,
      showPage: true
    }
    case "HIDE_PAGE": return {
      ...state,
      showPage: false,
    }
    case "SET_ID": return {
      ...state,
      id: action.payload,
    }
    case "SET_BOOKMARKED_RECIPES": return {
      ...state,
      bookmarkedRecipesData: action.payload,
    }
    case "UPDATE_SERVINGS": return {
      ...state,
      servings: action.payload,
    }
    case "SET_PAGINATION": return {
      ...state,
      pagination: action.payload,
    }
    default: return state
  }
}

export default FokifyReducer