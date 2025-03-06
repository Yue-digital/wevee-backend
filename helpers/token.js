import jwt from 'jsonwebtoken'

const tokenize = data => {

  const privateKey = process.env.JWT_SECRET_KEY
  return jwt.sign(data, privateKey, {
    expiresIn: '30d'
  })
}

const verify = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (err) {
    throw new Error('Invalid token')
  }
}


const tokenizeLogin = data => {

  const privateKey = process.env.JWT_SECRET_KEY
  return jwt.sign(data, privateKey, {
    expiresIn: '10m'
  })
}

export default {
  tokenize,
  verify,
  tokenizeLogin
}
