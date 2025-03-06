import Order from "../../models/orders.js";
import authMiddlewares from "../../middlewares/auth.js";
import Car from "../../models/car.js";
function OrderFetchRouter(router){

    const order = new Order()
    router.get('/',authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

            const { limit, page, orderby, orderKey, ...filterRest} = req.query

            const options = {};
            if (page) options.page = parseInt(page, 10);
            if (limit) options.limit = parseInt(limit, 10);
            const filters = { ...filterRest }
    
            if(orderKey && orderby){
                filters.order = {
                key: orderKey,
                by: orderby
                }
            }
            
            let results = await order.fetchOrders(req.tablePrefix, filters, options)

            if (results.length != 0) {
                
                const response = await results.map(async (item, index) => {
                    const car = new Car();
                    let carData = await car.findOneBy({id: item.car_id})
                    item.car = carData
                    // console.log(results[index])

                    return item
                })

                results = await Promise.all(response)
            }
            return res.json({
                data: results,
                error: null,
              })

        } catch (error) {
            console.log(error)
        }
    })

    router.get('/:id',authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

            const { params } = req
            
            const results = await order.availableFindOrder(params.id, req.tablePrefix)
            return res.json({
                data: results,
                error: null,
            })
        } catch (error) {
            console.log(error)
        }
    })

}

export default OrderFetchRouter