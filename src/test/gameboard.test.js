import Gameboard from '../app/factories/gameboard';

describe('Gameboard', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('Place ship', () => {
    gameboard.placeShip(3, 'y', [0, 0]);
    expect(gameboard.shipsCoords).toEqual([
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    ]);
  });

  test('Place multiple ships', () => {
    gameboard.placeShip(3, 'x', [0, 0]);
    gameboard.placeShip(5, 'y', [7, 0]);
    gameboard.placeShip(2, 'x', [5, 5]);
    gameboard.placeShip(3, 'y', [1, 7]);
    expect(gameboard.shipsCoords).toEqual([
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [7, 0],
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
      ],
      [
        [5, 5],
        [6, 5],
      ],
      [
        [1, 7],
        [1, 8],
        [1, 9],
      ],
    ]);
  });

  test('Place ships at the edge of the gameboard', () => {
    gameboard.placeShip(2, 'x', [8, 2]);
    gameboard.placeShip(3, 'y', [3, 7]);
    expect(gameboard.shipsCoords).toEqual([
      [
        [8, 2],
        [9, 2],
      ],
      [
        [3, 7],
        [3, 8],
        [3, 9],
      ],
    ]);
  });

  test('Cannot place ships outside the gameboard', () => {
    gameboard.placeShip(3, 'x', [9, 9]);
    gameboard.placeShip(3, 'y', [9, 9]);
    gameboard.placeShip(4, 'x', [7, 5]);
    gameboard.placeShip(3, 'y', [5, 8]);
    expect(gameboard.shipsCoords).toEqual([]);
  });

  test('Cannot overlap ships', () => {
    gameboard.placeShip(4, 'x', [2, 4]);
    gameboard.placeShip(4, 'x', [1, 4]);
    gameboard.placeShip(4, 'x', [3, 4]);
    gameboard.placeShip(3, 'y', [3, 3]);
    gameboard.placeShip(2, 'y', [9, 7]);
    expect(gameboard.shipsCoords).toEqual([
      [
        [2, 4],
        [3, 4],
        [4, 4],
        [5, 4],
      ],
      [
        [9, 7],
        [9, 8],
      ],
    ]);
  });

  test('Receive an attack (missed)', () => {
    gameboard.placeShip(5, 'y', [7, 0]);
    gameboard.receiveAttack([4, 5]);
    gameboard.receiveAttack([2, 9]);
    expect(gameboard.missed).toEqual([
      [4, 5],
      [2, 9],
    ]);
  });

  test('Receive an attack (hit)', () => {
    gameboard.placeShip(5, 'y', [7, 0]);
    gameboard.receiveAttack([7, 2]);
    gameboard.receiveAttack([2, 9]);
    expect(gameboard.missed).toEqual([[2, 9]]);
    expect(gameboard.ships[0]).toEqual({
      length: 5,
      hits: [[7, 2]],
    });
  });

  test('Receive an attack (sunk)', () => {
    gameboard.placeShip(2, 'x', [8, 2]);
    gameboard.placeShip(3, 'y', [7, 0]);
    gameboard.receiveAttack([7, 0]);
    gameboard.receiveAttack([7, 1]);
    gameboard.receiveAttack([7, 2]);
    expect(gameboard.missed).toEqual([]);
    expect(gameboard.ships[1].isSunk()).toEqual(true);
    expect(gameboard.ships[1]).toEqual({
      length: 3,
      hits: [
        [7, 0],
        [7, 1],
        [7, 2],
      ],
    });
  });

  test('All ships have sunk', () => {
    gameboard.placeShip(2, 'x', [8, 2]);
    gameboard.placeShip(3, 'y', [7, 0]);
    gameboard.receiveAttack([7, 0]);
    gameboard.receiveAttack([7, 1]);
    gameboard.receiveAttack([7, 2]);
    gameboard.receiveAttack([8, 2]);
    gameboard.receiveAttack([9, 2]);
    expect(gameboard.isEveryShipSunk()).toEqual(true);
  });

  test('Not all ships have sunk', () => {
    gameboard.placeShip(2, 'x', [8, 2]);
    gameboard.placeShip(3, 'y', [7, 0]);
    gameboard.receiveAttack([7, 0]);
    gameboard.receiveAttack([7, 2]);
    gameboard.receiveAttack([8, 2]);
    gameboard.receiveAttack([9, 2]);
    expect(gameboard.isEveryShipSunk()).toEqual(false);
  });
});
