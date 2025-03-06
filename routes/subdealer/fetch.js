import authMiddlewares from "../../middlewares/auth.js";
import tokenHelper from "../../helpers/token.js";
import { magicLink } from "../../email/magic-link.js";
import { welcomeEmail } from "../../email/welcome.js"
import Subdealer from "../../models/subdealer.js";
import Corporate from "../../models/corporate.js";
import sgMail from "@sendgrid/mail"
import CorporateSettings from "../../models/corporate_settings.js";
import Order from "../../models/orders.js";
import Car from "../../models/car.js";
import { magicLinkSubdealer } from '../../email/magic-link-subdealer.js'

function SubdealerFetchRouter(router){

    const subdealer = new Subdealer()
    const corporate = new Corporate()
    const corporateSettings = new CorporateSettings()
    const order = new Order()
    // router.get('/:id',authMiddlewares.authenticatePrefix, async (req, res) => {
    //     try {

    //         const { params } = req
            
    //         const results = await employee.findOne({id: params.id}, req.tablePrefix)
            // return res.json({
            //     data: results,
            //     error: null,
            // })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

    router.get('/', authMiddlewares.authenticate, async (req, res) => {
        try {
            
            const result = await subdealer.findOneBy({id: req.user.id})
            return res.json({
                data: result,
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

    router.get('/corporates', authMiddlewares.authenticate, async (req, res) => {
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

            console.log('testing')

            const results = await corporate.findBy({sub_dealer_id: req.user.id}, options)

            return res.json({
                data: results,
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

    router.get('/corporates/:id', authMiddlewares.authenticatePrefix, async (req, res) => {
        try {

            const { params } = req
            
            const results = await corporate.findOneBy({id: params.id})
            const corSettings = await corporateSettings.findOneBy({corporate_id: results.id})

            return res.json({
                data: {
                    ...results,
                    logo: corSettings.logo || null
                },
                error: null,
            })
        } catch (error) {
            console.log(error)
        }
    })

    router.get('/orders', authMiddlewares.authenticate, async (req, res) => {
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

            const corporates = await corporate.findBy({sub_dealer_id: req.user.id})
            let orders = []
            if (corporates.length != 0) {
                for(let cor of corporates){
                    const corSettings = await corporateSettings.findOneBy({corporate_id: cor.id})
                    const { table_prefix } = corSettings
                    if (table_prefix) {
                        let ordersData = await order.fetchOrders(table_prefix, {}, options)

                        const response = await ordersData.map(async (item, index) => {
                            const car = new Car();
                            let carData = await car.findOneBy({id: item.car_id})
                            item.company_name = cor.name
                            item.car = carData
                            // console.log(results[index])
        
                            return item
                        })

                        ordersData = await Promise.all(response)
                        orders = orders.concat(orders, ordersData)
                    }
                }
            }

            return res.json({
                data: orders,
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

    router.post('/login', async (req, res) => {
        try {
        
        const { body } = req

        const token = await tokenHelper.tokenizeLogin({
            email: body.email,
        })
        const url = process.env.SUBDEALER_VERIFY

        
        const user = await subdealer.findOneBy({email: body.email})
        let msg

        if (user) {
            msg = {
                to: body.email, // Change to your recipient
                from: 
                {
                    "email": "system@wevee.dev",
                    "name": "WeVee"
                },
                subject: 'Sign in to the Dealer Dashboard',
                text: 'Dashboard',
                html: magicLinkSubdealer({
                    url,
                    token
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
            email
            } = decoded


            const user = await subdealer.findOneBy({email})
            let token

            if (user) {
                token = await tokenHelper.tokenize({
                    id: user.id,
                    email: email,
                    contact_person: user.contact_person
                })
            }

            return res.json({
                data: {
                    new_user: (user ? false : true),
                    token: token || false,
                    role: "subdealer",
                    ...user
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

    router.get('/corporate-settings', async (req, res) => {
        try {
            
            const {  query } = req
            const corporateData = await corporate.findOneBy({id: query.corporate_id})
            const result = await subdealer.findOneBy({id: corporateData.sub_dealer_id})
            return res.json({
                data: result,
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

    router.get('/:name', async (req, res) => {
        try {
            
            const { params } = req
            const result = await subdealer.findOneBy({company_name: params.name})
            return res.json({
                data: result,
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

export default SubdealerFetchRouter