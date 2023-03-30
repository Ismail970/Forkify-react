import { useContext } from 'react'
import { uploadRecipe } from '../context/forkify/ForkifyActions'
import ForkifyContext from "../context/forkify/ForkifyContext"
import AddRecipeContext from '../context/addRecipe/AddRecipeContext'
import AlertContext from '../context/alert/AlertContext'
import icons from "../assets/svg/icons.svg"
import Alert from "./Alert"

const MODEL_CLOSE_SEC = import.meta.env.VITE_MODEL_CLOSE_SEC

function AddRecipe() {
  const { dispatch, showAddForm } = useContext(AddRecipeContext)
  const { dispatch: forkifyDispatch } = useContext(ForkifyContext)
  const { setAlert, setUploadAlert, uploadAlert } = useContext(AlertContext)

  const handleUploadRecipe = async e => {
    e.preventDefault()

    const formDataArr = [...new FormData(e.target)];
    const formData = Object.fromEntries(formDataArr);

    try {
      setUploadAlert(false)

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

      const data = await uploadRecipe(recipe);

      setTimeout(() => dispatch({ type: "SET_ADD_FORM", payload: false }), MODEL_CLOSE_SEC * 1000)
      forkifyDispatch({ type: "ADD_BOOKMARKED_RECIPES", payload: data.recipe });
      forkifyDispatch({ type: "SET_ID", payload: data.recipe.id })
      history.pushState(null, null, `#${data.recipe.id}`);

      setAlert("Your recipe was successfuly uploaded.", true)
    } catch (error) {
      setAlert(error.message)
    } finally {
      setUploadAlert(true)
    }
  }

  const handleFormShow = () => {
    dispatch({ type: "SET_ADD_FORM", payload: false })
  }

  return (
    <>
      <div
        className={`overlay ${!showAddForm && "hidden"}`}
        onClick={handleFormShow}
      ></div>
      <div className={`add-recipe-window ${!showAddForm && "hidden"}`}>
        <button
          className="btn--close-modal"
          onClick={handleFormShow}
        >
          &times;
        </button>
        <form
          className="upload"
          onSubmit={handleUploadRecipe}
        >
          {!uploadAlert
            ? <>
              <div className="upload__column">
                <h3 className="upload__heading">Recipe data</h3>
                <label >Title</label>
                <input defaultValue="TEST25" required name="title" type="text" />
                <label>URL</label>
                <input defaultValue="TEST25" required name="sourceUrl" type="text" />
                <label>Image URL</label>
                <input defaultValue="TEST25" required name="image" type="text" />
                <label>Publisher</label>
                <input defaultValue="TEST25" required name="publisher" type="text" />
                <label>Prep time</label>
                <input defaultValue="25" required name="cookingTime" type="number" />
                <label>Servings</label>
                <input defaultValue="25" required name="servings" type="number" />
              </div>

              <div className="upload__column">
                <h3 className="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input defaultValue="1,ks,p" type="text" required name="ingredient-1"
                  placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 2</label>
                <input defaultValue=",,ao" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 3</label>
                <input defaultValue="1,,po" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
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
