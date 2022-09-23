import Player from '../app/factories/player';

describe('Player', () => {
  let player;
  let computer;
  beforeEach(() => {
    player = new Player();
    player.gameboard.placeShip(3, 'x', [1, 1]);
    player.gameboard.placeShip(5, 'y', [6, 4]);
    computer = new Player();
    computer.gameboard.placeShip(5, 'x', [2, 3]);
    computer.gameboard.placeShip(3, 'y', [9, 6]);
  });

  test('Send attack to computer (missed)', () => {
    computer.gameboard.receiveAttack([7, 5]);
    expect(computer.gameboard.missed).toEqual([[7, 5]]);
    expect(computer.gameboard.ships[0].hits).toEqual([]);
    expect(computer.gameboard.ships[1].hits).toEqual([]);
  });

  test('Send attack to computer (hit)', () => {
    computer.gameboard.receiveAttack([9, 6]);
    expect(computer.gameboard.missed).toEqual([]);
    expect(computer.gameboard.ships[0].hits).toEqual([]);
    expect(computer.gameboard.ships[1].hits).toEqual([[9, 6]]);
  });

  test('Send attack to player (missed)', () => {
    player.gameboard.receiveAttack([0, 9]);
    expect(player.gameboard.missed).toEqual([[0, 9]]);
    expect(player.gameboard.ships[0].hits).toEqual([]);
    expect(player.gameboard.ships[1].hits).toEqual([]);
  });

  test('Send attack to player (hit)', () => {
    player.gameboard.receiveAttack([1, 1]);
    expect(player.gameboard.missed).toEqual([]);
    expect(player.gameboard.ships[0].hits).toEqual([[1, 1]]);
    expect(player.gameboard.ships[1].hits).toEqual([]);
  });
});
