import { Router } from "express";
import userRoutes from './userRouter.js';
import thoughtRoutes from './thoughtRouter.js';
const router = Router();
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
export default router;
