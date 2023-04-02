const AddRecipeReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADD_FORM":
      return action.payload

    default: return state
  }
}

export default AddRecipeReducer