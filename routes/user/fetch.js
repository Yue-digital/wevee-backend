import { generatePdf } from '../../helpers/pdf.js';
import edge from '../../edge.js';
import { tasslinkbyCarId, tasslinkUserFindbyID } from '../../models/tasslink.js';
import authMiddlewares from '../../middlewares/auth.js';
import { userFetch, userFindbyID } from '../../models/user.js';
import Order from '../../models/orders.js';
import Car from '../../models/car.js';

const order = new Order()
function userFetchRouter(router) {
    router.get('/', authMiddlewares.authenticatePrefix,
    async function (req, res) {
        try {
          
          const { query } = req
          const { page, limit, ...filterRest } = req.query;

          const filters = { ...filterRest }

          const options = {};
          if (page) options.page = parseInt(page, 10);
          if (limit) options.limit = parseInt(limit, 10);
          const users = await userFetch(filters, options, req.tablePrefix)

          return res.json({
            data: users,
            error: null,
          });
          
        } catch (error) {
          console.log(error);
          return res.json({
            data: null,
            error: {
              message: "Something went wrong",
            },
          });
        }
     })

     router.get('/test', async function(req, res){
      try {
  
        const html = await edge.render('pdf/test', { });
        let test = await generatePdf(html,{})
  
        res.set('Content-Type', 'application/pdf');
        return res.end(test);
        
      } catch (error) {
        console.log(error);
            return res.json({
              data: null,
              error: {
                message: "Something went wrong",
              },
            });
      }
  
      })

      router.get(
        "/orders",
        authMiddlewares.authenticate,
        authMiddlewares.authenticatePrefix,
        async function (req, res) {
          try {
            const { params, user } = req;
            const { limit, page, orderby, orderKey, ...filterRest} = req.query
  
  
            const options = {};
              if (page) options.page = parseInt(page, 10);
              if (limit) options.limit = parseInt(limit, 10);
              const filters = {
                user_id: user.id, 
                ...filterRest 
              }
            
              if(orderKey && orderby){
                  filters.order = {
                  key: orderKey,
                  by: orderby
                  }
            }
  
            let orders = await order.fetchOrders(req.tablePrefix, filters, options)

            if (orders.length != 0) {
                
              const response = await orders.map(async (item, index) => {
                  const car = new Car();
                  let carData = await car.findOneBy({id: item.car_id})
                  item.car = carData
                  return item
              })

              orders = await Promise.all(response)
            }

            return res.json({
              data: orders,
              error: null,
            })
  
          } catch (error) {
            console.log(error);
            return res.json({
              data: null,
              error: {
                message: "Something went wrong",
              },
            });
          }
        }
      )

      router.get(
        "/orders/:orderID",
        authMiddlewares.authenticate,
        authMiddlewares.authenticatePrefix,
        async function (req, res) {
          try {
            const { params, user } = req;
            let orders = await order.findOrderUser(parseInt(params.orderID), user.id, req.tablePrefix)
            
            if (orders) {
              const car = new Car();
              let carData = await car.findOneBy({id: orders.car_id})
              orders.car = carData
            }
            
            return res.json({
              data: orders || false,
              error: null,
            })
  
          } catch (error) {
            console.log(error);
            return res.json({
              data: null,
              error: {
                message: "Something went wrong",
              },
            });
          }
        }
      )

     router.get('/:id', authMiddlewares.authenticatePrefix,
    async function (req, res) {
        try {
          
          const { params } = req
          
          const users = await userFindbyID(params.id, req.tablePrefix)

          return res.json({
            data: users,
            error: null,
          });
          
        } catch (error) {
          console.log(error);
          return res.json({
            data: null,
            error: {
              message: "Something went wrong",
            },
          });
        }
     })

    router.get(
      "/cars/tasslink",
      authMiddlewares.authenticatePrefix,
      async function (req, res) {
        try {
          const { params, user } = req;
          const results = await tasslinkUserFindbyID(user.id, req.tablePrefix);
  
          return res.json({
            data: results?.map((e) => e.car_id),
            error: null,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            data: null,
            error: {
              message: "Something went wrong",
            },
          });
        }
      }
    );
  
    router.get(
      "/cars/:carId",
      authMiddlewares.authenticatePrefix,
      async function (req, res) {
        try {
          const { params, user } = req;
          const results = await tasslinkbyCarId(user.id, params.carId, req.tablePrefix);
  
          return res.json({
            data: results,
            error: null,
          });
        } catch (error) {
          console.log(error);
          return res.json({
            data: null,
            error: {
              message: "Something went wrong",
            },
          });
        }
      }
    );

    

   

}

export default userFetchRouter