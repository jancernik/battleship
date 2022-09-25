import global from './global';
import UI from './UI';
import {
  getCoordsAttr,
  getRandomCoords,
  getRandomOrientation,
  getElementByCoords,
} from './helpers';

export default class Game {
  static player;

  static computer;

  static placeComputerShips() {
    while (this.computer.placedShips < global.shipsToPlace.length) {
      const length = global.shipsToPlace[this.computer.placedShips];
      const orientation = getRandomOrientation();
      const coords = getRandomCoords();
      this.computer.gameboard.placeShip(length, orientation, coords);
    }
  }

  static placeShip(cell) {
    if (!global.allShipsPlaced) {
      const length = global.shipsToPlace[global.selectedShip];
      const coords = getCoordsAttr(cell);
      const x = this.player.placeShip(length, global.orientation, coords);
      document.querySelector('.subtitle').innerText = '';
      if (this.player.placedShips === global.shipsToPlace.length) {
        global.allShipsPlaced = true;
        UI.animateComputerPlacement();
      }
      UI.renderPlayerShips(this.player.gameboard.shipsCoords);
      if (x) {
        UI.renderMarker(global.selectedShip);
        this.selectNextShip();
      }
    }
  }

  static changeOrientation() {
    if (global.orientation === 'x') global.orientation = 'y';
    else global.orientation = 'x';
  }

  static selectNextShip() {
    if (this.player.placedShips === global.shipsToPlace.length) {
      UI.removeMarkerSelection();
      return;
    }
    for (let i = 1; i <= global.shipsToPlace.length; i += 1) {
      let nextShip = global.selectedShip + i;
      if (nextShip >= global.shipsToPlace.length) nextShip = i - 1;
      const ship = document.querySelector(`.player[ship='${nextShip}']`);
      if (!ship.classList.contains('placed')) {
        this.selectShip(nextShip);
        return;
      }
    }
  }

  static selectShip(target) {
    if (typeof target === 'number') {
      const ship = document.querySelector(`.player[ship='${target}']`);
      global.selectedShip = target;
      UI.selectMarker(ship);
    } else {
      const number = parseInt(target.getAttribute('ship'), 10);
      global.selectedShip = number;
      UI.selectMarker(target);
    }
  }

  static makePlayerPlay(target) {
    if (
      global.allShipsPlaced &&
      global.isPLayerTurn &&
      global.animationFinished
    ) {
      const cellCoords = getCoordsAttr(target);
      if (target.classList.contains('water')) return;
      if (target.classList.contains('hit')) return;
      if (this.computer.gameboard.receiveAttack(cellCoords)) {
        UI.renderHit(target);
      } else {
        UI.renderWater(target);
      }
      global.isPLayerTurn = false;
      const computerBoard = document.getElementById('computer-board');
      computerBoard.classList.remove('selected');
      const playerBoard = document.getElementById('player-board');
      playerBoard.classList.add('selected');
      setTimeout(this.makeComputerPlay, 600);
    }
  }

  static makeComputerPlay() {
    const coords = getRandomCoords();
    const target = getElementByCoords('player-board', coords);
    if (Game.player.gameboard.receiveAttack(coords)) {
      UI.renderHit(target);
    } else UI.renderWater(target);
    global.isPLayerTurn = true;
    const playerBoard = document.getElementById('player-board');
    playerBoard.classList.remove('selected');
    const computerBoard = document.getElementById('computer-board');
    computerBoard.classList.add('selected');
  }
}
