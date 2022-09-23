import Game from './game';
import UI from './UI';
import global from './global';

export default class BindEvent {
  static gameboard() {
    document.getElementById('player-board').addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) Game.placeShip(e.target);
    });

    document.getElementById('computer-board').addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) Game.makePlayerPlay(e.target);
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      Game.changeOrientation();
      UI.removeHoverEffect();
      UI.renderHoverEffect(
        e.target,
        global.shipsToPlace[global.selectedShip],
        global.orientation,
        true
      );
    });

    document.querySelectorAll('#player-board .cell').forEach((cell) => {
      cell.addEventListener('mouseover', (e) => {
        UI.renderHoverEffect(
          e.target,
          global.shipsToPlace[global.selectedShip],
          global.orientation,
          true
        );
      });
      cell.addEventListener('mouseout', (e) => {
        UI.renderHoverEffect(
          e.target,
          global.shipsToPlace[global.selectedShip],
          global.orientation,
          false
        );
      });
    });
  }

  static markers() {
    document.querySelectorAll('.ship-marker.player').forEach((marker) => {
      marker.addEventListener('click', (e) => {
        if (!e.target.parentElement.classList.contains('placed')) {
          Game.selectShip(e.target.parentElement);
        }
      });
    });
  }
}
