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
    bookmarkedRecipesData,
    showPagBtns,
    showResaults,
    visibleItems,
    dispatch,
  } = useContext(ForkifyContext)

  const {
    setAlert,
    searchErr,
    dispatch: alertDispatch
  } = useContext(AlertContext)

  useEffect(() => {
    // Set id on load
    dispatch({ type: "SET_ID", payload: window.location.hash.slice(1) })

    // Set id of the current page on url changes
    const handleHashChange = () => {
      dispatch({ type: "SET_ID", payload: window.location.hash.slice(1) })
    }

    window.addEventListener("hashchange", handleHashChange)

    const fetchPage = async () => {
      // If there is no id do nothing
      if (!id) return;

      try {
        // Hide alert and page
        alertDispatch({ type: "SET_PAGE_ERROR", payload: false })
        dispatch({ type: "HIDE_PAGE" })

        // Get data of the current page/id
        const { recipe } = await getRecipe(id)

        // Display recipe
        dispatch({ type: "SET_RECIPE", payload: recipe })

        // Show page bookmarked if it is
        const isBookmarked = bookmarkedRecipesData.some(data => data.id === id);
        dispatch({ type: "SET_IS_BOOKMARKED", payload: isBookmarked });

      } catch (error) {
        // Hide page
        dispatch({ type: "HIDE_PAGE" })
        // Set error message
        setAlert(error.message)
        // Display error
        alertDispatch({ type: "SET_PAGE_ERROR", payload: true })
      }
    }

    fetchPage()

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [id])

  return (
    <div className="search-results">
      <ul className="results">
        {showResaults ? <Spinner /> : visibleItems.map(data => (
          <RecipePreview key={data.id} recipeData={data} />
        ))}
        {searchErr && <Alert />}
      </ul>
      {showPagBtns && <PaginationButtons />}

      <p class="copyright">
        &copy; Desinged by Jonas Schmedtmann and developed by
        <a
          className="github-link"
          target="_blank"
          href="https://github.com/Ismail970"
        > Ismail</a>
      </p>
    </div>
  )
}

export default SearchResults
