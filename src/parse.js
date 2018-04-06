import debug from 'debug'
const log = debug('twirl')
export default (strings, ...args) => {
  // merge all of the evaluated values from the template literal
  return strings
    .reduce((acc, string, i) => {
      acc.push(string)

      if (args[i]) acc.push(args[i].toString())

      return acc
    }, [])
    // transform the array into an array of css rules, one per string
    .join('')
    .replace(/ /g, '')
    .split(/;|\n/)
    .reduce((acc, rule) => {
      // early return for empty rules
      if (!rule) return acc

      const pair = rule.split(':')
      pair[0] = pair[0].replace(/\-([a-z])/g, (c) => c[1].toUpperCase())
      acc[pair[0]] = pair[1]
      return acc
    }, {})
}
