import { userFindbyID, userUpdate } from "../../models/user.js"
import authMiddlewares from "../../middlewares/auth.js"
function userUpdateRouter(router) {
    router.put('/:id', authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

          const { params, body } = req
          const results = await userUpdate(params.id, body, req.tablePrefix)
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })
}

export default userUpdateRouter