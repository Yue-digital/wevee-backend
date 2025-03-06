import Portal from "../../models/portal_user.js"
function dashboardUpdateRouter(router) {
    const portal = new Portal()
    router.put('/:id', async (req, res) => {
        try {

          const { body, params } = req
          const results = await portal.update(params.id, body)
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })
}

export default dashboardUpdateRouter