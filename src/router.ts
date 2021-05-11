import * as Router from "koa-router";
import * as IndexCon from "./controller/IndexController";
import * as UserCon from "./controller/UserController"
import * as CheckCon from "./controller/CheckController"
import * as OrderCon from "./controller/OrderController"

const router = new Router();




router.get("/api/foodBase/categories",IndexCon.getAllFoodCategory);
router.get("/api/foodAreas",IndexCon.getAllFoodAreas)


router.all("/api/checkUsername/:username",CheckCon.checkUsername)
router.all("/api/checkPhone/:phone",CheckCon.checkUserPhone);

router.post("/api/user",UserCon.Register);
router.post("/api/user/login",UserCon.Login);
router.get("/api/user/:user_id",UserCon.GetBaseInfo)
router.get("/api/userAddress/:user_id",UserCon.GetUserAddress)


router.post("/api/order",OrderCon.AddOrder);
router.get("/api/order/:order_id",OrderCon.OrderDetail);
router.get("/api/userOrder/:user_id",OrderCon.GetByUser_id);




export default router;
