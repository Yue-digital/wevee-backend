import Portal from "../../models/portal_user.js"
function dashboardCreateRouter(router) {
    const portal = new Portal()
    router.post('/', async (req, res) => {
        try {

          const { body } = req
          const results = await portal.createOne(body)
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })
}

export default dashboardCreateRouter