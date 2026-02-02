import express from "express";
import { postController } from '../controllers/postController'
const postRouter = express.Router()


import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/Post";
const validateAdd = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),               
  body("username").notEmpty().withMessage("Username Name is required"), 
  body("tags")
    .exists({ checkNull: true })
    .withMessage("Tags field is required")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array with only 1 item")
];
export const validateEdit = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),               
  body("username").notEmpty().withMessage("Username Name is required"), 
  body("tags")
    .exists({ checkNull: true })
    .withMessage("Tags field is required")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array with only 1 item")
];
 const isRequestValidated = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({success:false, message: errors.array()[0].msg,data:[] });
    return; 
  }
  next();
};





//validateAdd,isRequestValidated, 
postRouter.post('/',validateAdd,isRequestValidated,postController.addPost)
 postRouter.get('/',postController.getPosts)
 //postRouter.get('/', postController.getPost)
 postRouter.delete('/:id', postController.deletePost)
// postRouter.post('/test', postController.testPost)


export default postRouter;