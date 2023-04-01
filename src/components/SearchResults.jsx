import { useContext, useEffect } from 'react'
import { getRecipe } from "../context/forkify/ForkifyActions";
import ForkifyContext from '../context/forkify/ForkifyContext'
import AlertContext from '../context/alert/AlertContext';
import RecipePreview from './RecipesPreview'
import PaginationButtons from './PaginationButtons';
import Spinner from "./Spinner"
import Alert from './Alert'

function SearchResults() {
  const {
    id,
    recipeData,
    bookmarkedRecipesData,
    pagination,
    showPagBtns,
    showResaults,
    dispatch
  } = useContext(ForkifyContext)

  const {
    setAlert,
    searchErr,
    dispatch: alertDispatch
  } = useContext(AlertContext)

  const RES_PER_PAGE = import.meta.env.VITE_RES_PER_PAGE;
  const indexOfLastRecipe = pagination * RES_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - RES_PER_PAGE;
  const currentRecipes = recipeData.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    const handleHashChange = () => {
      dispatch({ type: "SET_ID", payload: window.location.hash.slice(1) })
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  useEffect(() => {
    dispatch({ type: "SET_ID", payload: window.location.hash.slice(1) })

    const fetchPage = async () => {
      if (!id) return;

      try {
        alertDispatch({ type: "SET_PAGE_ERROR", payload: false })
        dispatch({ type: "SET_PAGE", payload: false })

        const { recipe } = await getRecipe(id)

        dispatch({ type: "SET_RECIPE", payload: recipe })
        dispatch({ type: "SET_PAGE", payload: true })
        dispatch({ type: 'SET_ACTIVE_RECIPE', payload: id });

        const isBookmarked = bookmarkedRecipesData.some(data => data.id === id);
        dispatch({ type: "SET_BOOKMARK", payload: isBookmarked });

      } catch (error) {
        dispatch({ type: "SET_PAGE", payload: false })
        setAlert(error.message)
        alertDispatch({ type: "SET_PAGE_ERROR", payload: true })
      }
    }

    fetchPage()
  }, [id])

  return (
    <div className="search-results">
      <ul className="results">
        {showResaults ? <Spinner /> : currentRecipes.map(data => (
          <RecipePreview key={data.id} recipeData={data} />
        ))}
        {searchErr && <Alert />}
      </ul>
      {showPagBtns && <PaginationButtons />}
    </div>
  )
}

export default SearchResults
