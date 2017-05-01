const nextCharFromNumberString = str => {
	const trimmed = str.trim()
	const number = parseInt(trimmed)
	const nextNumber = number + 1
	return String.fromCharCode(nextNumber)
}

const nextCharFromNumberStringMap = str =>
	[str]
		.map(s => s.trim())
		.map(n => new Number(n))
		.map(n => n + 1)
		.map(n => String.fromCharCode(n))

const Box = x => ({
	map: f => Box(f(x)),
	inspect: () => `Box(f(x))`,
  fold: f => f(x)
})

const nextCharFromNumberStringBox = str =>
	Box(str)
		.map(s => s.trim())
		.map(n => new Number(n))
		.map(n => n + 1)
		.map(n => String.fromCharCode(n))
    .fold(c  => c)

console.log('1', nextCharFromNumberString(' 64'))

console.log('2', nextCharFromNumberStringMap(' 64'))

const result = nextCharFromNumberStringBox(' 64')
console.log('3', result)
