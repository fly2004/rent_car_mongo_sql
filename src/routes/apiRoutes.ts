// 📁 routes/apiRoutes.ts — корневой маршрутизатор API

import { Router } from "express";
import { carRoutes } from "./carRoutes";
import { customerRoutes } from "./customerRoutes";
import { rentalRoutes } from "./rentalRoutes";

export const apiRouter: Router = Router();

apiRouter.use("/cars", carRoutes);
apiRouter.use("/customers", customerRoutes);
apiRouter.use("/rentals", rentalRoutes);

