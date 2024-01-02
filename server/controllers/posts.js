import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body; //frontend
    console.log("Data from front")
    console.log(post)
        const newPost = new PostMessage(post);
    try {
       // mongodb
        await newPost.save(); //Saving
        res.status(201).json(newPost)
    }
    catch (error) {
        console.log("BACKEND alli roor")
        res.status(409).json({ message: error.message })
    }

}

export const updatePost=async(req,res)=>{
    //localhost:5000/posts/1234
    const {id:_id}=req.params;
const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    const updatePost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.status(201).json(updatePost);
}
export const deletePost=async(req,res)=>{
    const {id}=req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

        await PostMessage.findByIdAndDelete(id)
        console.log("Deleteddddddddddddddd")
        res.json({message:"POST DELTED SUCCESSFULLy"})
}
export const likePost=async(req,res)=>{
    //localhost:5000/posts/1234
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")
const post=await PostMessage.findById(id);
   

    const updatePost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
    res.status(201).json(updatePost);
}