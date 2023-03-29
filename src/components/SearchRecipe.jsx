import { useContext } from 'react'
import { getRecipes } from "../context/forkify/ForkifyActions";
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"

function SearchRecipe() {
  const { query, dispatch } = useContext(ForkifyContext)

  const handleInput = e => {
    e.preventDefault()
    dispatch({ type: "SET_QUERY", payload: e.target.value })
  }

  const handleSearch = async e => {
    e.preventDefault()
    if (query.trim().length === 0) return;

    try {
      dispatch({ type: "SET_ERROR", payload: false })
      dispatch({ type: "SET_LOADING" })

      const { recipes } = await getRecipes(query)

      dispatch({ type: "GET_RECIPES", payload: recipes })
      dispatch({ type: "SET_QUERY", payload: "" })
      dispatch({ type: "SET_SHOW_PAGINATION", payload: true })
    } catch (error) {
      dispatch({ type: "GET_RECIPES", payload: [] })
      // dispatch({ type: "SET_ERROR", payload: true })
      dispatch({ type: "SET_SHOW_PAGINATION", payload: false })
    } finally {
      dispatch({ type: "REMOVE_LOADING" })
    }
  }

  return (
    <form
      className="search"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        onChange={handleInput}
        value={query}
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href={`${icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  )
}

export default SearchRecipe
