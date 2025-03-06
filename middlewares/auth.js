import tokenHelper from '../helpers/token.js'


function authenticate(req, res, next) {
  const { headers } = req

  const { authorization } = headers

  if (!authorization) {
    return res.json({
      data: null,
      error: {
        message: 'Access is not allowed'
      }
    })
  }

  try {
    const decoded = tokenHelper.verify(authorization)
    const {
      id,
      email
    } = decoded

    req.user = {
      id,
      email
    }
  } catch (err) {
    return res.json({
      data: null,
      error: {
        message: 'Access is not allowed'
      }
    })
  }

  next()
}


function authenticatePrefix(req, res, next) {
  const { headers } = req

  const { authorization } = headers

  if (!authorization) {
    return res.json({
      data: null,
      error: {
        message: 'Access is not allowed'
      }
    })
  }

  try {
    const decoded = tokenHelper.verify(authorization)
    const {
      prefix,
    } = decoded

    req.tablePrefix = prefix
  } catch (err) {
    return res.json({
      data: null,
      error: {
        message: 'Access is not allowed'
      }
    })
  }

  next()
}
const authMiddlewares = {
  authenticate,
  authenticatePrefix
}

export default authMiddlewares
