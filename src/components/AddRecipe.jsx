import { useContext } from 'react'
import { uploadRecipe } from '../context/forkify/ForkifyActions'
import ForkifyContext from "../context/forkify/ForkifyContext"
import AddRecipeContext from '../context/addRecipe/AddRecipeContext'
import AlertContext from '../context/alert/AlertContext'
import icons from "../assets/svg/icons.svg"
import Alert from "./Alert"

function AddRecipe() {
  const MODEL_CLOSE_SEC = import.meta.env.VITE_MODEL_CLOSE_SEC

  const { dispatch, showAddForm } = useContext(AddRecipeContext)
  const { bookmarkedRecipesData, setBookmarks, dispatch: forkifyDispatch } = useContext(ForkifyContext)
  const { setAlert, dispatch: alertDispatch, uploadAlert } = useContext(AlertContext)

  const onSubmit = async e => {
    e.preventDefault()

    // Extract form data
    const formDataArr = [...new FormData(e.target)];
    const formData = Object.fromEntries(formDataArr);

    try {
      // Remove form alert if there is any
      alertDispatch({ type: "SET_UPLOAD_ALERT", payload: false })

      const ingredients = Object.entries(formData).filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "").map(ing => {
        const ingArr = ing[1].split(",").map(el => el.trim());
        if (ingArr.length !== 3) throw new Error("Wrong ingredient format");

        const [quantity, unite, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unite, description };
      });
      const recipe = {
        title: formData.title,
        source_url: formData.sourceUrl,
        image_url: formData.image,
        publisher: formData.publisher,
        cooking_time: +formData.cookingTime,
        servings: +formData.servings,
        ingredients,
      };

      // Upload data
      const data = await uploadRecipe(recipe);
      const newBookmark = [...bookmarkedRecipesData]
      newBookmark.push(data.recipe)

      // Hide form
      setTimeout(() => dispatch({ type: "SET_ADD_FORM", payload: false }), MODEL_CLOSE_SEC * 1000)

      // Bookmark user's recipe
      forkifyDispatch({ type: "SET_BOOKMARKED_RECIPES", payload: newBookmark });
      // Save data to local storage
      setBookmarks(newBookmark)

      // Set user's recipe id
      forkifyDispatch({ type: "SET_ID", payload: data.recipe.id })
      history.pushState(null, null, `#${data.recipe.id}`);

      // Set alert message
      setAlert("Your recipe was successfuly uploaded.", true)
    } catch (error) {
      setAlert(error.message)
    } finally {
      // Show alert
      alertDispatch({ type: "SET_UPLOAD_ALERT", payload: true })
    }
  }

  // Hide form
  const onClick = () => {
    dispatch({ type: "SET_ADD_FORM", payload: false })
  }

  return (
    <>
      <div
        className={`overlay ${!showAddForm && "hidden"}`}
        onClick={onClick}
      ></div>
      <div className={`add-recipe-window ${!showAddForm && "hidden"}`}>
        <button
          className="btn--close-modal"
          onClick={onClick}
        >
          &times;
        </button>
        <form
          className="upload"
          onSubmit={onSubmit}
        >
          {/* if upload alert is false show form if true show alert */}
          {!uploadAlert
            ? <>
              <div className="upload__column">
                <h3 className="upload__heading">Recipe data</h3>
                <label>Title</label>
                <input required name="title" type="text" />
                <label>URL</label>
                <input required name="sourceUrl" type="text" />
                <label>Image URL</label>
                <input required name="image" type="text" />
                <label>Publisher</label>
                <input required name="publisher" type="text" />
                <label>Prep time</label>
                <input required name="cookingTime" type="number" />
                <label>Servings</label>
                <input required name="servings" type="number" />
              </div>

              <div className="upload__column">
                <h3 className="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input type="text" required name="ingredient-1"
                  placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 2</label>
                <input type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 3</label>
                <input type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 4</label>
                <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 5</label>
                <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 6</label>
                <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
              </div>

              <button className="btn upload__btn">
                <svg>
                  <use href={`${icons}#icon-upload-cloud`}></use>
                </svg>
                <span>Upload</span>
              </button>
            </>
            : <Alert />}
        </form>
      </div>
    </>
  )
}

export default AddRecipe
