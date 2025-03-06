import Order from "../../models/orders.js"
import authMiddlewares from "../../middlewares/auth.js"
import { orderApproved } from '../../email/order-approve.js'
import { orderRejected } from '../../email/order-rejected.js'
import sgMail from "@sendgrid/mail"
import { userFindbyID } from "../../models/user.js"
import Corporate from "../../models/corporate.js"
import CorporateSettings from "../../models/corporate_settings.js"
import Subdealer from "../../models/subdealer.js"
function OrderUpdateRouter(router) {
    const order = new Order()
    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()
    const subdealer = new Subdealer()
    router.put('/:id', authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

          const { body, params } = req
          const results = await order.updateOrder(params.id, body, req.tablePrefix)
          const orderData = await order.availableFindOrder(params.id, req.tablePrefix)

          const user = await userFindbyID(orderData.user_id, req.tablePrefix)
          let msg

          const corSetting = await corporateSettings.findOneBy({ table_prefix: req.tablePrefix })
          const corporateData = await corporate.findOneBy({id: corSetting.corporate_id})
          const subData = await subdealer.findOneBy({id: corporateData.sub_dealer_id})

          let subject = {
            en: "Order Status",
            de: 'Aktualisierung der Bestellung'
          }

          if (body.status == 'approved' || body.status == 'Approved') {
            if (user) {
              msg = {
                to: user.email, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: subject[subData.language],
                text: 'WeVee',
                html: orderApproved({
                  logo: subData.logo,
                  lang: subData.language
                }),
            }

            sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error.response.body)
            })
            }
          }


          if (body.status == 'rejected' || body.status == 'Rejected') {
            if (user) {
              msg = {
                to: user.email, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: subject[subData.language],
                text: 'WeVee',
                html: orderRejected({
                  logo: subData.logo,
                  lang: subData.language
                }),
            }

            sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error.response.body)
            })
            }
          }
          return res.json({
              data: results,
              error: null,
            })
        } catch (error) {
          console.log(error)
        }
    })
}

export default OrderUpdateRouter