import { createContext, useReducer } from 'react';
import alertReducer from "./AlertReducer"

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = {
    alert: null,
    searchErr: false,
    pageErr: false,
    uploadAlert: false,
  }

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (msg = "No recipes found for your query. Please try again!", type = false) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    })
  }

  return (
    <AlertContext.Provider value={{
      ...state,
      dispatch,
      setAlert
    }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext