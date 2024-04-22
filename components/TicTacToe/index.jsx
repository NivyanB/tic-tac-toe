import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "./Card";

const TicTacToe = () => {
  const [cards, setCards] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [user, setUser] = useState({ icon: "circle", color: "white", val: 1 });
  const [comp, setComp] = useState({ icon: "cross", color: "blue", val: 2 });

  const computerMove = async (prevCards) => {
    const emptyPositions = [];

    prevCards.forEach((value, index) => {
      if (value === 0) {
        emptyPositions.push([index]);
      }
    });

    // Choose a random empty position
    const Aindex = await emptyPositions[
      Math.floor(Math.random() * emptyPositions.length)
    ];

    // Update the chosen position to 1
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[Aindex] = comp.val;
      return newCards;
    });
  };

  const handleClick = async (index) => {
    let newCards;
    if (cards.flat().includes(0)) {
      setCards((prevCards) => {
        newCards = [...prevCards];
        newCards[index] = user.val;
        return newCards;
      });
    }

    setTimeout(() => {
      computerMove(newCards);
    }, 250);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-20 flex-wrap-reverse">
      <div className="grid grid-cols-3 gap-4 bg-tic-black p-5 rounded-xl flex-shrink-0">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card === 0 ? "" : card === user.val ? user.icon : comp.icon}
            color={
              card === 0 ? "" : card === user.val ? user.color : comp.color
            }
            handleClick={() => {
              handleClick(index);
            }}
          />
        ))}
      </div>

      <div className="flex flex-col flex-shrink-0">
        <h1 className="font-extrabold text-4xl text-white mb-1">Tic Tac Toe</h1>
        <p className="text-xl text-tic-light-gray mb-8 max-w-[450px]">
          The first person to line up three symbols in one line wins
        </p>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col">
            <p className="text-tic-light-gray text-lg font-bold mb-3">
              Change Symbol
            </p>
            <div className="flex gap-6">
              <div
                className="flex bg-tic-black rounded-md p-3 border border-tic-light-gray cursor-pointer"
                onClick={() => {
                  setUser({ ...user, icon: "circle" });
                  setComp({ ...comp, icon: "cross" });
                }}
              >
                <Image
                  src={
                    user.icon === "cross"
                      ? "/images/circle-gray.svg"
                      : "/images/circle-white.svg"
                  }
                  width={40}
                  height={40}
                />
              </div>
              <div
                className="flex bg-tic-black rounded-md p-3 border border-tic-light-gray cursor-pointer"
                onClick={() => {
                  setUser({ ...user, icon: "cross" });
                  setComp({ ...comp, icon: "circle" });
                }}
              >
                <Image
                  src={
                    user.icon === "circle"
                      ? "/images/cross-gray.svg"
                      : "/images/cross-white.svg"
                  }
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
          <div className="border-l-2 border-tic-light-gray"></div>
          <div className="flex flex-col">
            <p className="text-tic-light-gray text-lg font-bold mb-3">
              Change Color
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <div
                  className="flex bg-tic-black rounded-md p-2 border border-tic-light-gray w-[65px] h-[65px] cursor-pointer"
                  onClick={() => {
                    setUser({ ...user, color: "white" });
                    setComp({ ...comp, color: "blue" });
                  }}
                >
                  <div className="bg-white rounded h-full w-full" />
                </div>
                {user.color === "white" && (
                  <div className="bg-white h-1 rounded-md mt-2" />
                )}
              </div>

              <div className="flex flex-col">
                <div
                  className="flex bg-tic-black rounded-md p-2 border border-tic-light-gray w-[65px] h-[65px] cursor-pointer"
                  onClick={() => {
                    setUser({ ...user, color: "blue" });
                    setComp({ ...comp, color: "white" });
                  }}
                >
                  <div className="bg-tic-blue rounded h-full w-full" />
                </div>
                {user.color === "blue" && (
                  <div className="bg-tic-blue h-1 rounded-md mt-2" />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-fit bg-tic-blue px-6 py-2 text-white text-xl rounded mt-8"
          onClick={() => {
            setCards([
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0],
            ]);
          }}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
