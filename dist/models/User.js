import { Schema, model } from 'mongoose';
// interface IUser extends Document{
//     username: string,
//     email: string,
//     thoughts: ObjectId[],
//     friends: ObjectId[]
// }
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        /*validate: {
            validator: () => Promise.resolve(false),
            message: 'Please provide a valid email'
          }*/
        match: [/.+@.+\.+/, 'Please provide a valid email']
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('user', userSchema);
export default User;
