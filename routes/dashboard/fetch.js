import Portal from "../../models/portal_user.js"
function dashboardFetchRouter(router) {
    const portal = new Portal()
    router.get('/', async (req, res) => {
        try {

          const { orderby, orderKey, ...filterRest} = req.query

          const filters = { ...filterRest }
  
          if(orderKey && orderby){
            filters.order = {
              key: orderKey,
              by: orderby
            }
          }
          
          const results = await portal.findBy(filters)
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })


    router.get('/:id', async (req, res) => {
      try {

        const { body, params } = req
        
        const results = await portal.findOneBy({id: params.id})
        return res.json({
            data: results,
            error: null,
          })
      } catch (error) {
        console.log(error)
      }
  })
}

export default dashboardFetchRouter