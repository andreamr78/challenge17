import { Schema, Types } from 'mongoose';
// interface Ireaction extends Document{
//     reactionId: ObjectId,
//     reactionBody:string,
//     username: string,
//     createdAt: Date,
// }
const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => {
            if (date)
                return date.toISOString().split("T")[0];
        }
    },
});
//const Reaction = model('reaction', reactionSchema);
export default reactionSchema;
