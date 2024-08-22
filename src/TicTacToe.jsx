import React, { useState } from "react";

const TicTacToe = ({ boardSize = 3 }) => {
  const createBoard = () =>
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));

  const [boards, setBoards] = useState([createBoard()]);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleClick = (boardIndex, rowIndex, colIndex) => {
    const newBoards = [...boards];
    if (!newBoards[boardIndex][rowIndex][colIndex]) {
      newBoards[boardIndex][rowIndex][colIndex] = currentPlayer;
      setBoards(newBoards);

      if (checkWinner(newBoards[boardIndex], rowIndex, colIndex)) {
        alert(`Player ${currentPlayer} wins on board ${boardIndex + 1}!`);
        setBoards([createBoard()]);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const checkWinner = (board, row, col) => {
    const winCondition = (player) =>
      board[row].every((cell) => cell === player) || // Check row
      board.every((row) => row[col] === player) || // Check column
      (row === col && board.every((row, i) => row[i] === player)) || // Check diagonal
      (row + col === boardSize - 1 &&
        board.every((row, i) => row[boardSize - 1 - i] === player)); // Check anti-diagonal

    return winCondition(currentPlayer);
  };

  const addBoard = () => {
    setBoards([...boards, createBoard()]);
  };

  return (
    <div>
      {boards.map((board, boardIndex) => (
        <div key={boardIndex} style={{ marginBottom: "20px" }}>
          <h3>Board {boardIndex + 1}</h3>
          <div style={{ display: "inline-block" }}>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    onClick={() => handleClick(boardIndex, rowIndex, colIndex)}
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "1px solid black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={addBoard}>Add Board</button>
    </div>
  );
};

export default TicTacToe;
