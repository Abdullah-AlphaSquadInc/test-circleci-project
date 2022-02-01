import React from 'react';

import StarRatings from 'react-star-ratings';

const RatingStar = (props) => {
    
    return ( 

        <StarRatings
            rating={props.rating}
            starRatedColor="orange"
            numberOfStars={5}
            name='rating'
            starDimension="17px"
            starSpacing="2px"
        />

    );
}
 
export default RatingStar;