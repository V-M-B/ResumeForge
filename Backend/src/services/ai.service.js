const {GoogleGenAI} = require("@google/genai")
const {zod}= require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().description("The match score between the candidate and the job description, ranging from 0 to 100"),
  technicalQuestions: z.array(
    z.object({
      question: z
        .string()
        .description("The technical question can be asked in the interview"),
      intention: z
        .string()
        .description("The intention of interviewer behind asking this question"),
      answer: z
        .string()
        .description(
          "How to answer this question, what points to cover"
        ),
    })
  ).description(
    "Technical questions that can be asked in the interview along with their intention and answers"
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z
        .string()
        .description("The technical question can be asked in the interview"),
      intention: z
        .string()
        .description("The intention of interviewer behind asking this question"),
      answer: z
        .string()
        .description(
          "How to answer this question, what points to cover"
        ),
    })
  ).description(
    "Behavioral questions that can be asked in the interview along with their intention and answers"
  ),

  skillGaps: z.array(
    z.object({
      skill: z
        .string()
        .description("The skill which the candidate is lacking"),
      severity: z
        .enum(["low", "medium", "high"])
        .description("The severity of this skill gap"),
    })
  ).description(
    "List of skill gaps in the candidate's profile along with their severity"
  ),

  preparationPlan: z.array(
    z.object({
      day: z
        .number()
        .description(
          "The day number in the preparation plan, starting from 1"
        ),
    })
  ),
});

async function generateInterviewReport(jobDescription, resumeText, selfDescription) {
    const response = await ai.models.generateContent({
        model: "models/gemini-2.5-flash",
        contents: `You are an expert career coach. Your task is to generate a comprehensive interview report for a candidate based on the provided job description, resume, and self-description. The report should include the following sections:`,
        config:{
            responseFormat: {
                type: "json_object",
                jsonSchema: zodToJsonSchema(interviewReportSchema)
            }
        }
    })

    console.log(JSON.parse(response.text));
    
        }



























































// async function invokeai(){
//     const response = await ai.models.generateContent({
//         model: "models/gemini-2.5-flash",
//         contents:"Helllo gemi ! explian the concept of AI in simple terms"
//     })
//     console.log(response.text)
// }    

// module.exports = invokeai;