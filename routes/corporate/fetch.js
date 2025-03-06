import authMiddlewares from "../../middlewares/auth.js";
import Corporate from "../../models/corporate.js";
import CorporateSettings from "../../models/corporate_settings.js";
import Subdealer from "../../models/subdealer.js";


function CorporateFetchRouter(router){

    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()
    const subdealer = new Subdealer()

    router.get('/', authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

            const { params } = req
            
            const corSettings = await corporateSettings.findOneBy({table_prefix: req.tablePrefix})

            const results = await corporate.findOneBy({id: corSettings.corporate_id})
            return res.json({
                data: {
                    ...results,
                    logo: corSettings.logo
                },
                error: null,
            })
        } catch (error) {
            console.log(error)
            return res.json({
                data: null,
                error: {
                  message: "Something went wrong",
                },
              });
        }
    })

    router.get('/setting', async (req, res) => {
        try {

            const { params, query } = req
            
            const corSettings = await corporateSettings.findOneBy({table_prefix: query.prefix})
            const corData = await corporate.findOneBy({id: corSettings.corporate_id})
            const subData = await subdealer.findOneBy({id: corData.sub_dealer_id})

            return res.json({
                data: {
                    ...corSettings,
                    calculation_method: subData.calculation_method || null
                },
                error: null,
            })
        } catch (error) {
            console.log(error)
            return res.json({
                data: null,
                error: {
                  message: "Something went wrong",
                },
              });
        }
    })


}

export default CorporateFetchRouter