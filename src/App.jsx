import Header from './components/Header'
import SearchResults from './components/SearchResults'
import { AddRecipeProvider } from './context/addRecipe/AddRecipeContext';
import { ForkifyProvider } from './context/forkify/ForkifyContext';
import { AlertProvider } from './context/alert/AlertContext';

function App() {
  return (
    <AlertProvider>
      <AddRecipeProvider>
        <ForkifyProvider>
          <div className="container">
            <Header />
            <SearchResults />
          </div>
        </ForkifyProvider>
      </AddRecipeProvider>
    </AlertProvider>
  )
}

export default App
