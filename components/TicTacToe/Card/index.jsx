import React from "react";
import Image from "next/image";

const Card = (props) => {
  const { icon, color, handleClick } = props;
  return (
    <div
      className="flex items-center justify-center w-20 h-20 bg-tic-dark group hover:scale-105"
      onClick={handleClick}
    >
      {icon != "" && (
        <Image
          src={`/images/${icon}-${color}.svg`}
          className="group-hover:scale-90"
          width={100}
          height={100}
          style={{ height: "80%", width: "80%" }}
        />
      )}
    </div>
  );
};

export default Card;
