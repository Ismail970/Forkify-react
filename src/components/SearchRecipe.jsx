import { useContext } from 'react'
import { getRecipes } from "../context/forkify/ForkifyActions";
import ForkifyContext from '../context/forkify/ForkifyContext'
import AlertContext from '../context/alert/AlertContext';
import icons from "../assets/svg/icons.svg"

function SearchRecipe() {
  const { query, dispatch } = useContext(ForkifyContext)
  const { setAlert, dispatch: alertDispatch } = useContext(AlertContext)

  const onChange = e => {
    e.preventDefault()
    // Save query
    dispatch({ type: "SET_QUERY", payload: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    // If there is no query do nothing
    if (query.trim().length === 0) return;

    try {
      // Hide search error and display spinner
      alertDispatch({ type: "SET_SEARCH_ERROR", payload: false })
      dispatch({ type: "SET_SHOW_RESAULTS", payload: true })

      const { recipes } = await getRecipes(query)
      // If recipe if not found return an error
      if (recipes.length === 0) throw new Error("Can't find your recipe.")

      // Show recipes
      dispatch({ type: "SHOW_RECIPES", payload: recipes })
    } catch (error) {
      // Hide search and pagination buttons
      dispatch({ type: "HIDE_RECIPES" })

      // Set error message
      setAlert(error.message)
      // Display error
      alertDispatch({ type: "SET_SEARCH_ERROR", payload: true })
    } finally {
      // Hide spinner
      dispatch({ type: "SET_SHOW_RESAULTS", payload: false })
    }
  }

  return (
    <form
      className="search"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        onChange={onChange}
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
