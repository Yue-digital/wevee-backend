import authMiddlewares from "../../middlewares/auth.js";
import Corporate from "../../models/corporate.js";
import CorporateSettings from "../../models/corporate_settings.js";

export default function updateCorporateRouter(router){

    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()

    router.put('/:id', 
    authMiddlewares.authenticatePrefix, 
    authMiddlewares.authenticate, 
    async (req, res) => {
        try {
            
            const { params, body } = req
            const { settings, ...data } = body

            const result = await corporate.update(params.id, data)

            if (settings) {
                await corporateSettings.updateByCorporateId(params.id, {...settings})
            }

            return res.json({
                data: result,
                error: null,
            });
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