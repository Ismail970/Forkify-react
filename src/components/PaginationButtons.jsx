import { useContext } from 'react'
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"

function PaginationButtons() {
  const { pagination, dispatch, numPages } = useContext(ForkifyContext)

  const handleDecrement = () => dispatch({ type: "SET_PAGINATION", payload: pagination - 1 })

  const handleIncrement = () => dispatch({ type: "SET_PAGINATION", payload: pagination + 1 })

  return (
    <div className="pagination">

      {pagination > 1 && <button
        className="btn--inline pagination__btn--prev"
        onClick={handleDecrement}
      >
        <svg className="search__icon">
          <use href={`${icons}#icon-arrow-left`}></use>
        </svg>
        <span>Page {pagination - 1}</span>
      </button>}

      {numPages !== pagination && <button
        className="btn--inline pagination__btn--next"
        onClick={handleIncrement}
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
