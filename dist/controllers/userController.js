import User from '../models/User.js';
export const getUsers = async (_req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
        next(err);
    }
};
export const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
        next(err);
    }
};
export const createUser = async (req, res, next) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
        next(err);
    }
};
export const deleteUser = async (req, res, next) => {
    const { studentId } = req.params;
    try {
        const result = await User.findOneAndDelete({ _id: studentId });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
    }
    catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
        next(err);
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'something went wrong' });
        next(err);
    }
};
export const addFriend = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true }).populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'something went wrong' });
        next(err);
    }
};
export const removeFriend = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true }).populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'something went wrong' });
        next(err);
    }
};
