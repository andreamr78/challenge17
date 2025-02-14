import { Schema, model} from 'mongoose';
//import Reaction from './Reaction.js';
import reactionSchema from './Reaction.js';

// interface IThought extends Document{
//     thoughtText: string,
//     createdAt: Date,
//     username:string,
//     userId: ObjectId,
//     reactions: Document[]
// }

const thoughtSchema = new Schema({
    thoughtText: {type: String, required: true, minlength:1, maxlength:280},
    createdAt: {
        type:Date, 
        default:Date.now(),
        get: (date:any) => {
            if (date) return date.toISOString().split("T") [0];
        }
    },
    userId:{
        type: Schema.Types.ObjectId, 
        ref:'user',
        required: true
    },
    username: {type: String, required: true},
    //reactions : [Reaction]
    reactions : [reactionSchema]
}, {
    toJSON:{
        virtuals:true,
        getters: true
    },
    id: false,
})

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);
export default Thought;