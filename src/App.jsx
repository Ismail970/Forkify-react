import Header from './components/Header'
import SearchResults from './components/SearchResults'
import { AddRecipeProvider } from './context/addRecipe/AddRecipeContext';
import { ForkifyProvider } from './context/forkify/ForkifyContext';

function App() {
  return (
    <AddRecipeProvider>
      <ForkifyProvider>
        <div className="container">
          <Header />
          <SearchResults />
        </div>
      </ForkifyProvider>
    </AddRecipeProvider>
  )
}

export default App
