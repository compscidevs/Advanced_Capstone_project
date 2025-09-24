import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Ratings = ({ initialRating }) => {
  const MAX_STARS = 5;
  const [selectedRating, setSelectedRating] = useState(initialRating);
  // const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating) => {
    // Handle rating selection
    setSelectedRating(selectedRating);
  };

  return (
    <div>
      {[...Array(MAX_STARS)].map((_, index) => {
        const starValue = index + 1;
        let icon;

        if (starValue <= selectedRating) {
          icon = <FaStar key={index} color='yellow' onClick={() => handleClick(starValue)} />;
        // } else if (starValue - 0.5 <= selectedRating) {
        //   icon = <FaStarHalfAlt key={index} color='yellow' onClick={() => handleClick(starValue - 0.5)} />;
        } else {
          icon = <FaStar key={index} color='gray' onClick={() => handleClick(starValue)} />;
        }

        return (
          <span
            key={index}
            onMouseEnter={() => handleClick(starValue)}
            // onMouseLeave={() => setHoverRating(0)}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

export default Ratings;