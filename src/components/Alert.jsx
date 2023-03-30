import { useContext } from "react"
import AlertContext from "../context/alert/AlertContext"
import icons from "../assets/svg/icons.svg"

function Error() {
  const { alert } = useContext(AlertContext)

  return (
    <div className="error">
      <div>
        <svg>
          <use href={`${icons}#icon-alert-${!alert.type ? "triangle" : "circle"}`}></use>
        </svg>
      </div>
      <p>{alert.msg}</p>
    </div>
  )
}

export default Error