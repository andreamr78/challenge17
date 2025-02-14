import { Router } from "express";
import { getSingleUser, getUsers, createUser, updateUser, deleteUser, addFriend, removeFriend } from "../../controllers/userController.js";

const router = Router();

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend);

export default router;
