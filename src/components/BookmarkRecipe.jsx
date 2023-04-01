import { useContext, useEffect } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"
import RecipePreview from './RecipesPreview'

function BookmarkRecipe() {
  const { bookmarkedRecipesData, bookmarks, id, dispatch } = useContext(ForkifyContext)

  useEffect(() => {
    const isBookmarked = bookmarkedRecipesData.some(bookmark => bookmark.id === id);
    dispatch({ type: "SET_BOOKMARK", payload: isBookmarked });
  }, [])

  useEffect(() => {
    dispatch({ type: "SET_BOOKMARKED_RECIPES", payload: bookmarks })
  }, [bookmarks])

  return (
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
            : bookmarkedRecipesData.map(bookmark => (
              <RecipePreview key={bookmark.id} recipeData={bookmark} />
            ))}
        </ul>
      </div>
    </li>
  )
}

export default BookmarkRecipe
