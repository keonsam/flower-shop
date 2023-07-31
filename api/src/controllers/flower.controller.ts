import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "../middleware/authentication";
import FlowerService from "../services/flower.service";

const router = Router();

const flowerService = new FlowerService();

router.get(
  "/flowers",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Flowers Request");
    try {
      const flowers = await flowerService.getFlowers();
      res.status(200).json(flowers);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
