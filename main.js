const gridArray = [];

$(document).ready(function () {
  initializeGrid();
  addRandomTile();
  addRandomTile();
  bindArrowControlls();
});

function bindArrowControlls() {
  $(document).keydown((event) => {
    console.log(event.keyCode);
    movementHappened = false;
    switch (event.keyCode) {
      case 37:
        while (moveLeft()) {
          movementHappened = true;
        }
        break;
      case 38:
        while (moveUp()) {
          movementHappened = true;
        }
        break;
      case 39:
        while (moveRight()) {
          movementHappened = true;
        }
        break;
      case 40:
        while (moveDown()) {
          movementHappened = true;
        }
        break;
    }

    if (movementHappened) {
      addRandomTile();
      $('.grid-cell').each((index, elem) => {
        $(elem).removeAttr('data-moved');
      })
    }
  })
}

function moveDown() {
  console.log('moved down');
  let movementHappened = false;
  for (j = 0; j < 4; j++) {
    for (i = 2; i >= 0; i--) {
      const currentTile = gridArray[i][j];
      const nextTile = gridArray[i + 1][j];

      if (canTileMove(currentTile, nextTile)) {
        moveTile(currentTile, nextTile)
        movementHappened = true;
      }
    }
  }

  return movementHappened;
};

function moveUp() {
  console.log('moved up');
  let movementHappened = false;
  for (j = 0; j < 4; j++) {
    for (i = 3; i > 0; i--) {
      const currentTile = gridArray[i][j];
      const nextTile = gridArray[i - 1][j];

      if (canTileMove(currentTile, nextTile)) {
        moveTile(currentTile, nextTile)
        movementHappened = true;
      }
    }
  }

  return movementHappened;
};

function moveRight() {
  console.log('moved right');
  let movementHappened = false;
  for (i = 0; i < 4; i++) {
    for (j = 2; j >= 0; j--) {
      const currentTile = gridArray[i][j];
      const nextTile = gridArray[i][j + 1];

      if (canTileMove(currentTile, nextTile)) {
        moveTile(currentTile, nextTile)
        movementHappened = true;
      }
    }
  }

  return movementHappened;
};


function moveTile(currentTile, nextTile) {
  const currentValue = parseInt(currentTile.text());
  const nextValue = parseInt(nextTile.text());
  console.log(`Tile moved ${currentValue}-${nextValue}`);

  currentTile.removeClass(`tile-${currentTile.text()}`).text(0);
  nextTile.hide();
  nextTile.text(currentValue + nextValue).addClass(`tile-${currentValue + nextValue}`);
  nextTile.fadeIn("fast");
  if (nextValue > 0) {
    nextTile.attr('data-moved', 'true');
  }
}

function canTileMove(currentTile, nextTile) {
  const currentValue = parseInt(currentTile.text());
  const nextValue = parseInt(nextTile.text());

  if (currentTile.attr('data-moved') && nextValue > 0) {
    return false;
  }

  if (!currentValue) {
    return false;
  }

  if (currentValue === nextValue) {
    return true;
  }

  if (nextValue === 0) {
    return true;
  }

  return false;
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
    const tileValue = getRandomInteger(9) === 9 ? 4 : 2;
    console.log('new tile', tileValue);
    randomTile
      .hide()
      .text(tileValue)
      .addClass(`tile-${tileValue}`)
      .slideDown("fast")
  } else {
    addRandomTile();
  }
}

function getRandomInteger(maxValue) {
  return Math.floor(Math.random() * (maxValue + 1));
}
