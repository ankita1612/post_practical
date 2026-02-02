import { Request, Response, NextFunction } from "express";
import  IPost  from "../interfaces/postInterface";
import Post from "../models/Post";

import { Types } from "mongoose";
import { error } from "node:console";

class PostController {
  addPost = async (req: Request<{}, {}, IPost>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = Post.create({
            title: req.body.title,
            content:req.body.content,
            username: req.body.username,
            tags: req.body.tags,
            createdAt : Date.now()     
        });

      res.status(201).json({"success":true,"message":"post created successfully","data":post});
    } catch (error) {
      next(error);
    }
  };
    getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {     
        // //if()
        // const limitValue = req.query.search ;
        // const skipValue = req.query.page ;
      const posts = await Post.find().sort({"_id":-1});
      res.status(201).json({"success":true,"message":"","data":posts});
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(422).json({ message: 'Invalid post id' });
      }
      const post = await await Post.findByIdAndDelete(req.params.id);

      if (!post) {
        res.status(404).json({ message: 'Post not found' });
      }
      res.status(201).json({"success":true,"message":"post delete successfully","data":[]});
    } catch (error) {
      next(error);
    }
  };
  
}
export const postController = new PostController();
