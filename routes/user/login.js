import sgMail from "@sendgrid/mail"
import tokenHelper from '../../helpers/token.js'
import { userFindbyEmail } from "../../models/user.js"
import { magicLink } from "../../email/magic-link.js"
import { welcomeEmail } from "../../email/welcome.js"
import Employee from "../../models/employee.js"
import { newUserNotification } from "../../email/new-user-notification.js"
import Subdealer from "../../models/subdealer.js"
import CorporateSettings from "../../models/corporate_settings.js"
import Corporate from "../../models/corporate.js"
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
function loginRouter(router) {
    const employee = new Employee()
    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()
    const subdealer = new Subdealer()

    router.post('/login', async (req, res) => {
        try {
        
        const { body } = req

        const token = await tokenHelper.tokenizeLogin({
            email: body.email,
            prefix: body.prefix,
        })


        const corSetting = await corporateSettings.findOneBy({ table_prefix: body.prefix })
        const corporateData = await corporate.findOneBy({id: corSetting.corporate_id})
        const subData = await subdealer.findOneBy({id: corporateData.sub_dealer_id})

        const url = `${process.env.VERIFY_URL}`

        const user = await userFindbyEmail(body.email, body.prefix)
        let msg

        if (user) {
            msg = {
                to: body.email, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: 'Sign in to the WeVee Marketplace',
                text: 'WeVee',
                html: magicLink({
                    url,
                    token,
                    logo: subData.logo,
                    lang: subData.language
                }),
            }
        }else{
            msg = {
                to: body.email, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: 'Create your WeVee Marketplace account',
                text: 'WeVee',
                fromname: "Wevee",
                html: welcomeEmail({
                    url: `${process.env.REGISTER_URL}/${body.prefix}`,
                    logo: subData.logo,
                    lang: subData.language
                }),
            }

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
    
         return res.json({
             data: 1,
             error: null,
           })
        } catch (error) {
            console.log(error)
          return res.json({
            data: null,
            error: {
              message: 'Something went wrong'
            }
          })
        }
    })

    router.post('/verify', async (req, res) =>{

        try {

            const { body } = req

            const decoded = await tokenHelper.verify(body.token)
            const {
            email,
            prefix
            } = decoded


            const user = await userFindbyEmail(email, prefix)
            let token

            if (user) {
                token = await tokenHelper.tokenize({
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    prefix: prefix
                })
            }

            return res.json({
                data: {
                    new_user: (user ? false : true),
                    token: token || false,
                    prefix,
                    role: 'user'
                },
                error: null,
              })
        } catch (error) {
            
            return res.json({
                data: null,
                error: {
                  message: error.toString()
                }
            })
        }
    })

}

export default loginRouter