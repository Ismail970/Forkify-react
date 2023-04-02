import { createContext, useReducer } from 'react';
import addRecipeReducer from './AddRecipeReducer';

const AddRecipeContext = createContext()

export const AddRecipeProvider = ({ children }) => {
  const initialState = false

  const [state, dispatch] = useReducer(addRecipeReducer, initialState)

  const MODEL_CLOSE_SEC = import.meta.env.VITE_MODEL_CLOSE_SEC
  const hideAddForm = () => {
    setTimeout(() => dispatch({ type: "HIDE_ADD_FORM" }), MODEL_CLOSE_SEC * 1000)
  }

  return (
    <AddRecipeContext.Provider value={{
      showAddForm: state,
      dispatch,
      hideAddForm
    }}>
      {children}
    </AddRecipeContext.Provider>
  )
}

export default AddRecipeContext