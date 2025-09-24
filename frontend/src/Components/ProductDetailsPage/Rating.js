import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ rating }) => {
  const MAX_STARS = 5;
  const starIcons = [];
  
  // Calculate full stars
  for (let i = 0; i < Math.floor(rating); i++) {    //continues pushing a star as long as its index is less than the rating
    starIcons.push(<FaStar key={i} color='yellow' />);
  }
  
  //Check for half star
   if (rating % 1 !== 0) {
    starIcons.push(<FaStarHalfAlt key={starIcons.length} color='yellow' />);
   }
  
  // Fill remaining stars with empty stars checks if the star icons are less than max
  while (starIcons.length < MAX_STARS) {
    starIcons.push(<FaStar key={starIcons.length} color='gray' />);
  }
  
  return (
    <div>
      {starIcons.map((star, index) => (  //maps each star to an index
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default Rating;