import Thought from "../models/Thought.js";
import User from "../models/User.js";
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleThought = async (_req, res) => {
    try {
        const thought = await Thought.findById(_req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const createThought = async (_req, res) => {
    try {
        const thought = await Thought.create(_req.body);
        await User.findByIdAndUpdate(_req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const updateThought = async (_req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(_req.params.thoughtId, _req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteThought = async (_req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(_req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: _req.params.thoughtId } }, { new: true });
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const addReaction = async (_req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(_req.params.thoughtId, { $push: { reactions: _req.body } }, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteReaction = async (_req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(_req.params.thoughtId, { $pull: { reactions: { reactionId: _req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
