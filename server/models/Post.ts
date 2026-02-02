import  {Schema, model,} from 'mongoose'
import  IPost  from "../interfaces/postInterface";

const postSchema = new Schema<IPost>({
    title: {
        type: String,   
    },
    content: {
        type: String,
    },
    username: {
        type: String,
    },
    tags:  [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },   
})
 const Post = model<IPost>('Post', postSchema )
 export default Post