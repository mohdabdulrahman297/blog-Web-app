import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    Title: {
        type: String,

    },
    Summary: {
        type: String,

    },
    Cover: String,
    Content: {
        type: String,

    },

    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    Comments: [{
        user: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
},{
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema);

export default Post;