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
},{
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema);

export default Post;