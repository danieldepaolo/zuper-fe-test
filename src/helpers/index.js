export const tableSortMethod = (a, b, desc) => {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? '' : a
  b = b === null || b === undefined ? '' : b
  // force any string values to lowercase
  a = typeof a === 'string' ? a.toLowerCase() : a
  b = typeof b === 'string' ? b.toLowerCase() : b
  // Return either 1 or -1 to indicate a sort priority
  a = Number(a) || a
  b = Number(b) || b
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  // returning 0, undefined or any falsey value will use subsequent sorts or
  // the index as a tiebreaker
  return 0
};
