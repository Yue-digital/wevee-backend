import Car from "../../models/car.js"
function carUpdateRouter(router) {
    const car = new Car()
    router.put('/:id', async (req, res) => {
        try {

          const { body, params } = req
          const results = await car.update(params.id, body)
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })
}

export default carUpdateRouter