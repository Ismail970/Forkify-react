import { useContext } from 'react'
import AddRecipeContext from "../context/addRecipe/AddRecipeContext"
import AlertContext from '../context/alert/AlertContext'
import icons from "../assets/svg/icons.svg"
import BookmarkRecipe from "./BookmarkRecipe"

function Nav() {
  const { dispatch } = useContext(AddRecipeContext)
  const { dispatch: alertDispatch } = useContext(AlertContext)

  const onClick = () => {
    dispatch({ type: "SET_ADD_FORM", payload: true })
    alertDispatch({ type: "SET_UPLOAD_ALERT", payload: false })
  }

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item"
          onClick={onClick} >
          <button className="nav__btn nav__btn--add-recipe">
            <svg className="nav__icon">
              <use href={`${icons}#icon-edit`}></use>
            </svg>
            <span>Add recipe</span>
          </button>
        </li>
        <BookmarkRecipe />
      </ul>
    </nav>
  )
}

export default Nav
