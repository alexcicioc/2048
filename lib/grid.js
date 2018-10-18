class Grid {

  constructor() {
    this.grid = [];
    this.initGrid();
    this.lockedTiles = [];
    this.movementHappened = false;
  }

  initGrid() {
    $('.grid-container').children('.grid-row')
      .each((rowIndex, rowElement) => {
        this.grid[rowIndex] = [];
        $(rowElement).children('.grid-cell').children('.tile')
          .each((columnIndex, columnElement) => {
            const tile = new Tile(rowIndex, columnIndex, $(columnElement))
            this.grid[rowIndex].push(tile);
          });
      });
  }

  canMergeTiles(tile1, tile2) {
    const currentValue = tile1.getValue();
    const nextValue = tile2.getValue();

    if (tile1.isLocked()) {
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

  mergeTiles(x1, y1, x2, y2) {
    const currentTile = this.grid[x1][y1];
    const nextTile = this.grid[x2][y2];

    if (this.canMergeTiles(currentTile, nextTile)) {

      if (nextTile.getValue() > 0) {
        this.lockTile(x2, y2);
      }

      this.setTileValue(x2, y2, currentTile.getValue() + nextTile.getValue());
      this.removeTile(x1, y1);
      this.movementHappened = true;

      return true;
    }

    return false;
  }

  setTileValue(x, y, value) {
    this.grid[x][y].setValue(value);
  }

  getTileValue(x, y) {
    return this.grid[x][y].getValue();
  }

  removeTile(x, y) {
    this.grid[x][y].remove();
  }

  isTileLocked(x, y) {
    return this.grid[x][y].islocked();
  }

  lockTile(x, y) {
    this.lockedTiles.push([x, y]);
    return this.grid[x][y].lock();
  }

  unlockTile(x, y) {
    return this.grid[x][y].unlock();
  }

  clearLocks() {
    this.lockedTiles.forEach((coords) => {
      let x, y;
      [x, y] = coords;
      this.unlockTile(x, y);
    });
    this.lockedTiles = [];
  }

  finishRound() {
    this.movementHappened = false;
    this.clearLocks();
  }

  didAnyTilesMove() {
    return this.movementHappened;
  }

  addRandomTile() {
    const x = Math.floor(Math.random() * 4);
    const y = Math.floor(Math.random() * 4);

    console.log(x, y, grid.getTileValue(x, y))
    if (grid.getTileValue(x, y) === 0) {
      const randomTileValue = Math.floor(Math.random() * 10) === 9 ? 4 : 2;
      console.log('new tile', randomTileValue);
      grid.setTileValue(x, y, randomTileValue);
    } else {
      this.addRandomTile();
    }
  }

  toArray() {
    const numericGrid = [];
    this.grid.forEach((row, rowIndex) => {
      numericGrid[rowIndex] = [];
      row.forEach((tile) => {
        numericGrid[rowIndex].push(tile.getValue());
      });
    });

    return numericGrid;
  }
}