import Car from "../../models/car.js"
function carCreateRouter(router) {
    const car = new Car()
    router.post('/', async (req, res) => {
        try {

          const { body } = req
          const results = await car.createOne(body)
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })
}

export default carCreateRouter