import { useContext } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"

function RecipePreview({ recipeData }) {
  const { id, dispatch } = useContext(ForkifyContext)

  const onClick = () => dispatch({ type: 'SET_ACTIVE_RECIPE', payload: recipeData.id })

  return (
    <li
      className="preview"
      onClick={onClick}
    >
      <a
        className={`preview__link ${recipeData.id === id && 'preview__link--active'}`}
        href={`#${recipeData.id}`}
      >
        <figure className="preview__fig">
          <img src={recipeData.image_url} alt={recipeData.title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{recipeData.title}</h4>
          <p className="preview__publisher">{recipeData.publisher}</p>
          {recipeData.key &&
            <div className="preview__user-generated">
              <svg>
                <use href={`${icons}#icon-user`}></use>
              </svg>
            </div>}
        </div>
      </a>
    </li>
  )
}

export default RecipePreview
