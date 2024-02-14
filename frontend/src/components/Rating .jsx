import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const Rating  = ({ value, text }) => {
  return (
    <div className='rating'>
        {Array.from({length: 5}, (_, index) => index + 1).map((num) => (
            <span key={num} id={num}>
                { value > num ? (
                    value < num + 1 ? 
                    <FaStarHalfAlt /> :
                    <FaStar />
                )
                :
                <FaRegStar /> }
            </span>
        ))}
        <span className='rating-text'>{ text && text }</span>
    </div>
  )
}

export default Rating 