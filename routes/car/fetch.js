import Car from "../../models/car.js"
import CorporateCarPricing from "../../models/corporate_car_pricing.js"
import CorporateSettings from "../../models/corporate_settings.js";
import authMiddlewares from "../../middlewares/auth.js";
function carFetchRouter(router) {
    const car = new Car()
    const corporateCarPricing = new CorporateCarPricing();
    const corporateSettings = new CorporateSettings();
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
          
          const results = await car.findBy(filters)
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })


    router.get('/:id', authMiddlewares.authenticatePrefix, async (req, res) => {
      try {

        const {params, query } = req
        
        let results 

        if (req.prefix) {
          const settings = await corporateSettings.findOneBy({table_prefix: req.tablePrefix})
          results = await corporateCarPricing.availableCars(params.id, settings.id)
        }else{
          results = await car.findOneBy({id: params.id})
        }
        return res.json({
            data: results,
            error: null,
          })
      } catch (error) {
        console.log(error)
      }
    })

    router.get('/corporate/vehicles', authMiddlewares.authenticatePrefix, async (req, res) => {
      try {

        const { query } = req
        const { page, limit, ...filterRest } = req.query;

        const filters = { ...filterRest }

        const options = {};
        if (page) options.page = parseInt(page, 10);
        if (limit) options.limit = parseInt(limit, 10);

        const settings = await corporateSettings.findOneBy({table_prefix: req.tablePrefix})

        const results = await corporateCarPricing.availableFindCars(settings.corporate_id, filters, options)
        return res.json({
            data: results,
            error: null,
          })
      } catch (error) {
        console.log(error)
      }
    })


}

export default carFetchRouter