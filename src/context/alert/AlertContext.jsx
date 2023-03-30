import { createContext, useReducer, useState } from 'react';
import alertReducer from "./AlertReducer"

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const [searchErr, setSearchErr] = useState(false)
  const [pageErr, setPageErr] = useState(false)
  const [uploadAlert, setUploadAlert] = useState(false)

  const setAlert = (msg = "No recipes found for your query. Please try again!", type = false) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    })
  }

  return (
    <AlertContext.Provider value={{
      alert: state,
      searchErr,
      pageErr,
      uploadAlert,
      setSearchErr,
      setPageErr,
      setUploadAlert,
      setAlert,
    }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext