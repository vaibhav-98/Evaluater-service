import express from "express";

import { addSubmission } from "../../controllers/submissionController";
import { createSubmissionZodSchems } from "../../dtos/CreateSubmissionDto";
import { validateCreateSubmissionDto } from "../../validators/createSubmissionValidator";


const submissionRouter = express.Router();

submissionRouter.post(
    '/', 
    validateCreateSubmissionDto(createSubmissionZodSchems),
    addSubmission);

export default submissionRouter;