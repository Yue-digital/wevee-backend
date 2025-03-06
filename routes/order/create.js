import Order from "../../models/orders.js"
import authMiddlewares from "../../middlewares/auth.js"
import { userFindbyID } from "../../models/user.js"
import { orderConfirmation } from "../../email/order-confirmation.js"
import sgMail from "@sendgrid/mail"
import Employee from "../../models/employee.js"
import { orderNotification } from "../../email/order-notification.js"
import Corporate from "../../models/corporate.js"
import CorporateSettings from "../../models/corporate_settings.js"
import Subdealer from "../../models/subdealer.js"
function OrderCreateRouter(router) {
    const order = new Order()
    const employee = new Employee()
    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()
    const subdealer = new Subdealer()
    router.post('/', authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

          const { body } = req
          const results = await order.createOrder(body, req.tablePrefix)
          const user = await userFindbyID(body.user_id, req.tablePrefix)
          const employerUsers = await employee.fetchEmployee(req.tablePrefix, {status: 1}, {limit: 9999})
          const employerEmails = employerUsers.map(e => e.email)
          let msg

          const corSetting = await corporateSettings.findOneBy({ table_prefix: req.tablePrefix })
          const corporateData = await corporate.findOneBy({id: corSetting.corporate_id})
          const subData = await subdealer.findOneBy({id: corporateData.sub_dealer_id})
            
          if (user) {

            let subject = {
                en: "Order under Review",
                de: 'Vielen Dank für Ihre Bestellung'
            }
            msg = {
                to: user.email, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: subject[subData.language],
                text: 'WeVee',
                html: orderConfirmation({
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

        if (employerEmails.length != 0) {
            let msgEmployer = {
                to: employerEmails, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: 'New Order',
                text: 'WeVee',
                html: orderNotification({
                    logo: subData.logo
                }),
            }

            sgMail
            .send(msgEmployer)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error.response.body)
            })

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

export default OrderCreateRouter