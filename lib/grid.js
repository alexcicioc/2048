class Grid {

  constructor(tiles) {
    this.grid = [];
    this.init(tiles);
    this.lockedTiles = [];
  }

  init(tiles) {
    tiles.forEach((row, x) => {
      this.grid[x] = [];
      row.forEach((tile, y) => {
        const tileModel = new Tile(x, y, $(tile))
        this.grid[x].push(tileModel);
      });
    });
  }

  reset() {
    this.grid.forEach((row) => {
      row.forEach((tile) => {
        tile.remove();
      });
    });
    grid.addRandomTile();
    grid.addRandomTile();
  }

  reload(gridMatrix) {
    gridMatrix.forEach((row, x) => {
      row.forEach((columnValue, y) => {
        if (columnValue) {
          this.setTileValue(x, y, columnValue);
        } else {
          this.removeTile(x, y);
        }
      });
    });
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
    const result = this.lockedTiles.find((element) => {
      return element[0] === x && element[1] === y;
    });

    return !!(result && result.length > 0);
  }

  lockTile(x, y) {
    this.lockedTiles.push([x, y]);
  }

  clearLocks() {
    this.lockedTiles = [];
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