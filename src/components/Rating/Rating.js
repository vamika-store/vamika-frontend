import React, { useMemo } from 'react';
import SvgStarIcon from '../common/SvgStarIcon';
import SvgEmptyStar from '../common/SvgEmptyStar';

const Rating = ({rating}) => {
  const ratingNumber = useMemo(()=>{
    const validRating = isNaN(Number(rating)) || Number(rating) < 0 ? 0 : Math.min(5, Math.floor(Number(rating)));
    return new Array(validRating).fill(); 
  },[rating]);
  return (
    <div className='flex items-center'>
      {ratingNumber?.map((_,index)=>(
        <SvgStarIcon key={index}/>
      ))}
      {
       new Array(5-ratingNumber?.length).fill().map((_,index)=>(
            <SvgEmptyStar key={'empty'+index}/>
        ))
      }
      <p className='px-2 text-gray-500'>{rating}</p>
    </div>
  )
}

export default Rating
