import express from "express";

import { addSubmission } from "../../controllers/submissionController";
import { createSubmissionZodSchems } from "../../dtos/CreateSubmissionDto";
import { validate } from "../../validators/createSubmissionValidator";


const submissionRouter = express.Router();

submissionRouter.post(
    '/', 
    validate(createSubmissionZodSchems),
    addSubmission);

export default submissionRouter;