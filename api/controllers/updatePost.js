import { getDataUri } from "../middleware/dataUri.js";
import cloudinary from 'cloudinary'
import Post from "../models/post.js";

const updatedPost = async(req, res) => {
    try {
        const {id, Title, Summary, Content} = req.body;
        if(req.file){
            const fileUri = getDataUri(req.file);
            const cloudUri = await cloudinary.v2.uploader(fileUri.content);
            const Cover = cloudUri.secure_url;
            await Post.updateOne(
                {_id: id},
                {$set: {Title, Summary, Cover, Content}}
            );
            res.json('ok');
        }
        else{
            await Post.updateOne(
                {_id: id},
                {$set: {Title, Summary, Content}}
            );
            res.json('ok');
        }
    } catch (error) {
        res.json('error');
    }
}

export default updatedPost;