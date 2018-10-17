const grid = new Grid();
const movement = new Movement(grid);
const PROGRESS_COOKIE_NAME = 'gameProgress'
let score = 0;

if (!reloadLastGame()) {
  grid.addRandomTile();
  grid.addRandomTile();
}
bindArrowControlls();

function getDirectionFromKeyCode(keyCode) {
  switch (keyCode) {
    case 37:
      return 'left';
    case 38:
      return 'up';
    case 39:
      return 'right';
    case 40:
      return 'down';
    default:
      return false;
  }
}

function bindArrowControlls() {
  $(document).keydown((event) => {

    const direction = getDirectionFromKeyCode(event.keyCode);
    if (direction) {
      movement.go(direction);

      if (grid.didAnyTilesMove()) {
        grid.addRandomTile();
      }
      grid.finishRound();
    }
  });
}

function saveGame() {
  const gridInJsonEncoded = window.btoa(JSON.stringify(grid.toArray()));
  setCookie(PROGRESS_COOKIE_NAME, gridInJsonEncoded, 1);
  alert('Game Saved !');
}

function resetGame() {
  gridArray.forEach((row) => {
    row.forEach((tile) => {
      tile.remove();
    });
  });
  score = 0;
  grid.addRandomTile();
  grid.addRandomTile();
  console.log('Game reset');
}

function reloadLastGame() {
  const savedGame = getCookie(PROGRESS_COOKIE_NAME);
  if (savedGame) {
    try {
      const savedGrid = JSON.parse(window.atob(savedGame));
      savedGrid.forEach((row, rowIndex) => {
        row.forEach((columnValue, columnIndex) => {
          if (columnValue) {
            const tile = gridArray[rowIndex][columnIndex];
            tile.setValue(columnValue);
          }
        });
      });
      console.log('Last game reloaded');
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}
