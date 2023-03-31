import { AddRecipeProvider } from './context/addRecipe/AddRecipeContext';
import { ForkifyProvider } from './context/forkify/ForkifyContext';
import { AlertProvider } from './context/alert/AlertContext';
import Container from "./components/Container"

function App() {
  return (
    <AlertProvider>
      <AddRecipeProvider>
        <ForkifyProvider>
          <Container />
        </ForkifyProvider>
      </AddRecipeProvider>
    </AlertProvider>
  )
}

export default App
