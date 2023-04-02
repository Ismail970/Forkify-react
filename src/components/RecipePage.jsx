import { useContext, useEffect } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"
import AlertContext from '../context/alert/AlertContext'
import Spinner from './Spinner'
import Alert from './Alert'

function RecipePage() {
  const {
    id,
    showPage,
    currentRecipeData,
    isBookmarked,
    servings,
    bookmarks,
    bookmarkedRecipesData,
    setBookmarks,
    dispatch
  } = useContext(ForkifyContext)

  const { pageErr } = useContext(AlertContext)

  const handleAddBookmark = () => {
    // Toggle bookmark button
    const newBookmarkState = !isBookmarked;
    dispatch({ type: "SET_IS_BOOKMARKED", payload: newBookmarkState })

    // Save bookmarked data to local storage
    let data = [...bookmarks]
    if (newBookmarkState) {
      data.push(currentRecipeData)
    } else {
      data = data.filter(recipe => recipe.id !== currentRecipeData.id)
    }
    setBookmarks(data)
  }

  const handleDecrement = () => servings > 1 && dispatch({ type: "UPDATE_SERVINGS", payload: servings - 1 })

  const handleIncrement = () => dispatch({ type: "UPDATE_SERVINGS", payload: servings + 1 })

  // Set page's bookmark button
  useEffect(() => {
    const isBookmarked = bookmarkedRecipesData.some(bookmark => bookmark.id === id);
    dispatch({ type: "SET_IS_BOOKMARKED", payload: isBookmarked });
  }, [])

  // Save servings of the current page
  useEffect(() => {
    dispatch({ type: "UPDATE_SERVINGS", payload: currentRecipeData.servings })
  }, [currentRecipeData])

  return (
    <div className="recipe">
      {/* Display error if there is */}
      {pageErr && <Alert />}

      {/* if there is no page display message */}
      {!id
        ? <div className="message">
          <div>
            <svg>
              <use href={`${icons}#icon-smile`}></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
        // display page or spinner
        : showPage
          ? <>
            <figure className="recipe__fig">
              <img
                src={currentRecipeData.image_url}
                alt={currentRecipeData.title}
                className="recipe__img"
              />
              <h1 className="recipe__title">
                <span>{currentRecipeData.title}</span>
              </h1>
            </figure>
            <div className="recipe__details">
              <div className="recipe__info">
                <svg className="recipe__info-icon">
                  <use href={`${icons}#icon-clock`}></use>
                </svg>
                <span className="recipe__info-data recipe__info-data--minutes">{currentRecipeData.cooking_time}</span>
                <span className="recipe__info-text">minutes</span>
              </div>
              <div className="recipe__info">
                <svg className="recipe__info-icon">
                  <use href={`${icons}#icon-users`}></use>
                </svg>
                <span className="recipe__info-data recipe__info-data--people">{servings}</span>
                <span className="recipe__info-text">servings</span>
                <div
                  className="recipe__info-buttons"
                >
                  <button
                    className="btn--tiny btn--update-servings"
                    onClick={handleDecrement}
                  >
                    <svg>
                      <use href={`${icons}#icon-minus-circle`}></use>
                    </svg>
                  </button>
                  <button
                    className="btn--tiny btn--update-servings"
                    onClick={handleIncrement}
                  >
                    <svg>
                      <use href={`${icons}#icon-plus-circle`}></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div className={`recipe__user-generated ${!currentRecipeData.key && "hidden"}`}>
                <svg>
                  <use href={`${icons}#icon-user`}></use>
                </svg>
              </div>

              <button
                className="btn--round"
                onClick={handleAddBookmark}
              >
                <svg className="">
                  <use href={`${icons}#icon-bookmark${isBookmarked ? "-fill" : ""}`}></use>
                </svg>
              </button>
            </div>

            <div className="recipe__ingredients">
              <h2 className="heading--2">Recipe ingredients</h2>
              <ul className="recipe__ingredient-list">
                {currentRecipeData.ingredients?.map((ing, i) => (
                  <li className="recipe__ingredient" key={i}>
                    <svg className="recipe__icon">
                      <use href={`${icons}#icon-check`}></use>
                    </svg>

                    {ing.quantity &&
                      <div className="recipe__quantity">{
                        ((ing.quantity * servings) / currentRecipeData.servings).toFixed(2)
                      }</div>}

                    <div className="recipe__description">
                      {ing.unit?.length !== 0 && <span className="recipe__unit">{ing.unit} </span>}
                      {ing.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe__directions">
              <h2 className="heading--2">How to cook it</h2>
              <p className="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span className="recipe__publisher"> {currentRecipeData.publisher}</span>.
                Please check out directions at their website.
              </p>
              <a
                className="btn--small recipe__btn"
                href={currentRecipeData.source_url}
                target="_blank"
              >
                <span>Directions</span>
                <svg className="search__icon">
                  <use href={`${icons}#icon-arrow-right`}></use>
                </svg>
              </a>
            </div>
          </>
          // Display spinner if there is a page and no error
          : (id && !pageErr) && <Spinner />}
    </div>
  )
}

export default RecipePage
