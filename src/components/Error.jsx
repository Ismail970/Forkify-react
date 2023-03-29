import icons from "../assets/svg/icons.svg"

function Error () {
  return (
    <div className="error">
      <div>
        <svg>
          <use href={`${icons}#icon-alert-triangle`}></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div>
  )
}

export default Error