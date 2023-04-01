const alertReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALERT": return {
      ...state,
      alert: action.payload,
    }
    case "REMOVE_ALERT": return {
      ...state,
      alert: null,
    }
    case "SET_SEARCH_ERROR": return {
      ...state,
      searchErr: action.payload,
    }
    case "SET_PAGE_ERROR": return {
      ...state,
      pageErr: action.payload,
    }
    case "SET_UPLOAD_ALERT": return {
      ...state,
      uploadAlert: action.payload,
    }
    default:
      return state
  }
}

export default alertReducer