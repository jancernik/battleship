export function getCoordsAttr(element) {
  const attr = element.getAttribute('coords');
  const numbers = attr.replace(/\D/g, '');
  return Array.from(numbers, Number);
}

export function getElementByCoords(id, coords) {
  const string = JSON.stringify(coords).replaceAll(',', ', ');
  return document.querySelector(`#${id} [coords='${string}']`);
}

export function getRandomCoords() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
}

export function getRandomOrientation() {
  return Math.random() < 0.5 ? 'x' : 'y';
}
