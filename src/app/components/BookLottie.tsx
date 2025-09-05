"use client"

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/stack.json"

const BookLottie: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-72"
      />
    </div>
  );
};

export default BookLottie;
