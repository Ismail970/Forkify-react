import icons from "../assets/svg/icons.svg"

function Spinner () {
  return (
    <div className="spinner">
      <svg>
        <use href={`${icons}#icon-loader`}></use>
      </svg>
    </div>
  )
}

export default Spinner
