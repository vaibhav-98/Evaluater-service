import { NextFunction , Request, Response} from "express";
import { ZodSchema } from "zod";

import { CreateSubmissionDto } from '../dtos/CreateSubmissionDto';

export const validateCreateSubmissionDto = ( schema: ZodSchema<CreateSubmissionDto>) => (req:Request , res:Response, next:NextFunction) => {
   try {
     schema.parse({
        ...req.body
     });

     next();
   } catch (error) {
    console.log(error);
    return res.status(400).json({
        massage:"Bad request"
    });
    
   }
};








