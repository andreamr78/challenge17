import { Router } from "express";
import { getAllThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } from "../../controllers/thoughtController.js";
import asyncHandler from "../../utils/asyncHandler.js";
const router = Router();
router.route('/')
    .get(asyncHandler(getAllThoughts))
    .post(asyncHandler(createThought));
router.route('/:thoughId')
    .get(asyncHandler(getSingleThought))
    .put(asyncHandler(updateThought))
    .delete(asyncHandler(deleteThought));
router.route('/:thoughId/reactions')
    .post(asyncHandler(addReaction));
router.route('/:thoughId/reactions/:reactionId')
    .delete(asyncHandler(deleteReaction));
export default router;
