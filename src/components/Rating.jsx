import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rate, onClick, style }) => {
  return (
    <div style={style}>
      {[...Array(5)].map((_, i) =>
        i < rate ? (
          <AiFillStar key={i} onClick={() => onClick(i)} fontSize={20} />
        ) : (
          <AiOutlineStar key={i} fontSize={20} onClick={() => onClick(i)} />
        )
      )}
    </div>
  );
};

export default Rating;
