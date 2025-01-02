const gameBoardSubContainer = document.getElementById(
  "game-board-sub-container"
);

const player1TurnDetail = document.getElementById('turn-detail-1'),
  player2TurnDetail = document.getElementById('turn-detail-2');

const player1Wins = document.getElementById('wins-1'),
  player2Wins = document.getElementById('wins-2');

function createPlayer(name, symbol) {
  let score = 0;

  const changeName = (newName) => (name = newName);
  const getSymbol = () => symbol;
  const toggleSymbol = () => {
    symbol = symbol === 1 ? 2 : 1;
  };

  const increaseScore = () => score++;
  const getScore = () => score;
  const resetScore = () => (score = 0);

  return {
    name,
    getSymbol,
    toggleSymbol,
    changeName,
    increaseScore,
    getScore,
    resetScore,
  };
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
      const clickedButton = document.getElementById(`game-board-button-${idx}`);
      const buttonSymbolImage = document.createElement('img');
      buttonSymbolImage.className = 'symbol-image'
      buttonSymbolImage.src = symbol === 1 ? './assets/circle.svg' : './assets/cross.svg';
      clickedButton.replaceChildren(buttonSymbolImage);
      return true;
    }
    return false;
  };

  const clearBoard = () => gameBoardList.fill(undefined);

  const addWinnerClassToButton = (indices) => {
    for(let idx of indices) {
      const winnerGridButton = document.getElementById(`game-board-button-${idx}`);
      winnerGridButton.classList.add('game-board-winner-button');
    }
  }

  const checkPlayerWon = () => {
    for (let positions of winningPositions) {
      const [idx1, idx2, idx3] = positions;

      if (
        gameBoardList[idx1] !== undefined &&
        gameBoardList[idx1] === gameBoardList[idx2] &&
        gameBoardList[idx2] === gameBoardList[idx3]
      ) {
        addWinnerClassToButton(positions);
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
    gameEnded = false,
    indicesFilled = 0;

  const clearBoard = () => {
    gameBoard.clearBoard();
    createEmptyGrid();

    if(currentPlayer === 2) toggleCurrentPlayer();
    gameEnded = false;
  }

  const toggleCurrentPlayer = () => {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    if(currentPlayer === 1) {
      player1TurnDetail.textContent = 'Your Turn';
      player2TurnDetail.textContent = 'Wait For Your Turn';
    }
    else {
      player1TurnDetail.textContent = 'Wait For Your Turn';
      player2TurnDetail.textContent = 'Your Turn';
    }
  };

  const checkGameStatus = () => {
    const gameStatus = gameBoard.checkPlayerWon();

    if (gameStatus === null) return undefined;
    return gameStatus[0];
  };

  const playMove = (idx) => {
    if (gameEnded) return false;
    const currentPlayerSymbol =
      currentPlayer === 1 ? player1.getSymbol() : player2.getSymbol();
    if (!gameBoard.playMove(currentPlayerSymbol, idx)) return false;
    indicesFilled++;
    if (indicesFilled === 9) gameEnded = true;
    toggleCurrentPlayer();
    return true;
  };

  const createGridButton = (idx) => {
    const gridButton = document.createElement('button');
    gridButton.className = 'game-board-button';
    gridButton.id = `game-board-button-${idx}`;
    gridButton.value = idx;

    gridButton.addEventListener('click', (e) => {
      let value = e.target.value;
      if(!e.target.value) {
        value = e.target.parentNode.value;
      }
      if(!playMove(value)) return;

      const winner = checkGameStatus();
      if(!winner) return;
      if(winner === 1) {
        player1.increaseScore();
        player1Wins.textContent = player1.getScore();
      }
      else if(winner === 2) {
        player2.increaseScore();
        player2Wins.textContent = player2.getScore();
      }

      gameEnded = true;
    });

    return gridButton;
  }

  const createEmptyGrid = () => {
    const gridButtons = [];
    for(let i = 0; i < 9; i++) {
      gridButtons.push(createGridButton(i));
    }

    gameBoardSubContainer.replaceChildren(...gridButtons);
  }

  return { clearBoard, playMove, createEmptyGrid };
})();

displayController.createEmptyGrid();

const clearButton = document.getElementById("clear-board-button");
clearButton.addEventListener('click', ()=>{
  displayController.clearBoard();
})