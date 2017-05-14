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

const filterQs = _.filter(_.match(/q/i))

// console.log(filterQs('im not queing any q'))

// Exercise 3 //

// var max = function(xs) {
//   return _.reduce(
//     function(acc, x) {
//       return _keepHighest(acc, x)
//     },
//     -Infinity,
//     xs
//   )
// }

const _keepHighest = (x, y) => (x >= y ? x : y)

const max = _.reduce(_keepHighest, -Infinity)

// console.log('max', max([1, 2, 3, 4, 5]))

// Bonus 1 //

// Wrap slice to b functional and curried

// [1, 2, 3].slice(0, 2)

const slice = _.curry((start, end, xs) => xs.slice(start, end))

// Bonus 2 //

// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].

const take = slice(0)

console.log(take(3)([1, 3, 4, 6]))
