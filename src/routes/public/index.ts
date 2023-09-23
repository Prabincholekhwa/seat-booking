import { Router } from "express";
import { IRouteInterface } from "../../interfaces";
import { VehicleRouter } from "./vehicleRoute";
import { CategoryRouter } from "./categoryRoute";
import { UserRouter } from "./userRoute";
import { BookingRouter } from "./bookingRoute";
import { SeatRouter } from "./seatRoute";

class ProxyRouter {
  private static instance: ProxyRouter;
  private router: Router = Router();
  private readonly routes = [
    {segment: "/user", provider: UserRouter },
    { segment: "/category", provider: CategoryRouter },
    {segment: "/vehicle", provider: VehicleRouter },
    {segment:"/seat", provider: SeatRouter}, 
    {segment:"/booking", provider: BookingRouter},
  ];

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter();
    }
    return ProxyRouter.instance;
  }

  map(): Router {
    this.routes.forEach((route: IRouteInterface) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });
    return this.router;
  }
}

const proxyRouter = ProxyRouter.get();

export { proxyRouter as ProxyRouter };
