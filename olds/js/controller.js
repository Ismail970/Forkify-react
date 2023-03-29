import * as model from "./model";
import { MODEL_CLOSE_SEC } from "./config";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import recipeView from "./views/recipeView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarkView from "./views/bookmarkView";
import addRecipeView from "./views/addRecipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// parcel
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0 update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1 update bookmark view
    bookmarkView.update(model.state.bookmarks);

    // 2 loading recipe
    await model.loadRecipe(id);

    // 3 rendring recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }

};

const controlSearchResults = async function () {
  try {
    // 1 get search query
    const query = searchView.getQuery().trim();
    if (!query) return;

    resultsView.renderSpinner();

    // 2 load recepie results
    await model.loadSearchResults(query);

    // 3 render results (pagination)
    resultsView.render(model.getSearchResultsPage());

    // 4 render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1 render New results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2 render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update recipe servings (in state)
  model.updateServings(newServings);

  // update the recepie view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1 add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2 update the recipe view
  recipeView.update(model.state.recipe);

  // 3 render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // uploade new recipe data
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // add success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // change id on the url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

// publisher-subscriber pattren
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();