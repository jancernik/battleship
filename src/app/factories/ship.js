export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit(num) {
    this.hits.push(num);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}
