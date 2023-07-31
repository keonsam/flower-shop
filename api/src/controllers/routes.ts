import authRouter from "./credential.controller";
import customerRouter from "./customer.controller";
import flowerRouter from "./flower.controller";
import orderRouter from "./order.controller";

const routers = [authRouter, customerRouter, flowerRouter, orderRouter];
export default routers;
