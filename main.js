const grid = new Grid(getTileArray());
const movement = new Movement(grid);
const PROGRESS_COOKIE_NAME = 'gameProgress'
let score = 0;

if (!reloadLastGame()) {
  grid.addRandomTile();
  grid.addRandomTile();
}
bindArrowControlls();

function getTileArray() {
  const tiles = [];
  $('.grid-container')
    .children('.grid-row')
    .each((x, rowElement) => {
      tiles[x] = [];
      $(rowElement)
        .children('.grid-cell')
        .children('.tile')
        .each((y, tile) => {
          tiles[x].push(tile);
        });
    });

  return tiles;
}

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
      if (movement.go(direction)) {
        grid.addRandomTile();
      }
      grid.clearLocks();
    }
  });
}

function saveGame() {
  const gridInJsonEncoded = window.btoa(JSON.stringify(grid.toArray()));
  setCookie(PROGRESS_COOKIE_NAME, gridInJsonEncoded, 1);
  alert('Game Saved !');
}

function resetGame() {
  score = 0;
  grid.reset();
}

function reloadLastGame() {
  const savedGame = getCookie(PROGRESS_COOKIE_NAME);
  if (savedGame) {
    try {
      const savedGrid = JSON.parse(window.atob(savedGame));
      grid.reload(savedGrid)
      console.log('Last game reloaded');
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}
