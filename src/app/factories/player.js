import Gameboard from './gameboard';

export default class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  placeShip(length, orientation, coords) {
    return this.gameboard.placeShip(length, orientation, coords);
  }

  get placedShips() {
    return this.gameboard.ships.length;
  }
}
