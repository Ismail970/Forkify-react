import { useContext, useEffect } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"

function RecipePage() {
  const { currentRecipeData, isBookmarked, servings, byUser, dispatch } = useContext(ForkifyContext)

  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    dispatch({ type: "SET_BOOKMARK", payload: newBookmarkState })

    if (newBookmarkState) {
      const newBookmarkedRecipe = { ...currentRecipeData };
      dispatch({
        type: "ADD_BOOKMARKED_RECIPES",
        payload: newBookmarkedRecipe,
      });
    } else {
      dispatch({
        type: "REMOVE_BOOKMARKED_RECIPE",
        payload: currentRecipeData.id,
      })
    }
  }

  useEffect(() => {
    dispatch({ type: "UPDATE_SERVINGS", payload: currentRecipeData.servings })
  }, [])

  return (
    <>
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
              onClick={() => {
                if (servings > 1) dispatch({ type: "UPDATE_SERVINGS", payload: servings - 1 })
              }}
            >
              <svg>
                <use href={`${icons}#icon-minus-circle`}></use>
              </svg>
            </button>
            <button
              className="btn--tiny btn--update-servings"
              onClick={() => dispatch({ type: "UPDATE_SERVINGS", payload: servings + 1 })}
            >
              <svg>
                <use href={`${icons}#icon-plus-circle`}></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={`recipe__user-generated ${!byUser && "hidden"}`}>
          <svg>
            <use href={`${icons}#icon-user`}></use>
          </svg>
        </div>

        <button
          className="btn--round"
          onClick={handleBookmark}
        >
          <svg className="">
            <use href={`${icons}#icon-bookmark${isBookmarked ? "-fill" : ""}`}></use>
          </svg>
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {currentRecipeData.ingredients.map((ing, i) => (
            <li className="recipe__ingredient" key={i}>
              <svg className="recipe__icon">
                <use href={`${icons}#icon-check`}></use>
              </svg>

              {ing.quantity && <div className="recipe__quantity">{((ing.quantity * servings) / currentRecipeData.servings).toFixed(2)}</div>}

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
  )
}

export default RecipePage
