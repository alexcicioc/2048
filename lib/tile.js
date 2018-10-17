class Tile {
  constructor(x, y, element, value = 0) {
    this.x = x;
    this.y = y;
    this.element = element;
    this.value = value;
    this.lockTile = false;
  }

  setValue(value) {
    this.transition(value);
    this.value = parseInt(value);
  }

  getValue() {
    return this.value;
  }

  remove() {
    this.element
      .fadeOut('fast')
      .removeClass(`tile-${this.value}`)
      .text('')
      .show();
    this.value = 0;
  }

  transition(newValue) {
    this.element
      .hide()
      .removeClass(`tile-${this.value}`)
      .addClass(`tile-${newValue}`)
      .text(newValue)
      .fadeIn('fast');
  }

  isLocked() {
    return this.lockTile;
  }

  lock() {
    this.lockTile = true;
  }

  unlock() {
    this.lockTile = false;
  }
}
