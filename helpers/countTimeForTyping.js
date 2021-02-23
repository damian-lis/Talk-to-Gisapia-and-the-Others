export default (textLength, speed) => {
  const result = textLength * speed

  return result > 2500 ? 2500 : result < 1000 ? 1000 : result
}
