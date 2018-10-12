const gridArray = [];

$(function init() {
  initializeGrid();
  addRandomTile();
  addRandomTile();
  bindArrowControlls();
});

function bindArrowControlls() {
  $(document).keydown((event) => {
    switch (event.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        moveUp();
      case 39:
        moveRight();
      case 40:
        moveDown();
      default:
        break;
    }
  })
}

function moveDown() {
  let movementHappened = false;
  for (j = 0; j < 4; j++) {
    for (i = 0; i < 3; i++) {
      const currentValue = parseInt(gridArray[i][j].text());
      const nextValue = parseInt(gridArray[i + 1][j].text());

      if (canTileMove(currentValue, nextValue)) {
        moveTile(gridArray[i][j], gridArray[i + 1][j])
        movementHappened = true;
      }
    }
  }

  if (movementHappened) {
    addRandomTile();
  }
};

function moveTile(currentTile, nextTile) {
  const currentValue = parseInt(currentTile.text());
  const nextValue = parseInt(nextTile.text());
  currentTile.text(0);
  nextTile.text(currentValue + nextValue);
}

function canTileMove(currentValue, nextValue) {
  return currentValue && ((currentValue === nextValue) || nextValue === 0);
}


function initializeGrid() {
  $('.grid-container').children('.grid-row').each(function (rowIndex, rowElement) {
    gridArray[rowIndex] = [];
    $(rowElement).children('.grid-cell').each(function (columnIndex, columnElement) {
      gridArray[rowIndex].push($(columnElement));
      $(columnElement).text(0);
    });
  });
}

function addRandomTile() {
  const randomTile = $(gridArray[getRandomInteger(3)][getRandomInteger(3)]);

  if (randomTile.text() == 0) {
    randomTile.text(getRandomInteger(9) === 9 ? 4 : 2)
  } else {
    addRandomTile();
  }
}

function getRandomInteger(maxValue) {
  return Math.floor(Math.random() * (maxValue + 1));
}
