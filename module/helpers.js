/** @module helpers */

/**
 * Register Handlebars helper to concatenate strings.
 * @param {...string} arguments - The strings to be concatenated.
 * @returns {string} The concatenated string.
 */
Handlebars.registerHelper("concat", function() {
  let str = "";
  for(let arg in arguments){
    if(typeof arguments[arg] != "object"){
      str += arguments[arg];
    }
  }
  return str;
});

/**
 * Register Handlebars helper to perform comparisons.
 * @param {string} operator - A string representation of a comparison operator.
 * @param {...*} var_args - An array of arguments containing a string representation of the comparison operator, the booleans to be compared, and optionally an object containing the HTML block from Handlebars.
 * @returns {boolean} The outcome of the comparison operations.
 */
Handlebars.registerHelper("cond", function(...var_args) {
  if (typeof(var_args.slice(-1)[0]) === "object") var_args.pop();
  const operator = var_args[0];
  return var_args.slice(1)
    .map(x => {if (x) { return true } else { return false }})
    .reduce(_compare);
  
  function _compare(v1, v2) {
    switch (operator) {
      case '==': return (v1 == v2);
      case '===': return (v1 === v2);
      case '!=': return (v1 != v2);
      case '!==': return (v1 !== v2);
      case '<': return (v1 < v2);
      case '<=': return (v1 <= v2);
      case '>': return (v1 > v2);
      case '>=': return (v1 >= v2);
      case '&&': return (v1 && v2);
      case '||': return (v1 || v2);
      default: throw new Error(`The '${operator}' operator is not recognized.`);
    }
  };
});

/**
 * Translated a number into a string representation of that number in the local format.
 * @param {number} num - The number to be converted.
 * @returns {string} The string representing the provided number in local format.
 */
Handlebars.registerHelper("localnum", function(num) {
  return num.toLocaleString();
});

/**
 * Invert the given boolean value.
 * @param {boolean} - The boolean value to invert.
 * @returns {boolean} The inverted boolean value.
 */
Handlebars.registerHelper("not", function(arg) {
  if (arg) return !arg;
});

/**
 * Repeat a section of code n times.
 * @param {number} n - The number of times to repeat the code block.
 * @param {Block} block - The Handlebars block.
 * @returns {string} A string of the repeated HTML code.
 */
Handlebars.registerHelper("times", function(n, block) {
  let accum = "";
  for (let i = 0; i < n; i++) accum += block.fn(i);
  return accum;
});