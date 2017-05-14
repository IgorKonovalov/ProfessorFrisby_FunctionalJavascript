const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const fromNullable = x => (x !== null ? Right(x) : Left(null))

/// EXAMPLES from https://egghead.io/lessons/javascript-a-collection-of-either-examples-compared-to-imperative-code

const openSite = () => {
  if (current_user) {
    return renderPage(current_user)
  } else {
    return showLogin()
  }
}

const openSiteF = () => fromNullable(current_user).fold(showLogin, renderPage)

/////////////

const getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences)
  } else {
    return defaultPrefs
  }
}

const getPrefsF = user =>
  (user.premium ? Right(user) : Left('not premium'))
    .map(u => u.preferences)
    .fold(() => defaultPrefs, prefs => loadPrefs(prefs))

/////////////

const streetName = user => {
  const address = user.address
  if (address) {
    const street = adress.street
    if (street) {
      return street.name
    }
  }
  return 'no street'
}

const streetNameF = user =>
  fromNullable(user.address)
    .chain(a => fromNullable(a.street))
    .map(s => s.name)
    .fold(e => 'no street', n => n)

/////////////

const concatUniq = (x, ys) => {
  const found = ys.filter(y => y === x)[0]
  return found ? ys : ys.concat(x)
}

const concatUniqF = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0]).fold(() => ys.concat(x), y => ys)

/////////////

const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath)
    } catch (e) {}
  }
  return example
}

const readFile = x => tryCatch(() => fs.readFileSync(x))

const wrapExamplesF = example =>
  fromNullable(example.previewPath)
    .chain(readFile)
    .fold(() => example, preview => Object.assign({}, example, {preview}))

/////////////

const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg)
    if (c.url) {
      return c.url.match(/some pattern/)
    }
  } catch (e) {
    return null
  }
}

const parseDbUrlF = cfg =>
  tryCatch(() => JSON.parse(cfg))
    .chain(c => fromNullable(c.url))
    .fold(e => null, u => u.match(/some pattern/))
