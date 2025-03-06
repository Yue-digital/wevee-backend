import authMiddlewares from '../../middlewares/auth.js';
import { favoriteCreateOne, favoriteDelete, favoriteFindbyCarId, favoriteFindbyUserID } from '../../models/favorite.js';
function favoriteFetchRouter(router) {

    router.get("/", 
    authMiddlewares.authenticatePrefix, 
    authMiddlewares.authenticate, 
    async (req, res) => {
      try {

        const favorites = await favoriteFindbyUserID(req.user.id, req.tablePrefix);
        return res.json({
          data: favorites,
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
    router.post("/", authMiddlewares.authenticatePrefix, authMiddlewares.authenticate, async (req, res) => {
      try {
        const { body, user } = req;
  
        const check = await favoriteFindbyCarId(body.car_id, user.id, req.tablePrefix);
        if (check) {
          return res.json({
            data: null,
            error: {
              message: "Car ID already exists",
            },
          });
        }
        const userData = await favoriteCreateOne({
          car_id: body.car_id,
          user_id: user.id,
        },req.tablePrefix);
  
        let favorites = await favoriteFindbyUserID(user.id, req.tablePrefix);
        favorites = favorites.map((e) => e.car_id);
        return res.json({
          data: favorites,
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
    });
  
    router.delete("/", authMiddlewares.authenticatePrefix, authMiddlewares.authenticate, async (req, res) => {
      try {
        const { body, user } = req;
        const check = await favoriteFindbyCarId(body.car_id, user.id, req.tablePrefix);
        if (!check) {
          return res.json({
            data: null,
            error: {
              message: "Car ID do not exists",
            },
          });
        }
  
        await favoriteDelete(body.car_id, user.id, req.tablePrefix);
        let favorites = await favoriteFindbyUserID(user.id, req.tablePrefix);
        favorites = favorites.map((e) => e.car_id);
        return res.json({
          data: favorites,
          error: null,
        });
      } catch (error) {
        return res.json({
          data: null,
          error: {
            message: "Something went wrong",
          },
        });
      }
    });
}

export default favoriteFetchRouter