class Movement {

  constructor(grid) {
    this.grid = grid;
  }

  go(direction) {
    while (this[direction]()) { }
  }

  down() {
    console.log('moved down');
    let movementHappened = false;

    for (let y = 0; y < 4; y++) {
      for (let x = 2; x >= 0; x--) {
        movementHappened = this.grid.mergeTiles(x, y, x + 1, y) ? true : movementHappened;
      }
    }

    return movementHappened;
  };

  up() {
    console.log('moved up');
    let movementHappened = false;
    for (let y = 0; y < 4; y++) {
      for (let x = 3; x > 0; x--) {
        movementHappened = this.grid.mergeTiles(x, y, x - 1, y) ? true : movementHappened;
      }
    }

    return movementHappened;
  };

  right() {
    console.log('moved right');
    let movementHappened = false;
    for (let x = 0; x < 4; x++) {
      for (let y = 2; y >= 0; y--) {
        movementHappened = this.grid.mergeTiles(x, y, x, y + 1) ? true : movementHappened;
      }
    }

    return movementHappened;
  };


  left() {
    let movementHappened = false;
    for (let x = 0; x < 4; x++) {
      for (let y = 3; y > 0; y--) {
        movementHappened = this.grid.mergeTiles(x, y, x, y - 1) ? true : movementHappened;
      }
    }

    return movementHappened;
  };
}
