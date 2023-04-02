import RecipePage from './RecipePage'
import AddRecipe from "./AddRecipe"
import SearchResults from './SearchResults';
import Header from './Header';

function Container() {
  return (
    <div className="container">
      <Header />
      <SearchResults />
      <RecipePage />
      <AddRecipe />
    </div>
  )
}

export default Container
