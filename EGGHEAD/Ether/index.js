// pure functional error handling, functional OR

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const result = Left(2)
  .map(x => x + 1)
  .map(x => x / 2)
  .fold(x => 'error', x => x)

console.log(result)

const fromNullable = x => (x !== null ? Right(x) : Left(null))

const findColor = name =>
  fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name])

const result2 = findColor('red')
  .map(c => c.slice(1))
  .fold(e => 'no color', c => c.toUpperCase())

console.log(result2)
