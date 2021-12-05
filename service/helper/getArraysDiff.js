function getArraysDiff (array01, array02) {
  const arr01 = [...new Set(array01)]
  const arr02 = [...new Set(array02)]
  return [...arr01, ...arr02].filter(value => !arr01.includes(value) || !arr02.includes(value))
}

module.exports = getArraysDiff
