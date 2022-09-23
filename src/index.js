import './style/style.scss';
import global from './app/global';
import Game from './app/game';
import UI from './app/UI';
import Player from './app/factories/player';
import BindEvent from './app/listeners';

Game.player = new Player();
Game.computer = new Player();
Game.placeComputerShips();
// Game.placePlayerShips();
UI.createGameboard('player-board');
UI.createGameboard('computer-board');
UI.renderPlayerShips(Game.player.gameboard.shipsCoords);
UI.renderMarkers(global.shipsToPlace);
Game.selectShip(0);
BindEvent.gameboard();
BindEvent.markers();
