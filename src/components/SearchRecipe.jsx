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
    dispatch({ type: "SET_QUERY", payload: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (query.trim().length === 0) return;

    try {
      alertDispatch({ type: "SET_SEARCH_ERROR", payload: false })
      dispatch({ type: "SET_SHOW_RESAULTS", payload: true })

      const { recipes } = await getRecipes(query)
      if (recipes.length === 0) throw new Error("Can't find your recipe.")

      dispatch({ type: "GET_RECIPES", payload: recipes })
      dispatch({ type: "SET_QUERY", payload: "" })
      dispatch({ type: "SET_SHOW_PAGINATION", payload: true })
    } catch (error) {
      dispatch({ type: "GET_RECIPES", payload: [] })
      dispatch({ type: "SET_SHOW_PAGINATION", payload: false })

      setAlert(error.message)
      alertDispatch({ type: "SET_SEARCH_ERROR", payload: true })
    } finally {
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
