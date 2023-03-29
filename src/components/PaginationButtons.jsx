import { useContext } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"

function PaginationButtons() {
  const { pagination, recipeData, dispatch } = useContext(ForkifyContext)

  const numPages = Math.ceil(recipeData.length / 10);

  return (
    <div className="pagination">

      {pagination > 1 && <button
        className="btn--inline pagination__btn--prev"
        onClick={() => dispatch({ type: "SET_PAGINATION", payload: pagination - 1 })}
      >
        <svg className="search__icon">
          <use href={`${icons}#icon-arrow-left`}></use>
        </svg>
        <span>Page {pagination}</span>
      </button>}

      {numPages !== pagination && <button
        className="btn--inline pagination__btn--next"
        onClick={() => dispatch({ type: "SET_PAGINATION", payload: pagination + 1 })}
      >
        <span>Page {pagination + 1}</span>
        <svg className="search__icon">
          <use href={`${icons}#icon-arrow-right`}></use>
        </svg>
      </button>}

    </div>
  )
}

export default PaginationButtons
