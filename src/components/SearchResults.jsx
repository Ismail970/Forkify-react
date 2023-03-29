import { useContext, useEffect } from 'react'
import { getRecipe } from "../context/forkify/ForkifyActions";
import ForkifyContext from '../context/forkify/ForkifyContext'
import icons from "../assets/svg/icons.svg"
import RecipePreview from './RecipesPreview'
import RecipePage from './RecipePage'
import AddRecipe from "./AddRecipe"
import PaginationButtons from './PaginationButtons';
import Spinner from "./Spinner"
import Error from './Error'

function SearchResults() {
  const { recipeData, isLoading, pagination, showPage, id, bookmarkedRecipesData, showPagBtns, error, dispatch } = useContext(ForkifyContext)

  const recipesPerPage = import.meta.env.VITE_RES_PER_PAGE;
  const indexOfLastRecipe = pagination * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
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
        dispatch({ type: "SET_PAGE", payload: false })

        const { recipe } = await getRecipe(id)

        dispatch({ type: "SET_RECIPE", payload: recipe })
        dispatch({ type: "SET_PAGE", payload: true })
        dispatch({ type: 'SET_ACTIVE_RECIPE', payload: id });

        const isBookmarked = bookmarkedRecipesData.some(data => data.id === id);
        dispatch({ type: "SET_BOOKMARK", payload: isBookmarked });

      } catch (error) {
        console.log(error)
        dispatch({ type: "SET_PAGE", payload: false })
      }
    }

    fetchPage()
  }, [id])

  return (
    <>
      <div className="search-results">
        <ul className="results">
          {isLoading ? <Spinner /> : currentRecipes.map(data => (
            <RecipePreview key={data.id} recipeData={data} />
          ))}

          {/* {error && <Error />} */}
        </ul>

        {showPagBtns && <PaginationButtons />}

      </div>
      <div className="recipe">
        {/* {error && <Error />} */}

        {!id && (
          <div className="message">
            <div>
              <svg>
                <use href={`${icons}#icon-smile`}></use>
              </svg>
            </div>
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
          </div>
        )}

        {showPage
          ? <RecipePage />
          : id && <Spinner />
        }
      </div>

      <AddRecipe />
    </>
  )
}

export default SearchResults
