function createPlayer(name, symbol) {
  let score = 0;

  const changeName = (newName) => (name = newName);
  const toggleSymbol = () => {
    symbol = symbol === 1 ? 2 : 1;
  };

  const increaseScore = () => score++;
  const resetScore = () => (score = 0);

  return { name, changeName, increaseScore, resetScore };
}

const gameBoard = (function () {
  let gameBoardList = new Array(9);

  const winningPositions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const playMove = (symbol, idx) => {
    if (!gameBoardList[idx]) {
      gameBoardList[idx] = symbol;
    }
  };

  const clearBoard = () => gameBoardList.fill(undefined);

  const checkPlayerWon = () => {
    for (let positions in winningPositions) {
      const [idx1, idx2, idx3] = positions;

      if (
        ((gameBoardList[idx1] === gameBoardList[idx2]) ===
          gameBoardList[idx3]) !==
        undefined
      ) {
        return gameBoardList[idx1];
      }
    }

    return "";
  };

  return { playMove, clearBoard, checkPlayerWon };
})();

const displayController = (function () {
  const player1 = createPlayer("Player 1", 1),
    player2 = createPlayer("Player 2", 2);

  let currentPlayer = 1;

  const resetGame = () => {
    player1.resetScore();
    player2.resetScore();
    clearBoard();
  };

  return { resetGame };
})();
