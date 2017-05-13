const _ = require('ramda')

// Exercise 1 //

// var words = function(str) {
//   return _.split(' ', str)
// }

const words = _.split(' ')

// console.log(words('сегодня я вышел на прогулку в похмелье'))

// Exercise 1a //

// const strings = ['Ночью я вышел', 'на прогулку', 'шел в темноте', 'по переулку']

const sentences = _.map(words)

// console.log(sentences(strings))

// Exercise 2 //

// var filterQs = function(xs) {
//   return _.filter(function(x) {
//     return _.match(/q/i, x)
//   }, xs)
// }

const filterQs = _.filter(_.match(/q/i));

console.log(filterQs('im not queing any q'))
