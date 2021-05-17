import * as Router from "koa-router";
import * as IndexCon from "./controller/IndexController";
import * as UserCon from "./controller/UserController"
import * as CheckCon from "./controller/CheckController"
import * as OrderCon from "./controller/OrderController"
import * as AdminCon from "./controller/AdminController"
import * as IngredientCon from "./controller/IngredientController"
import * as FoodBaseCon from "./controller/FoodBaseController"

const router = new Router();




router.get("/api/foodBase/categories",IndexCon.getAllFoodCategory);
router.get("/api/foodAreas",IndexCon.getAllFoodAreas)
router.put("/api/foodBase",FoodBaseCon.modifyFood)
router.delete("/api/foodBase/:FoodBase_id",FoodBaseCon.deleteFoodBase)
router.post("/api/foodBase",FoodBaseCon.addFood)

router.get("/api/ingredients",IngredientCon.GetAll);


router.all("/api/checkUsername/:username",CheckCon.checkUsername)
router.all("/api/checkPhone/:phone",CheckCon.checkUserPhone);

router.post("/api/user",UserCon.Register);
router.post("/api/user/login",UserCon.Login);
router.get("/api/user/:user_id",UserCon.GetBaseInfo)
router.get("/api/userAddress/:user_id",UserCon.GetUserAddress)


router.post("/api/order",OrderCon.AddOrder);
router.get("/api/orderDetail/:order_id",OrderCon.OrderDetail);
router.get("/api/userOrder/:user_id",OrderCon.GetByUser_id);
router.get("/api/orders",OrderCon.GetAll)


router.post("/api/admin/login",AdminCon.Login);




export default router;
