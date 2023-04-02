import { createContext, useReducer } from 'react';
import addRecipeReducer from './AddRecipeReducer';

const AddRecipeContext = createContext()

export const AddRecipeProvider = ({ children }) => {
  const initialState = false

  const [state, dispatch] = useReducer(addRecipeReducer, initialState)

  return (
    <AddRecipeContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  )
}

export default AddRecipeContext