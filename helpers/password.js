import bcryt from 'bcrypt'

export function encrypt(plainText, saltRounds = 10) {
  return bcryt.hashSync(plainText, saltRounds)
}

export function compare(plainText, encrypted) {
  return bcryt.compareSync(plainText, encrypted)
}

