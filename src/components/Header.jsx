import logo from "../assets/img/logo.png"
import SearchRecipe from './SearchRecipe'
import Nav from "./Nav"

function Header() {
  return (
    <header className="header">
      <img src={logo}
        alt="Logo"
        className="header__logo" />
      <SearchRecipe />
      <Nav />
    </header>
  )
}

export default Header
