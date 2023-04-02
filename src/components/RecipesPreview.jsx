import PropTypes from 'prop-types'
import { useContext } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"

function RecipePreview({ recipeData }) {
  const { id } = useContext(ForkifyContext)

  return (
    <li className="preview">
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

RecipePreview.propTypes = {
  recipeData: PropTypes.object.isRequired,
}

export default RecipePreview
