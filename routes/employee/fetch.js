import Employee from "../../models/employee.js";
import authMiddlewares from "../../middlewares/auth.js";
import tokenHelper from "../../helpers/token.js";
import { magicLinkEmployer } from '../../email/magic-link-employer.js'

import sgMail from "@sendgrid/mail"
import Corporate from "../../models/corporate.js";
import CorporateSettings from "../../models/corporate_settings.js";
import Subdealer from "../../models/subdealer.js";

function EmployeeFetchRouter(router){

    const employee = new Employee()
    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()
    const subdealer = new Subdealer()
    router.get('/:id',authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

            const { params } = req
            
            const results = await employee.findOne({id: params.id}, req.tablePrefix)
            return res.json({
                data: results,
                error: null,
            })
        } catch (error) {
            console.log(error)
        }
    })

    router.post('/login', async (req, res) => {
        try {
        
        const { body } = req

        const token = await tokenHelper.tokenizeLogin({
            email: body.email,
            prefix: body.prefix,
        })
        const url = process.env.ADMIN_VERIFY

        const user = await employee.findOne({email: body.email}, body.prefix)
        let msg

        const corSetting = await corporateSettings.findOneBy({ table_prefix: body.prefix })
        const corporateData = await corporate.findOneBy({id: corSetting.corporate_id})
        const subData = await subdealer.findOneBy({id: corporateData.sub_dealer_id})


        if (user) {
            msg = {
                to: body.email, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: 'WeVee - Corporate Dashboard',
                text: 'WeVee',
                html: magicLinkEmployer({
                    url,
                    token,
                    logo: subData.logo,
                }),
            }
        }else{
            return res.json({
                data: {
                    login: false
                },
                error: null,
            })
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


            const user = await employee.findOne({email}, prefix)
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
                    role: 'admin'
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

export default EmployeeFetchRouter