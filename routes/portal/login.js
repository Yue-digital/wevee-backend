import { createOne, fetchAdmin } from "../../models/admin.js"
import { compare } from "../../helpers/password.js"
import { default as tokenHelper } from './../../helpers/token.js'
function adminLoginRouter(router) {
    router.post('/login', async (req, res) => {
        try {
            const { body } = req
            
            const [user] = await fetchAdmin({username: body.username})

            if (!user) {
                return res.json({
                  data: null,
                  error: {
                    code: errors.BAD_REQUEST.code,
                    message: 'User not found'
                  }
                })
            }

            const authenticated = await compare('mikkotest', user.password)
            
            if (!authenticated) {
                return res.json({
                    data: null,
                    error: {
                        code: errors.BAD_REQUEST.code,
                        message: 'Incorrect Password'
                    }
                })
            }

            const data = {
                id: user.id,
                username: user.username
            }

            const token = tokenHelper.tokenize(data)
            
            return res.json({
                data: {
                    token,
                },
                error: null,
            })
        } catch (error) {
            console.log(error)
        }
    })
}

export default adminLoginRouter