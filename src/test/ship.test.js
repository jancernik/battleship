import Ship from '../app/factories/ship';

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(3);
  });

  test('Create ship', () => {
    expect(ship).toEqual({
      length: 3,
      hits: [],
    });
  });

  test('Hit ship', () => {
    ship.hit([6, 0]);
    expect(ship.hits).toEqual([[6, 0]]);
  });

  test('It is sunk', () => {
    ship.hit(2, 5);
    ship.hit(3, 5);
    ship.hit(4, 5);
    expect(ship.isSunk()).toEqual(true);
  });

  test('It is not sunk', () => {
    ship.hit(2, 5);
    ship.hit(4, 5);
    expect(ship.isSunk()).toEqual(false);
  });
});
