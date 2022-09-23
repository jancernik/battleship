import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.shipsCoords = [];
    this.missed = [];
  }

  placeShip(length, orientation, coords) {
    const fullCoords = Gameboard.getFullCoords(length, orientation, coords);
    if (this.isPossible(fullCoords)) {
      const ship = new Ship(length);
      this.ships.push(ship);
      this.shipsCoords.push(fullCoords);
      return true;
    }
    return false;
  }

  isPossible(fullCoords) {
    const storedCoords = JSON.stringify(this.shipsCoords);
    for (let i = 0; i < fullCoords.length; i += 1) {
      const newCoords = JSON.stringify(fullCoords[i]);
      if (storedCoords.includes(newCoords) || newCoords.includes('10')) {
        return false;
      }
    }
    return true;
  }

  static getFullCoords(length, orientation, targetCoords) {
    const shipArray = [];
    for (let i = 0; i < length; i += 1) {
      if (orientation === 'x') {
        shipArray.push([targetCoords[0] + i, targetCoords[1]]);
      } else if (orientation === 'y') {
        shipArray.push([targetCoords[0], targetCoords[1] + i]);
      }
    }
    return shipArray;
  }

  receiveAttack(attackCoords) {
    for (let i = 0; i < this.shipsCoords.length; i += 1) {
      if (
        JSON.stringify(this.shipsCoords[i]).includes(
          JSON.stringify(attackCoords),
        )
      ) {
        this.ships[i].hit(attackCoords);
        return true;
      }
    }
    this.missed.push(attackCoords);
    return false;
  }

  isEveryShipSunk() {
    for (let i = 0; i < this.ships.length; i += 1) {
      if (!this.ships[i].isSunk()) return false;
    }
    return true;
  }
}
