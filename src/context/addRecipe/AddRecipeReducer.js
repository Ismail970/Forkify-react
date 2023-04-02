const AddRecipeReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ADD_FORM":
      return true
    case "HIDE_ADD_FORM":
      return false
    default:
      return state
  }
}

export default AddRecipeReducer