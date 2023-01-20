// Takes an array of items and chunk the items into a matrix.
// Useful for offset based pagination

export function chunk<T>(items: T[], chunk: number): T[][] {
  // Initialize matrix
  const chunks: T[][] = []

  // for loop; loop until i is more than our items available; increment by the given chunk;
  // each interaction copy push targeted chunk from the passed items to the chunks array
  for (let i = 0; i < items.length; i += chunk) {
    chunks.push(items.slice(i, i + chunk))
  }

  return chunks
}
