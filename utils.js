
export function generateArray(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

export function generateArrayRandom(min, max, length) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(Math.ceil(Math.random() * (max - min) + min));
  }

  return result;
}
