import { z }  from "zod";


// export interface CreateSubmissionDto {
//     userId: string,
//     problemId: string,
//     code : string,
//     languge: string
// };

export type CreateSubmissionDto =  z.infer<typeof createSubmissionZodSchems>

export const createSubmissionZodSchems = z.object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    languge: z.string(),
});




