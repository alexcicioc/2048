class Movement {

  /**
   * @param {Grid} grid 
   */
  constructor(grid) {
    this.grid = grid;
  }

  go(direction) {
    let moved = false;
    while (this[direction]()) {
      moved = true;
    }

    return moved;
  }

  down() {
    console.log('moved down');
    let movementHappened = false;

    for (let y = 0; y < 4; y++) {
      for (let x = 2; x >= 0; x--) {
        movementHappened = this.mergeTiles(x, y, x + 1, y) ? true : movementHappened;
      }
    }

    return movementHappened;
  };

  up() {
    console.log('moved up');
    let movementHappened = false;
    for (let y = 0; y < 4; y++) {
      for (let x = 1; x < 4; x++) {
        movementHappened = this.mergeTiles(x, y, x - 1, y) ? true : movementHappened;
      }
    }

    return movementHappened;
  };

  right() {
    console.log('moved right');
    let movementHappened = false;
    for (let x = 0; x < 4; x++) {
      for (let y = 2; y >= 0; y--) {
        movementHappened = this.mergeTiles(x, y, x, y + 1) ? true : movementHappened;
      }
    }

    return movementHappened;
  };

  left() {
    let movementHappened = false;
    for (let x = 0; x < 4; x++) {
      for (let y = 1; y < 4; y++) {
        movementHappened = this.mergeTiles(x, y, x, y - 1) ? true : movementHappened;
      }
    }

    return movementHappened;
  };

  canMergeTiles(x1, y1, x2, y2) {
    const currentValue = this.grid.getTileValue(x1, y1);
    const nextValue = this.grid.getTileValue(x2, y2);

    if (this.grid.isTileLocked(x1, y1) || currentValue === 0) {
      return false;
    }

    if (currentValue === nextValue || nextValue === 0) {
      return true;
    }

    return false;
  }

  mergeTiles(x1, y1, x2, y2) {
    const currentTileValue = this.grid.getTileValue(x1, y1);
    const nextTileValue = this.grid.getTileValue(x2, y2);

    if (this.canMergeTiles(x1, y1, x2, y2)) {

      if (nextTileValue > 0) {
        this.grid.lockTile(x2, y2);
      }

      this.grid.setTileValue(x2, y2, currentTileValue + nextTileValue);
      this.grid.removeTile(x1, y1);
      return true;
    }

    return false;
  }
}
