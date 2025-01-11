import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "./Card";
import {
  getMinimaxMove,
  getMediumMove,
  getRandomMove,
  isBoardFull,
  checkWinner,
} from "tic-tac-bot";
import Tooltip from "./Tooltip";

const TicTacToe = () => {
  const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [user, setUser] = useState({ icon: "O", color: "white", val: "O" });
  const [comp, setComp] = useState({ icon: "X", color: "blue", val: "X" });
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameStatus, setGameStatus] = useState("active");
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    if (gameStatus !== "active") setIsDisabled(true); // Disable interaction when game is over
  }, [gameStatus]);

  const computerMove = (latestBoard) => {
    let bestMove;

    if (difficulty === "random") {
      bestMove = getRandomMove(latestBoard); // Random move
    } else if (difficulty === "easy") {
      bestMove = getMediumMove(latestBoard, comp.val); // Easy AI move
    } else if (difficulty === "hard") {
      bestMove = getMinimaxMove(latestBoard, comp.val); // Hard AI move (Minimax)
    }

    const updatedBoard = [...latestBoard];
    updatedBoard[bestMove?.row][bestMove?.col] = comp.val;
    setBoard(updatedBoard);
    return updatedBoard;
  };

  const handleClick = (row, col) => {
    if (isDisabled || board[row][col] !== null) return; // Ignore clicks on occupied or disabled cells

    const updatedBoard = board.map((r, i) => (i === row ? [...r] : r)); // Clone the board and make the move
    updatedBoard[row][col] = user.val; // Update the user's move
    setBoard(updatedBoard);

    // Check if the game is over after the user's move
    const gameOver = checkGameOver(updatedBoard);
    if (gameOver !== "active") {
      setGameStatus(gameOver);
      return;
    }

    // If the game isn't over, let the computer play
    setTimeout(() => {
      const newBoard = computerMove(updatedBoard); // Computer's move
      const gameOver = checkGameOver(newBoard);
      setGameStatus(gameOver);
    }, 250);
  };

  const checkGameOver = (latestBoard) => {
    const winner = checkWinner(latestBoard); // Check for a winner
    if (winner) {
      return winner === user.val ? "userWin" : "compWin"; // Return winner status
    } else if (isBoardFull(latestBoard)) {
      return "draw"; // Return draw status if the board is full
    }
    return "active"; // Game still active
  };

  return (
    <>
      <p
        className={
          "text-3xl font-bold text-tic-light-gray bg-black rounded-xl px-6 py-2 mb-10 transition-opacity duration-200 ease-in " +
          (gameStatus !== "active" ? "opacity-100" : "opacity-0")
        }
      >
        {gameStatus === "userWin"
          ? "You Won!"
          : gameStatus === "compWin"
          ? "You Lost"
          : gameStatus === "draw"
          ? "It's a Draw!"
          : ""}
      </p>

      <div className="flex flex-row items-center justify-center gap-20 flex-wrap-reverse">
        <div className="relative grid grid-cols-3 gap-4 bg-tic-black p-5 rounded-xl flex-shrink-0">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Card
                key={`${rowIndex}-${colIndex}`}
                icon={
                  cell === null ? "" : cell === user.val ? user.icon : comp.icon
                }
                color={
                  cell === null
                    ? ""
                    : cell === user.val
                    ? user.color
                    : comp.color
                }
                handleClick={() => handleClick(rowIndex, colIndex)}
              />
            ))
          )}
        </div>

        <div className="flex flex-col flex-shrink-0">
          <h1 className="font-extrabold text-4xl text-white mb-1">
            Tic Tac Toe
          </h1>
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
                    setUser({ ...user, icon: "O", val: "O" });
                    setComp({ ...comp, icon: "X", val: "X" });
                  }}
                >
                  <Image
                    src={
                      user.icon === "X"
                        ? "/images/circle-gray.svg"
                        : "/images/circle-white.svg"
                    }
                    alt="circle-icon"
                    width={40}
                    height={40}
                  />
                </div>
                <div
                  className="flex bg-tic-black rounded-md p-3 border border-tic-light-gray cursor-pointer"
                  onClick={() => {
                    setUser({ ...user, icon: "X", val: "X" });
                    setComp({ ...comp, icon: "O", val: "O" });
                  }}
                >
                  <Image
                    src={
                      user.icon === "O"
                        ? "/images/cross-gray.svg"
                        : "/images/cross-white.svg"
                    }
                    alt="cross-icon"
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

          <div className="flex flex-col mt-8">
            <p className="text-tic-light-gray text-lg font-bold mb-3">
              Select Difficulty
            </p>
            <div className="flex gap-3 text-tic-light-gray">
              <Tooltip text="Bot will make random moves.">
                <div
                  className={`flex bg-tic-black rounded-md p-3 border cursor-pointer ${
                    difficulty === "random"
                      ? "border-white text-white"
                      : "border-tic-gray"
                  }`}
                  onClick={() => setDifficulty("random")}
                >
                  <p>Random</p>
                </div>
              </Tooltip>
              <Tooltip text="Bot will only block winning moves.">
                <div
                  className={`flex bg-tic-black rounded-md p-3 border cursor-pointer ${
                    difficulty === "easy"
                      ? "border-white text-white"
                      : "border-tic-gray"
                  }`}
                  onClick={() => setDifficulty("easy")}
                >
                  <p>Easy</p>
                </div>
              </Tooltip>
              <Tooltip text="Bot uses a minimax algorithm to make optimal moves.">
                <div
                  className={`flex bg-tic-black rounded-md p-3 border cursor-pointer ${
                    difficulty === "hard"
                      ? "border-white text-white"
                      : "border-tic-gray"
                  }`}
                  onClick={() => setDifficulty("hard")}
                >
                  <p>Hard</p>
                </div>
              </Tooltip>
            </div>
          </div>

          <button
            className="w-fit bg-tic-blue px-6 py-2 text-white text-xl rounded mt-8"
            onClick={() => {
              setBoard(initialBoard);
              setGameStatus("active");
              setIsDisabled(false);
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
