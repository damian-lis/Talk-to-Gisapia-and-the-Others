export default (textLength) => {
  let result
  if (textLength < 20) {
    result = 1
  } else if (textLength < 80) {
    result = 2
  } else if (textLength >= 80) {
    result = 3
  }

  return result
}
