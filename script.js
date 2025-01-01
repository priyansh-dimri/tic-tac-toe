function createPlayer(name, symbol) {
  let score = 0;

  const changeName = (newName) => (name = newName);
  const getSymbol = () => symbol;
  const toggleSymbol = () => {
    symbol = symbol === 1 ? 2 : 1;
  };

  const increaseScore = () => score++;
  const resetScore = () => (score = 0);

  return { name, getSymbol, toggleSymbol, changeName, increaseScore, resetScore };
}

const gameBoard = (function () {
  let gameBoardList = new Array(9).fill(undefined);

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
      return true;
    }
    return false;
  };

  const clearBoard = () => gameBoardList.fill(undefined);

  const checkPlayerWon = () => {
    for (let positions of winningPositions) {
      const [idx1, idx2, idx3] = positions;

      if ((gameBoardList[idx1] !== undefined) && (gameBoardList[idx1] === gameBoardList[idx2]) && (gameBoardList[idx2] === gameBoardList[idx3])) {
        return [gameBoardList[idx1], [idx1, idx2, idx3]];
      }
    }

    return null;
  };

  return { playMove, clearBoard, checkPlayerWon };
})();

const displayController = (function () {
  const player1 = createPlayer("Player 1", 1),
    player2 = createPlayer("Player 2", 2);

  let currentPlayer = 1,
    gameEnded = false;

  const resetGame = () => {
    player1.resetScore();
    player2.resetScore();
    clearBoard();
  };

  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  const checkGameStatus = () => {
    const gameStatus = gameBoard.checkPlayerWon();

    if(gameStatus === null) return undefined;
    return gameStatus[0];
  }

  const playMove = (idx) => {
    if(gameEnded) return;
    const currentPlayerSymbol = currentPlayer === 1 ? player1.getSymbol() : player2.getSymbol();
    gameBoard.playMove(currentPlayerSymbol, idx);
    toggleCurrentPlayer();
  }

  return { resetGame, playMove, checkGameStatus };
})();
