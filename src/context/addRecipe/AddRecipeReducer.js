const AddRecipeReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADD_FORM": return {
      ...state,
      showAddForm: action.payload,
    }
    default: return state
  }
}

export default AddRecipeReducer