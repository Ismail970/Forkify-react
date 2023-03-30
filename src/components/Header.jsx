import { useContext } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import AddRecipeContext from "../context/addRecipe/AddRecipeContext"
import AlertContext from '../context/alert/AlertContext'
import logo from "../assets/img/logo.png"
import icons from "../assets/svg/icons.svg"
import SearchRecipe from './SearchRecipe'
import RecipePreview from './RecipesPreview'

function Header() {
  const { bookmarkedRecipesData } = useContext(ForkifyContext)
  const { dispatch } = useContext(AddRecipeContext)
  const { setUploadAlert } = useContext(AlertContext)

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo"
        className="header__logo"
      />

      <SearchRecipe />

      <nav className="nav">
        <ul className="nav__list">
          <li
            className="nav__item"
            onClick={() => {
              dispatch({ type: "SET_ADD_FORM", payload: true })
              setUploadAlert(false)
            }}
          >
            <button className="nav__btn nav__btn--add-recipe">
              <svg className="nav__icon">
                <use href={`${icons}#icon-edit`}></use>
              </svg>
              <span>Add recipe</span>
            </button>
          </li>

          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <svg className="nav__icon">
                <use href={`${icons}#icon-bookmark`}></use>
              </svg>
              <span>Bookmarks</span>
            </button>
            <div className="bookmarks">
              <ul className="bookmarks__list">

                {bookmarkedRecipesData.length === 0
                  ? <div className="message">
                    <div>
                      <svg>
                        <use href={`${icons}#icon-smile`}></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>
                  : bookmarkedRecipesData.map(recipe => (
                    <RecipePreview key={recipe.id} recipeData={recipe} />
                  ))}

              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
