import { createOne } from "../../models/admin.js"
import { encrypt } from "../../helpers/password.js"
function adminCreateRouter(router) {
    router.post('/', async (req, res) => {
        try {
            const { body } = req
            body.password = encrypt(body.password)
            
            const results = await createOne(body)
            return res.json({
                data: results,
                error: null,
            })
        } catch (error) {
            console.log(error)
        }
    })
}

export default adminCreateRouter